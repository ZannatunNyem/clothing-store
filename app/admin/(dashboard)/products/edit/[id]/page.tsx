import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import ProductForm from "../../../ProductForm";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  await requireAdmin();

  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: {
        id,
      },
    }),

    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
          LUMÉ Administration
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-[var(--color-primary)]">
          Edit Product
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Update the information for this product.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <ProductForm
          mode="edit"
          categories={categories}
          product={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price.toString(),
            image: product.image,
            stock: product.stock.toString(),
            categoryId: product.categoryId,
          }}
        />
      </div>
    </main>
  );
}
