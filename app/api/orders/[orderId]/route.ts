import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> },
) {
  try {
    // 1. Check logged-in user
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "You must be logged in." },
        { status: 401 },
      );
    }

    // 2. Get orderId
    const { orderId } = await params;

    // 3. Find the order belonging to this user
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
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
    });

    // 4. Order not found
    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 },
      );
    }

    // 5. Return order
    return NextResponse.json(order);
  } catch (error) {
    console.error("Get order error:", error);

    return NextResponse.json(
      { message: "Failed to fetch order." },
      { status: 500 },
    );
  }
}
