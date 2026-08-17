import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import ProductForm from "../../ProductForm";

export default async function AddProductPage() {
  await requireAdmin();

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
          LUMÉ Administration
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-[var(--color-primary)]">
          Add Product
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Add a new product to your clothing store.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <ProductForm mode="add" categories={categories} />
      </div>
    </main>
  );
}
