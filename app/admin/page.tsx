import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";

export default async function AdminPage() {
  const session = await requireAdmin();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[var(--color-body)]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            LUMÉ Administration
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[var(--color-primary)] sm:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-[var(--color-text-light)]">
            Welcome back, {session.user.name || session.user.email}.
          </p>
        </div>

        {/* Overview */}
        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
            <p className="text-sm text-[var(--color-text-light)]">Store</p>

            <h2 className="mt-2 text-2xl font-semibold text-[var(--color-primary)]">
              LUMÉ
            </h2>

            <p className="mt-1 text-sm text-[var(--color-text-light)]">
              T-shirt collection
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
            <p className="text-sm text-[var(--color-text-light)]">Categories</p>

            <h2 className="mt-2 text-2xl font-semibold text-[var(--color-primary)]">
              3
            </h2>

            <p className="mt-1 text-sm text-[var(--color-text-light)]">
              Men · Women · Kids
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm">
            <p className="text-sm text-[var(--color-text-light)]">Account</p>

            <h2 className="mt-2 text-2xl font-semibold text-[var(--color-primary)]">
              ADMIN
            </h2>

            <p className="mt-1 text-sm text-[var(--color-text-light)]">
              Full store access
            </p>
          </div>
        </div>

        {/* Management */}
        <div>
          <h2 className="mb-5 text-xl font-semibold text-[var(--color-primary)]">
            Store Management
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Products */}
            <Link
              href="/admin/products"
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)] text-xl text-white">
                🛍️
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[var(--color-primary)]">
                Products
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--color-text-light)]">
                Add, edit, delete, and manage your T-shirt products.
              </p>

              <p className="mt-5 text-sm font-medium text-[var(--color-accent)] transition group-hover:translate-x-1">
                Manage Products →
              </p>
            </Link>

            {/* Orders */}
            <Link
              href="/admin/orders"
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)] text-xl text-white">
                📦
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[var(--color-primary)]">
                Orders
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--color-text-light)]">
                View customer orders and manage their order status.
              </p>

              <p className="mt-5 text-sm font-medium text-[var(--color-accent)] transition group-hover:translate-x-1">
                Manage Orders →
              </p>
            </Link>

            {/* Customers */}
          </div>
        </div>
      </div>
    </main>
  );
}
