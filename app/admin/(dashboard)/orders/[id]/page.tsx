import StatusForm from "./StatusForm";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Package, User } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminOrderDetailsPage({ params }: Props) {
  await requireAdmin();

  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
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

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const statusLabel =
    order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase();

  const statusStyles: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    PROCESSING: "bg-blue-50 text-blue-700 border-blue-200",
    SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
    DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className="min-h-screen bg-[#f8f7f3]">
      <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/orders"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-700"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-medium text-emerald-700">
                Order Details
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-[#173d34]">
                #{order.id.slice(-8).toUpperCase()}
              </h1>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={15} />
                {orderDate}
              </div>
            </div>

            <span
              className={`w-fit rounded-full border px-4 py-1.5 text-sm font-medium ${
                statusStyles[order.status] ||
                "border-gray-200 bg-gray-50 text-gray-600"
              }`}
            >
              {statusLabel}
            </span>
          </div>
        </div>

        {/* Customer + Address */}
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          {/* Customer */}
          <div className="rounded-2xl border border-[#e5e1d7] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <User size={18} />
              </div>

              <h2 className="font-semibold text-[#173d34]">Customer</h2>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400">Name</p>
                <p className="mt-1 font-medium text-gray-700">
                  {order.user?.name || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="mt-1 text-sm text-gray-600">
                  {order.user?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="rounded-2xl border border-[#e5e1d7] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <MapPin size={18} />
              </div>

              <h2 className="font-semibold text-[#173d34]">Shipping Address</h2>
            </div>

            {order.address ? (
              <div className="space-y-1.5 text-sm text-gray-600">
                <p className="font-medium text-gray-800">
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
              <p className="text-sm text-gray-400">
                No shipping address available.
              </p>
            )}
          </div>
        </div>

        {/* Products */}
        <div className="overflow-hidden rounded-2xl border border-[#e5e1d7] bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <Package size={18} />
            </div>

            <h2 className="font-semibold text-[#173d34]">Ordered Products</h2>
          </div>

          {/* Desktop Header */}
          <div className="hidden grid-cols-[1fr_100px_120px_120px] border-b border-gray-100 bg-[#faf9f6] px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-400 sm:grid">
            <span>Product</span>
            <span>Quantity</span>
            <span>Price</span>
            <span className="text-right">Subtotal</span>
          </div>

          {/* Products */}
          <div className="divide-y divide-gray-100">
            {order.items.map((item) => {
              const subtotal = Number(item.price) * item.quantity;

              return (
                <div
                  key={item.id}
                  className="grid gap-4 px-6 py-5 sm:grid-cols-[1fr_100px_120px_120px] sm:items-center"
                >
                  {/* Product */}
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-[#f7f5ef]">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Package size={20} className="text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium text-[#173d34]">
                        {item.product.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-400 sm:hidden">
                        Qty: {item.quantity} × ৳{Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="hidden text-sm text-gray-600 sm:block">
                    {item.quantity}
                  </div>

                  {/* Price */}
                  <div className="hidden text-sm text-gray-600 sm:block">
                    ৳{Number(item.price).toFixed(2)}
                  </div>

                  {/* Subtotal */}
                  <div className="text-right font-medium text-[#173d34]">
                    ৳{subtotal.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="border-t border-gray-100 bg-[#faf9f6] px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                Order Total
              </span>

              <span className="text-2xl font-semibold text-emerald-700">
                ৳{Number(order.total).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-6 rounded-2xl border border-[#e5e1d7] bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="font-semibold text-[#173d34]">
              Update Order Status
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Change the current status of this order.
            </p>
          </div>

          <StatusForm orderId={order.id} currentStatus={order.status} />
        </div>
      </div>
    </div>
  );
}
