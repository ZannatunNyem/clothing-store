"use client";

import { FormEvent, useEffect, useState } from "react";
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

export default function AdminProductsPage() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");

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

  async function fetchCategories() {
    try {
      // We can use your existing public categories API if you have one.
      const response = await fetch("/api/categories");

      if (!response.ok) {
        throw new Error("Failed to fetch categories.");
      }

      const data = await response.json();

      setCategories(data);

      if (data.length > 0) {
        setCategoryId(data[0].id);
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Unable to load categories",
        text: "Please check your categories API.",
        confirmButtonColor: "#5A4540",
      });
    }
  }

  ////

  function startEditing(product: Product) {
    setEditingProduct(product);

    setName(product.name);
    setSlug(product.slug);
    setDescription(product.description);
    setPrice(String(product.price));
    setStock(String(product.stock));
    setImage(product.image);
    setCategoryId(product.category.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

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

  ////

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      await Promise.all([fetchProducts(), fetchCategories()]);

      setLoading(false);
    }

    loadData();
  }, []);

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleNameChange(value: string) {
    setName(value);

    if (!slug) {
      setSlug(createSlug(value));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !name.trim() ||
      !slug.trim() ||
      !description.trim() ||
      !price ||
      !image.trim() ||
      !stock ||
      !categoryId
    ) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete information",
        text: "Please complete all product fields.",
        confirmButtonColor: "#5A4540",
      });

      return;
    }

    setSubmitting(true);

    try {
      // const response = await fetch("/api/admin/products", {
      //   method: "POST",
      const response = await fetch(
        editingProduct
          ? `/api/admin/products/${editingProduct.id}`
          : "/api/admin/products",
        {
          method: editingProduct ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            slug,
            description,
            price,
            image,
            stock,
            categoryId,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Unable to create product",
          text: data.message || "Something went wrong.",
          confirmButtonColor: "#5A4540",
        });

        return;
      }

      // setProducts((current) => [data.product, ...current]);
      setProducts((current) =>
        editingProduct
          ? current.map((item) =>
              item.id === editingProduct.id ? data.product : item,
            )
          : [data.product, ...current],
      );

      setEditingProduct(null);
      setName("");
      setSlug("");
      setDescription("");
      setPrice("");
      setStock("");
      setImage("");

      Swal.fire({
        icon: "success",
        title: "Product Added",
        text: "The product was created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Create product error:", error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again.",
        confirmButtonColor: "#5A4540",
      });
    } finally {
      setSubmitting(false);
    }
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
      <div>
        <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
          Manage Products
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Add and manage products in your clothing store.
        </p>
      </div>

      {/* Add Product */}
      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-[var(--color-primary)]">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Product Name
              </label>

              <input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Classic Dress"
                className="mt-2 h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="text-sm font-medium text-gray-700">Slug</label>

              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="classic-dress"
                className="mt-2 h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-medium text-gray-700">Price</label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="29.99"
                className="mt-2 h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="text-sm font-medium text-gray-700">Stock</label>

              <input
                type="number"
                min="0"
                step="1"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="20"
                className="mt-2 h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>

              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[var(--color-primary)]"
              >
                <option value="">Select category</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Image URL
              </label>

              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="mt-2 h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the product..."
              rows={4}
              className="mt-2 w-full resize-none rounded-xl border border-gray-200 p-4 text-sm outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="h-11 rounded-xl bg-[var(--color-primary)] px-7 text-sm font-medium text-white transition hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {/* {submitting ? "Adding Product..." : "Add Product"} */}
            {submitting
              ? editingProduct
                ? "Updating Product..."
                : "Adding Product..."
              : editingProduct
                ? "Update Product"
                : "Add Product"}
          </button>
        </form>
      </section>

      {/* Products */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-[var(--color-primary)]">
          Products
        </h2>

        {products.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-gray-300 p-10 text-center">
            <p className="text-sm text-gray-500">No products found.</p>
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="divide-y divide-gray-100">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />

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

                  <p className="font-semibold text-[var(--color-primary)]">
                    ${Number(product.price).toFixed(2)}
                  </p>

                  {/* Edit + Delete */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEditing(product)}
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
