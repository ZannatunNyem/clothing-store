import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";

export default async function AdminPage() {
  const session = await requireAdmin();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-gray-500">
        Welcome, {session.user.name || session.user.email}.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-[var(--color-primary)]">
            Products
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Manage your store products.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-[var(--color-primary)]">Orders</h2>
          <p className="mt-2 text-sm text-gray-500">Manage customer orders.</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-[var(--color-primary)]">
            Customers
          </h2>
          <p className="mt-2 text-sm text-gray-500">View store customers.</p>
        </div>
      </div>
    </main>
  );
}
