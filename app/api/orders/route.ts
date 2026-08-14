import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // 1. Check logged-in user
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "You must be logged in to place an order." },
        { status: 401 },
      );
    }

    // 2. Get checkout data
    const body = await request.json();

    const { fullName, phone, address, city, postalCode } = body;

    // 3. Validate address
    if (
      !fullName?.trim() ||
      !phone?.trim() ||
      !address?.trim() ||
      !city?.trim() ||
      !postalCode?.trim()
    ) {
      return NextResponse.json(
        { message: "Please complete all shipping information." },
        { status: 400 },
      );
    }

    // 4. Create everything inside one transaction
    const order = await prisma.$transaction(
      async (tx) => {
        // Get user's cart
        const cart = await tx.cart.findUnique({
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

        if (!cart || cart.items.length === 0) {
          throw new Error("Your cart is empty.");
        }

        // 5. Check stock
        for (const item of cart.items) {
          if (item.quantity > item.product.stock) {
            throw new Error(`${item.product.name} does not have enough stock.`);
          }
        }

        // 6. Calculate total using database prices
        const total = cart.items.reduce(
          (sum, item) => sum + Number(item.product.price) * item.quantity,
          0,
        );

        // 7. Create Order
        const newOrder = await tx.order.create({
          data: {
            userId: session.user.id,
            total,
            status: "PENDING",
          },
        });

        // 8. Create OrderItems
        await tx.orderItem.createMany({
          data: cart.items.map((item) => ({
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        });

        // 9. Create shipping Address
        await tx.address.create({
          data: {
            userId: session.user.id,
            orderId: newOrder.id,
            fullName: fullName.trim(),
            phone: phone.trim(),
            address: address.trim(),
            city: city.trim(),
            postalCode: postalCode.trim(),
            country: "Bangladesh",
          },
        });

        // 10. Reduce product stock
        for (const item of cart.items) {
          await tx.product.update({
            where: {
              id: item.productId,
            },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
        }

        // 11. Clear cart
        await tx.cartItem.deleteMany({
          where: {
            cartId: cart.id,
          },
        });

        return newOrder;
      },
      {
        maxWait: 10000,
        timeout: 20000,
      },
    );

    return NextResponse.json(
      {
        message: "Order created successfully.",
        orderId: order.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create order error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to create order.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "You must be logged in." },
        { status: 401 },
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        address: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);

    return NextResponse.json(
      { message: "Failed to fetch orders." },
      { status: 500 },
    );
  }
}
