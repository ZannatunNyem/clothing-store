import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

type OrderDetailsPageProps = {
  params: Promise<{
    orderId: string;
  }>;
};

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const { orderId } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
          Please log in
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          You need to be logged in to view your order.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-flex h-11 items-center rounded-xl bg-[var(--color-primary)] px-6 text-sm font-medium text-white"
        >
          Login
        </Link>
      </main>
    );
  }

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

  if (!order) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Success */}
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <span className="text-2xl text-emerald-600">✓</span>
        </div>

        <h1 className="mt-5 text-3xl font-semibold text-[var(--color-primary)]">
          Order Confirmed!
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
      </div>

      {/* Order Info */}
      <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-gray-500">Order ID</p>

            <p className="mt-1 break-all text-sm font-medium text-[var(--color-primary)]">
              {order.id}
            </p>
          </div>

          <div className="sm:text-right">
            <p className="text-xs text-gray-500">Status</p>

            <span className="mt-1 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Items */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            Order Items
          </h2>

          <div className="mt-6 divide-y divide-gray-100">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 py-4 first:pt-0 last:pb-0"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-20 w-20 shrink-0 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-[var(--color-primary)]">
                    {item.product.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    ${Number(item.price).toFixed(2)} each
                  </p>
                </div>

                <p className="font-medium text-[var(--color-primary)]">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="my-6 border-t border-gray-100" />

          <div className="flex justify-between text-lg font-semibold text-[var(--color-primary)]">
            <span>Total</span>
            <span>${Number(order.total).toFixed(2)}</span>
          </div>
        </section>

        {/* Shipping */}
        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            Shipping Address
          </h2>

          {order.address ? (
            <div className="mt-5 space-y-2 text-sm text-gray-600">
              <p className="font-medium text-[var(--color-primary)]">
                {order.address.fullName}
              </p>

              <p>{order.address.phone}</p>

              <p>{order.address.address}</p>

              <p>
                {order.address.city}, {order.address.postalCode}
              </p>

              <p>{order.address.country}</p>
            </div>
          ) : (
            <p className="mt-5 text-sm text-gray-500">
              No shipping address found.
            </p>
          )}
        </aside>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/shop"
          className="flex h-11 items-center justify-center rounded-xl bg-[var(--color-primary)] px-7 text-sm font-medium text-white transition hover:bg-[var(--color-accent)]"
        >
          Continue Shopping
        </Link>

        <Link
          href="/orders"
          className="flex h-11 items-center justify-center rounded-xl border border-gray-200 px-7 text-sm font-medium text-[var(--color-primary)] transition hover:bg-gray-50"
        >
          View My Orders
        </Link>
      </div>
    </main>
  );
}
