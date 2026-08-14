import StatusForm from "./StatusForm";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href="/admin/orders"
          className="text-sm text-emerald-700 hover:underline"
        >
          ← Back to Orders
        </Link>

        <h1 className="mt-3 text-3xl font-semibold">Order Details</h1>

        <p className="mt-1 text-sm text-gray-500">Order ID: {order.id}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer */}
        <div className="rounded-xl border bg-white p-5">
          <h2 className="mb-4 text-xl font-semibold">Customer</h2>

          <p>
            <strong>Name:</strong> {order.user?.name || "N/A"}
          </p>

          <p className="mt-2">
            <strong>Email:</strong> {order.user?.email || "N/A"}
          </p>
        </div>

        {/* Shipping Address */}
        <div className="rounded-xl border bg-white p-5">
          <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>

          {order.address ? (
            <>
              <p>{order.address.fullName}</p>
              <p>{order.address.phone}</p>
              <p>{order.address.address}</p>
              <p>
                {order.address.city}, {order.address.postalCode}
              </p>
              <p>{order.address.country}</p>
            </>
          ) : (
            <p className="text-gray-500">No shipping address.</p>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="mt-6 rounded-xl border bg-white p-5">
        <h2 className="mb-4 text-xl font-semibold">Ordered Products</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Price</th>
                <th className="p-3">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{item.product.name}</td>

                  <td className="p-3">{item.quantity}</td>

                  <td className="p-3">৳{item.price.toString()}</td>

                  <td className="p-3">
                    ৳{(Number(item.price) * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 text-right text-xl font-semibold">
          Total: ৳{order.total.toString()}
        </div>
      </div>

      {/* Status */}
      <div className="mt-6 rounded-xl border bg-white p-5">
        <h2 className="mb-4 text-xl font-semibold">Order Status</h2>

        <StatusForm orderId={order.id} currentStatus={order.status} />
      </div>
    </div>
  );
}
