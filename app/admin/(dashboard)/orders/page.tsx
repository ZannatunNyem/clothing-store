import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import Link from "next/link";
import { Eye, Package, ShoppingBag } from "lucide-react";

export default async function AdminOrdersPage() {
  await requireAdmin();

  const orders = await prisma.order.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-[var(--color-body)] px-6 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {/* Breadcrumb */}
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[var(--color-text-light)]">
            <ShoppingBag size={15} strokeWidth={1.8} />
            <span>Store Management</span>
            <span className="opacity-40">/</span>
            <span className="text-[var(--color-primary)]">Orders</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-primary)]">
            Orders
          </h1>

          <p className="mt-2 text-sm text-[var(--color-text-light)]">
            View and manage customer orders from your store.
          </p>
        </div>

        {/* Total Orders */}
        <div className="flex w-fit items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 shadow-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-body)] text-[var(--color-primary)]">
            <Package size={18} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-light)]">
              Total Orders
            </p>

            <p className="mt-0.5 text-lg font-semibold text-[var(--color-primary)]">
              {orders.length}
            </p>
          </div>
        </div>
      </div>

      {/* Orders Card */}
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_10px_35px_rgba(6,60,49,0.06)]">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-5">
          <div>
            <h2 className="text-base font-semibold text-[var(--color-primary)]">
              Recent Orders
            </h2>

            <p className="mt-1 text-xs text-[var(--color-text-light)]">
              Latest customer purchases
            </p>
          </div>

          <span className="rounded-full bg-[var(--color-body)] px-3 py-1.5 text-xs font-medium text-[var(--color-primary)]">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </span>
        </div>

        {/* Table */}
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] table-fixed">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-body)]/60">
                  <th className="w-[30%] px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-light)]">
                    Customer
                  </th>

                  <th className="w-[17%] px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-light)]">
                    Total
                  </th>

                  <th className="w-[20%] px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-light)]">
                    Date
                  </th>

                  <th className="w-[18%] px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-light)]">
                    Status
                  </th>

                  <th className="w-[15%] px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-light)]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const customerName = order.user?.name || "Guest";

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-[var(--color-border)] last:border-b-0 transition-colors hover:bg-[var(--color-body)]/40"
                    >
                      {/* Customer */}

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          {order.user?.image ? (
                            <img
                              src={order.user.image}
                              alt={customerName}
                              className="h-10 w-10 shrink-0 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-body)] text-sm font-semibold text-[var(--color-primary)]">
                              {customerName.charAt(0).toUpperCase()}
                            </div>
                          )}

                          <span className="truncate text-sm font-semibold text-[var(--color-text)]">
                            {customerName}
                          </span>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="px-6 py-5">
                        <span className="text-sm font-semibold text-[var(--color-primary)]">
                          ৳{order.total.toString()}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5">
                        <span className="text-sm text-[var(--color-text)]">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                          {order.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-5 text-right">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] px-3.5 py-2 text-xs font-semibold text-[var(--color-primary)] transition-all hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                        >
                          <Eye size={15} strokeWidth={1.8} />
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-body)] text-[var(--color-primary)]">
              <Package size={24} strokeWidth={1.6} />
            </div>

            <h3 className="text-base font-semibold text-[var(--color-primary)]">
              No orders yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--color-text-light)]">
              Customer orders will appear here once someone completes a
              purchase.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
