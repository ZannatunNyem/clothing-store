import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// export async function GET() {
//   const products = await prisma.product.findMany({
//     include: { category: true },
//     orderBy: { createdAt: "desc" },
//   });

//   return NextResponse.json(products);
// }
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const products = await prisma.product.findMany({
    where: category
      ? {
          category: {
            name: category,
          },
        }
      : undefined,

    include: {
      category: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        image: body.image,
        stock: body.stock,
        categoryId: body.categoryId,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
