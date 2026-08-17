import { requireAdmin } from "@/lib/admin";
import prisma from "@/lib/prisma";
import {
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  AlertTriangle,
  Clock3,
  CheckCircle2,
  Truck,
} from "lucide-react";
import SalesChart from "./SalesChart";

export default async function AdminPage() {
  const session = await requireAdmin();

  /* --------------------------------
     BASIC STORE DATA
  -------------------------------- */

  const [
    customerCount,
    productCount,
    orderCount,
    categories,
    revenueResult,
    pendingOrders,
    lowStockProducts,
  ] = await Promise.all([
    prisma.user.count({
      where: {
        role: "USER",
      },
    }),

    prisma.product.count(),

    prisma.order.count(),

    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),

    prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        status: {
          not: "CANCELLED",
        },
      },
    }),

    prisma.order.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.product.count({
      where: {
        stock: {
          lte: 5,
        },
      },
    }),
  ]);

  const totalRevenue = Number(revenueResult._sum.total ?? 0);

  /* --------------------------------
     ORDER STATUS
  -------------------------------- */

  const [
    confirmedOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
  ] = await Promise.all([
    prisma.order.count({
      where: {
        status: "CONFIRMED",
      },
    }),

    prisma.order.count({
      where: {
        status: "PROCESSING",
      },
    }),

    prisma.order.count({
      where: {
        status: "SHIPPED",
      },
    }),

    prisma.order.count({
      where: {
        status: "DELIVERED",
      },
    }),

    prisma.order.count({
      where: {
        status: "CANCELLED",
      },
    }),
  ]);

  const orderStatuses = [
    {
      label: "Pending",
      value: pendingOrders,
      icon: Clock3,
    },
    {
      label: "Processing",
      value: processingOrders,
      icon: Package,
    },
    {
      label: "Shipped",
      value: shippedOrders,
      icon: Truck,
    },
    {
      label: "Delivered",
      value: deliveredOrders,
      icon: CheckCircle2,
    },
  ];

  /* --------------------------------
     RECENT ORDERS
  -------------------------------- */

  const recentOrders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  /* --------------------------------
     TOP PRODUCTS
  -------------------------------- */

  const topProductItems = await prisma.orderItem.groupBy({
    by: ["productId"],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: 5,
  });

  const topProductIds = topProductItems.map((item) => item.productId);

  const topProducts = await prisma.product.findMany({
    where: {
      id: {
        in: topProductIds,
      },
    },
  });

  const topProductData = topProductItems.map((item) => {
    const product = topProducts.find(
      (product) => product.id === item.productId,
    );

    return {
      id: item.productId,
      name: product?.name ?? "Unknown Product",
      image: product?.image ?? "",
      sold: item._sum.quantity ?? 0,
    };
  });

  /* --------------------------------
     SALES CHART
  -------------------------------- */

  const salesOrders = await prisma.order.findMany({
    where: {
      status: {
        not: "CANCELLED",
      },
      createdAt: {
        gte: new Date(
          new Date().getFullYear() - 1,
          new Date().getMonth() + 1,
          1,
        ),
      },
    },
    select: {
      total: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const salesMap = new Map<string, number>();

  for (let i = 11; i >= 0; i--) {
    const date = new Date();

    date.setMonth(date.getMonth() - i);

    const key = `${date.getFullYear()}-${date.getMonth()}`;

    salesMap.set(key, 0);
  }

  for (const order of salesOrders) {
    const key = `${order.createdAt.getFullYear()}-${order.createdAt.getMonth()}`;

    if (salesMap.has(key)) {
      salesMap.set(key, (salesMap.get(key) ?? 0) + Number(order.total));
    }
  }

  const salesData = Array.from(salesMap.entries()).map(([key, revenue]) => {
    const [year, month] = key.split("-").map(Number);

    const date = new Date(year, month, 1);

    return {
      month: date.toLocaleDateString("en-US", {
        month: "short",
      }),
      revenue,
    };
  });

  /* --------------------------------
     DASHBOARD
  -------------------------------- */

  return (
    <main className="bg-[var(--color-body)]">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
            LUMÉ Administration
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[var(--color-primary)] sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-3 text-sm text-[var(--color-text-light)]">
            Welcome back, {session.user.name || session.user.email}.
          </p>
        </div>

        {/* --------------------------------
            STAT CARDS
        -------------------------------- */}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {/* Revenue */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-light)]">
                  Revenue
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-[var(--color-primary)]">
                  ৳{totalRevenue.toLocaleString()}
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-body)] text-[var(--color-accent)]">
                <DollarSign size={19} />
              </div>
            </div>

            <p className="mt-4 text-xs text-[var(--color-text-light)]">
              Total store revenue
            </p>
          </div>

          {/* Orders */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-light)]">
                  Orders
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-[var(--color-primary)]">
                  {orderCount}
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-body)] text-[var(--color-accent)]">
                <Package size={19} />
              </div>
            </div>

            <p className="mt-4 text-xs text-[var(--color-text-light)]">
              {pendingOrders} currently pending
            </p>
          </div>

          {/* Products */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-light)]">
                  Products
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-[var(--color-primary)]">
                  {productCount}
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-body)] text-[var(--color-accent)]">
                <ShoppingBag size={19} />
              </div>
            </div>

            <p className="mt-4 text-xs text-[var(--color-text-light)]">
              {categories.length} categories
            </p>
          </div>

          {/* Customers */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-text-light)]">
                  Customers
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-[var(--color-primary)]">
                  {customerCount}
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-body)] text-[var(--color-accent)]">
                <Users size={19} />
              </div>
            </div>

            <p className="mt-4 text-xs text-[var(--color-text-light)]">
              Registered customers
            </p>
          </div>
        </div>

        {/* --------------------------------
            SALES + ORDER STATUS
        -------------------------------- */}

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <SalesChart data={salesData} />

          {/* Order Status */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  Orders
                </p>

                <h2 className="mt-1 text-xl font-semibold text-[var(--color-primary)]">
                  Order Status
                </h2>
              </div>

              <Package size={20} className="text-[var(--color-accent)]" />
            </div>

            <div className="mt-7 space-y-5">
              {orderStatuses.map((status) => {
                const Icon = status.icon;

                const percentage =
                  orderCount > 0
                    ? Math.round((status.value / orderCount) * 100)
                    : 0;

                return (
                  <div key={status.label}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Icon
                          size={16}
                          className="text-[var(--color-accent)]"
                        />

                        <span className="text-[var(--color-primary)]">
                          {status.label}
                        </span>
                      </div>

                      <span className="text-[var(--color-text-light)]">
                        {status.value}
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--color-body)]">
                      <div
                        className="h-full rounded-full bg-[var(--color-accent)] transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {cancelledOrders > 0 && (
              <p className="mt-6 border-t border-[var(--color-border)] pt-5 text-xs text-[var(--color-text-light)]">
                {cancelledOrders} cancelled order
                {cancelledOrders !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>

        {/* --------------------------------
            RECENT ORDERS + TOP PRODUCTS
        -------------------------------- */}

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          {/* Recent Orders */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  Activity
                </p>

                <h2 className="mt-1 text-xl font-semibold text-[var(--color-primary)]">
                  Recent Orders
                </h2>
              </div>
            </div>

            <div className="divide-y divide-[var(--color-border)]">
              {recentOrders.length === 0 ? (
                <div className="px-6 py-10 text-center text-sm text-[var(--color-text-light)]">
                  No orders yet.
                </div>
              ) : (
                recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[var(--color-primary)]">
                        {order.user.name || order.user.email}
                      </p>

                      <p className="mt-1 text-xs text-[var(--color-text-light)]">
                        #{order.id.slice(-8)}
                      </p>
                    </div>

                    <div className="flex items-center gap-5">
                      <span className="text-sm font-medium text-[var(--color-primary)]">
                        ৳{Number(order.total).toLocaleString()}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wide ${
                          order.status === "DELIVERED"
                            ? "bg-emerald-50 text-emerald-700"
                            : order.status === "CANCELLED"
                              ? "bg-red-50 text-red-600"
                              : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top Products */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm">
            <div className="border-b border-[var(--color-border)] px-6 py-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Performance
              </p>

              <h2 className="mt-1 text-xl font-semibold text-[var(--color-primary)]">
                Top Products
              </h2>
            </div>

            <div className="divide-y divide-[var(--color-border)]">
              {topProductData.length === 0 ? (
                <div className="px-6 py-10 text-center text-sm text-[var(--color-text-light)]">
                  No sales data yet.
                </div>
              ) : (
                topProductData.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 px-6 py-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-body)] text-xs font-semibold text-[var(--color-primary)]">
                      {index + 1}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[var(--color-primary)]">
                        {product.name}
                      </p>

                      <p className="mt-1 text-xs text-[var(--color-text-light)]">
                        {product.sold} sold
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Low Stock */}
        {lowStockProducts > 0 && (
          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600">
              <AlertTriangle size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold text-amber-900">
                Low stock alert
              </p>

              <p className="mt-1 text-xs text-amber-800">
                {lowStockProducts} product
                {lowStockProducts !== 1 ? "s have" : " has"} 5 or fewer items
                remaining.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
