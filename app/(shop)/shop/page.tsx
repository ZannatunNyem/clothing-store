"use client";

import { useEffect, useState } from "react";
import ProductGrid from "@/components/product/ProductGrid";
import { useRouter, useSearchParams } from "next/navigation";

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

const categories = [
  { name: "All", slug: "" },
  { name: "Men", slug: "Men" },
  { name: "Women", slug: "Women" },
  { name: "Kids", slug: "Kids" },
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const response = await fetch(
          category
            ? `/api/products?category=${encodeURIComponent(category)}`
            : "/api/products",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();

        // Search
        const searchTerm = search.trim().toLowerCase();

        const filteredProducts = searchTerm
          ? data.filter(
              (product) =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.slug.toLowerCase().includes(searchTerm) ||
                product.category.name.toLowerCase().includes(searchTerm) ||
                product.category.slug.toLowerCase().includes(searchTerm),
            )
          : data;

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, search]);

  function handleCategoryChange(slug: string) {
    if (slug) {
      // Keep search when changing category
      if (search) {
        router.push(
          `/shop?category=${encodeURIComponent(slug)}&search=${encodeURIComponent(search)}`,
        );
      } else {
        router.push(`/shop?category=${encodeURIComponent(slug)}`);
      }
    } else {
      // All category
      if (search) {
        router.push(`/shop?search=${encodeURIComponent(search)}`);
      } else {
        router.push("/shop");
      }
    }
  }

  const activeCategory = category.toLowerCase();

  return (
    <main className="min-h-screen bg-[var(--color-body)] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-[var(--color-accent)]">
            Our Collection
          </p>

          <h1 className="text-4xl font-semibold text-[var(--color-primary)] sm:text-5xl">
            Shop
          </h1>

          <div className="mx-auto mt-4 h-px w-12 bg-[var(--color-accent)]" />

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[var(--color-text-light)]">
            {search
              ? `Showing results for "${search}"`
              : "Discover timeless pieces carefully selected for your wardrobe."}
          </p>
        </div>

        {/* Mobile Categories */}
        <div className="mb-8 overflow-x-auto lg:hidden">
          <div className="flex min-w-max gap-2">
            {categories.map((item) => {
              const isActive = activeCategory === item.slug.toLowerCase();

              return (
                <button
                  key={item.name}
                  onClick={() => handleCategoryChange(item.slug)}
                  className={`rounded-full px-5 py-2.5 text-sm transition-all ${
                    isActive
                      ? "bg-[var(--color-primary)] text-white"
                      : "border border-[var(--color-primary)]/10 bg-white text-[var(--color-primary)] hover:border-[var(--color-accent)]"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Shop Layout */}
        <div className="flex gap-10 lg:items-start">
          {/* Sidebar */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-24">
              {/* Sidebar Header */}
              <div className="border-b border-[var(--color-primary)]/10 pb-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                  Categories
                </h2>
              </div>

              {/* Category Buttons */}
              <div className="py-7">
                <div className="space-y-3">
                  {categories.map((item) => {
                    const isActive = activeCategory === item.slug.toLowerCase();

                    return (
                      <button
                        key={item.name}
                        onClick={() => handleCategoryChange(item.slug)}
                        className={`group flex w-full items-center justify-between text-left text-sm transition-colors ${
                          isActive
                            ? "font-medium text-[var(--color-accent)]"
                            : "text-[var(--color-text-light)] hover:text-[var(--color-primary)]"
                        }`}
                      >
                        <span>{item.name}</span>

                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-all ${
                            isActive
                              ? "bg-[var(--color-accent)]"
                              : "bg-transparent group-hover:bg-[var(--color-accent)]"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="min-w-0 flex-1">
            {/* Product Toolbar */}
            <div className="mb-6 flex items-center justify-between pb-4">
              <div>
                {category && (
                  <p className="text-sm font-medium capitalize text-[var(--color-primary)]">
                    {category}
                  </p>
                )}

                {search && (
                  <p className="text-sm text-[var(--color-text-light)]">
                    Search: "{search}"
                  </p>
                )}
              </div>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="h-[430px] animate-pulse rounded-2xl bg-gray-300"
                  />
                ))}
              </div>
            ) : products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="py-20 text-center">
                <p className="text-lg font-medium text-[var(--color-primary)]">
                  No products found
                </p>

                <p className="mt-2 text-sm text-[var(--color-text-light)]">
                  {search
                    ? `No products match "${search}".`
                    : "There are no products in this category yet."}
                </p>

                <button
                  onClick={() => router.push("/shop")}
                  className="mt-6 text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-primary)] underline underline-offset-4 transition-colors hover:text-[var(--color-accent)]"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
