"use client";

import { useEffect, useState } from "react";
import ProductGrid from "@/components/product/ProductGrid";
import { useSearchParams } from "next/navigation";
type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  stock: number;
  category: {
    id: string;
    name: string;
    slug: string;
  };
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  useEffect(() => {
    async function fetchProducts() {
      try {
        // const response = await fetch("/api/products");
        const response = await fetch(
          category
            ? `/api/products?category=${encodeURIComponent(category)}`
            : "/api/products",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-body)] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-[var(--color-accent)]">
            Our Collection
          </p>

          <h1 className="text-4xl font-semibold text-[var(--color-primary)] sm:text-5xl">
            Shop
          </h1>

          <div className="mx-auto mt-4 h-px w-12 bg-[var(--color-accent)]" />

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[var(--color-text-light)]">
            Discover timeless pieces carefully selected for your wardrobe.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[430px] animate-pulse rounded-2xl bg-gray-300"
              />
            ))}
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </main>
  );
}
