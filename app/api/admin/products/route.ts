import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 403 });
    }

    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Admin products GET error:", error);

    return NextResponse.json(
      { message: "Failed to fetch products." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 403 });
    }

    const body = await request.json();

    const { name, slug, description, price, image, stock, categoryId } = body;

    if (
      !name?.trim() ||
      !slug?.trim() ||
      !description?.trim() ||
      !image?.trim() ||
      !categoryId
    ) {
      return NextResponse.json(
        { message: "Please complete all product fields." },
        { status: 400 },
      );
    }

    const numericPrice = Number(price);
    const numericStock = Number(stock);

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      return NextResponse.json(
        { message: "Invalid product price." },
        { status: 400 },
      );
    }

    if (!Number.isInteger(numericStock) || numericStock < 0) {
      return NextResponse.json(
        { message: "Invalid stock quantity." },
        { status: 400 },
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        slug: slug.trim(),
      },
    });

    if (existingProduct) {
      return NextResponse.json(
        { message: "A product with this slug already exists." },
        { status: 409 },
      );
    }

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found." },
        { status: 400 },
      );
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        price: numericPrice,
        image: image.trim(),
        stock: numericStock,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(
      {
        message: "Product created successfully.",
        product,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Admin products POST error:", error);

    return NextResponse.json(
      { message: "Failed to create product." },
      { status: 500 },
    );
  }
}
