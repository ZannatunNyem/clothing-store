import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log("SESSION:", session);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return NextResponse.json(cart);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { productId, quantity = 1 } = await request.json();

  if (!productId) {
    return NextResponse.json(
      { message: "Product ID is required" },
      { status: 400 },
    );
  }

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  if (product.stock < quantity) {
    return NextResponse.json({ message: "Not enough stock" }, { status: 400 });
  }

  const cart = await prisma.cart.upsert({
    where: {
      userId: session.user.id,
    },
    update: {},
    create: {
      userId: session.user.id,
    },
  });

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;

    if (newQuantity > product.stock) {
      return NextResponse.json(
        { message: "Not enough stock" },
        { status: 400 },
      );
    }

    const updatedItem = await prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: newQuantity,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(updatedItem);
  }

  const cartItem = await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
    },
    include: {
      product: true,
    },
  });

  return NextResponse.json(cartItem, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { itemId, quantity } = await request.json();

  if (!itemId || quantity === undefined) {
    return NextResponse.json(
      { message: "Item ID and quantity are required" },
      { status: 400 },
    );
  }

  if (quantity < 1) {
    return NextResponse.json(
      { message: "Quantity must be at least 1" },
      { status: 400 },
    );
  }

  const item = await prisma.cartItem.findFirst({
    where: {
      id: itemId,
      cart: {
        userId: session.user.id,
      },
    },
    include: {
      product: true,
    },
  });

  if (!item) {
    return NextResponse.json(
      { message: "Cart item not found" },
      { status: 404 },
    );
  }

  if (quantity > item.product.stock) {
    return NextResponse.json({ message: "Not enough stock" }, { status: 400 });
  }

  const updatedItem = await prisma.cartItem.update({
    where: {
      id: itemId,
    },
    data: {
      quantity,
    },
    include: {
      product: true,
    },
  });

  return NextResponse.json(updatedItem);
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { itemId } = await request.json();

  if (!itemId) {
    return NextResponse.json(
      { message: "Item ID is required" },
      { status: 400 },
    );
  }

  const item = await prisma.cartItem.findFirst({
    where: {
      id: itemId,
      cart: {
        userId: session.user.id,
      },
    },
  });

  if (!item) {
    return NextResponse.json(
      { message: "Cart item not found" },
      { status: 404 },
    );
  }

  await prisma.cartItem.delete({
    where: {
      id: itemId,
    },
  });

  return NextResponse.json({
    message: "Item removed from cart",
  });
}
