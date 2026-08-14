import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import Link from "next/link";

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
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-semibold">Orders</h1>

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-4">{order.user?.name || order.user?.email}</td>

                <td className="p-4">৳{order.total.toString()}</td>

                <td className="p-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">{order.status}</td>

                <td className="p-4">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-medium text-emerald-700 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="p-8 text-center text-gray-500">No orders yet.</p>
        )}
      </div>
    </div>
  );
}
