"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  stock: number;
  category: Category;
};

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      const response = await fetch("/api/admin/products");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products.");
      }

      setProducts(data);
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Unable to load products",
        text: "Please try again.",
        confirmButtonColor: "#5A4540",
      });
    }
  }

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    }

    loadProducts();
  }, []);

  async function deleteProduct(product: Product) {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete product?",
      text: `"${product.name}" will be permanently deleted.`,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Unable to delete",
          text: data.message || "Something went wrong.",
          confirmButtonColor: "#5A4540",
        });

        return;
      }

      setProducts((current) =>
        current.filter((item) => item.id !== product.id),
      );

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Product deleted successfully.",
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete product error:", error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again.",
        confirmButtonColor: "#5A4540",
      });
    }
  }

  function editProduct(product: Product) {
    window.location.href = `/admin/products/edit/${product.id}`;
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-300" />
          <div className="mt-8 h-96 rounded-2xl bg-gray-300" />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
            Manage Products
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View, edit, and delete products in your clothing store.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/admin/products/add";
          }}
          className="h-11 rounded-xl bg-[var(--color-primary)] px-6 text-sm font-medium text-white transition hover:bg-[var(--color-accent)]"
        >
          + Add Product
        </button>
      </div>

      {/* Products */}
      <section className="mt-8">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
            <p className="text-sm text-gray-500">No products found.</p>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/admin/products/add";
              }}
              className="mt-4 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white"
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="divide-y divide-gray-100">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
                >
                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />

                  {/* Product information */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-[var(--color-primary)]">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {product.category.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Stock: {product.stock}
                    </p>
                  </div>

                  {/* Price */}
                  <p className="font-semibold text-[var(--color-primary)]">
                    ${Number(product.price).toFixed(2)}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => editProduct(product)}
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteProduct(product)}
                      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
