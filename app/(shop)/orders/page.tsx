"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  id: string;
  status: string;
  total: string;
  createdAt: string;
  items: {
    id: string;
    quantity: number;
    product: {
      name: string;
      image: string;
    };
  }[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/orders");

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load orders.");
          return;
        }

        setOrders(data);
      } catch (error) {
        console.error("Fetch orders error:", error);
        setError("Something went wrong while loading your orders.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="animate-pulse">
          <div className="h-8 w-40 rounded-lg bg-gray-300" />
          <div className="mt-3 h-4 w-64 rounded bg-gray-300" />

          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-gray-300 bg-white p-5"
              >
                <div className="h-5 w-40 rounded bg-gray-300" />
                <div className="mt-3 h-4 w-24 rounded bg-gray-300" />
                <div className="mt-5 h-16 rounded-xl bg-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
          Unable to load orders
        </h1>

        <p className="mt-2 text-sm text-gray-500">{error}</p>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-secondary)]">
            <span className="text-3xl">📦</span>
          </div>

          <h1 className="mt-6 text-3xl font-semibold text-[var(--color-primary)]">
            No Orders Yet
          </h1>

          <p className="mt-3 max-w-md text-sm text-gray-500">
            You haven&apos;t placed any orders yet. Start shopping and your
            orders will appear here.
          </p>

          <Link
            href="/products"
            className="mt-7 flex h-11 items-center justify-center rounded-xl bg-[var(--color-primary)] px-7 text-sm font-medium text-white transition hover:bg-[var(--color-accent)]"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
          My Orders
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          View and track your previous orders.
        </p>
      </div>

      {/* Orders */}
      <div className="mt-8 space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6"
          >
            {/* Order Header */}
            <div className="flex flex-col gap-3 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>

                <p className="mt-1 break-all text-sm font-medium text-[var(--color-primary)]">
                  {order.id}
                </p>
              </div>

              <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                {order.status}
              </span>
            </div>

            {/* Products */}
            <div className="mt-5 space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[var(--color-primary)]">
                      {item.product.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-5 flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <p className="mt-1 text-lg font-semibold text-[var(--color-primary)]">
                  ${Number(order.total).toFixed(2)}
                </p>
              </div>

              <Link
                href={`/orders/${order.id}`}
                className="flex h-10 items-center justify-center rounded-xl border border-gray-200 px-5 text-sm font-medium text-[var(--color-primary)] transition hover:bg-gray-50"
              >
                View Order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
