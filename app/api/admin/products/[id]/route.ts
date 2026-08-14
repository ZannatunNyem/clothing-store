import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import prisma from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Params) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 403 });
    }

    const { id } = await params;
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
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 },
      );
    }

    const duplicateSlug = await prisma.product.findFirst({
      where: {
        slug: slug.trim(),
        NOT: {
          id,
        },
      },
    });

    if (duplicateSlug) {
      return NextResponse.json(
        { message: "Another product already uses this slug." },
        { status: 409 },
      );
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found." },
        { status: 400 },
      );
    }

    const product = await prisma.product.update({
      where: { id },
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

    return NextResponse.json({
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error("Admin product PATCH error:", error);

    return NextResponse.json(
      { message: "Failed to update product." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 403 });
    }

    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 },
      );
    }

    const orderItemCount = await prisma.orderItem.count({
      where: {
        productId: id,
      },
    });

    if (orderItemCount > 0) {
      return NextResponse.json(
        {
          message: "This product has existing orders and cannot be deleted.",
        },
        { status: 400 },
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Admin product DELETE error:", error);

    return NextResponse.json(
      { message: "Failed to delete product." },
      { status: 500 },
    );
  }
}
