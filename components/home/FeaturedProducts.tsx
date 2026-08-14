import prisma from "@/lib/prisma";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

export default async function FeaturedProducts() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

  return (
    <section className="px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
              Curated for you
            </p>

            <h2 className="text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
              Featured Collection
            </h2>

            <p className="mt-3 max-w-xl text-[var(--color-text-light)]">
              Discover our carefully selected pieces designed for everyday
              elegance.
            </p>
          </div>

          <Link
            href="/shop"
            className="font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent)]"
          >
            View All →
          </Link>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  description: product.description,
                  price: product.price.toString(),
                  image: product.image,
                  stock: product.stock,
                  category: {
                    name: product.category.name,
                  },
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--color-primary)]/10 bg-[var(--color-card)] p-12 text-center">
            <p className="text-[var(--color-text-light)]">
              Our collection is coming soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
