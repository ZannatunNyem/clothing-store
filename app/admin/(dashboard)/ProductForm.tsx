"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type Category = {
  id: string;
  name: string;
};

type ProductData = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  stock: string;
  categoryId: string;
};

type ProductFormProps = {
  mode: "add" | "edit";
  product?: ProductData;
  categories: Category[];
};

export default function ProductForm({
  mode,
  product,
  categories,
}: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [image, setImage] = useState(product?.image || "");
  const [stock, setStock] = useState(product?.stock || "");
  const [categoryId, setCategoryId] = useState(product?.categoryId || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && product) {
      setName(product.name);
      setSlug(product.slug);
      setDescription(product.description);
      setPrice(product.price);
      setImage(product.image);
      setStock(product.stock);
      setCategoryId(product.categoryId);
    }
  }, [mode, product]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !name ||
      !slug ||
      !description ||
      !price ||
      !image ||
      !stock ||
      !categoryId
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing information",
        text: "Please fill in all fields.",
        confirmButtonColor: "#5A4540",
      });

      return;
    }

    setLoading(true);

    try {
      const payload = {
        name,
        slug,
        description,
        price: Number(price),
        image,
        stock: Number(stock),
        categoryId,
      };

      const url =
        mode === "add"
          ? "/api/admin/products"
          : `/api/admin/products/${product?.id}`;

      const response = await fetch(url, {
        method: mode === "add" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();

      let data = {};

      if (text) {
        data = JSON.parse(text);
      }

      if (!response.ok) {
        throw new Error(
          (data as { message?: string }).message || "Something went wrong.",
        );
      }

      await Swal.fire({
        icon: "success",
        title: mode === "add" ? "Product Added" : "Product Updated",
        text:
          mode === "add"
            ? "Product has been added successfully."
            : "Product has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/admin/products/manage");
      router.refresh();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error instanceof Error ? error.message : "Please try again.",
        confirmButtonColor: "#5A4540",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Name */}
      <div>
        <label className="mb-2 block text-sm font-medium">Product Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[var(--color-primary)]"
          placeholder="Enter product name"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="mb-2 block text-sm font-medium">Slug</label>

        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[var(--color-primary)]"
          placeholder="product-slug"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium">Description</label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[var(--color-primary)]"
          placeholder="Enter product description"
        />
      </div>

      {/* Price + Stock */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Price</label>

          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[var(--color-primary)]"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Stock</label>

          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[var(--color-primary)]"
            placeholder="0"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium">Category</label>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[var(--color-primary)]"
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
        <label className="mb-2 block text-sm font-medium">Image URL</label>

        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[var(--color-primary)]"
          placeholder="https://..."
        />

        {image && (
          <img
            src={image}
            alt="Product preview"
            className="mt-4 h-32 w-32 rounded-xl object-cover"
          />
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.push("/admin/products/manage")}
          className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-accent)] disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : mode === "add"
              ? "Add Product"
              : "Update Product"}
        </button>
      </div>
    </form>
  );
}
