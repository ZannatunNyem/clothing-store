"use client";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  stock: number;
};

type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
};

type Cart = {
  id: string;
  items: CartItem[];
};

export default function CartPage() {
  const { refreshCart } = useCart();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  async function fetchCart() {
    try {
      const response = await fetch("/api/cart");

      if (!response.ok) {
        setCart(null);
        return;
      }

      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  async function updateQuantity(itemId: string, quantity: number) {
    if (quantity < 1) return;

    setUpdating(itemId);

    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
          quantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Unable to update",
          text: data.message || "Something went wrong.",
          confirmButtonColor: "#5A4540",
        });

        return;
      }

      // Update Cart page
      setCart((currentCart) => {
        if (!currentCart) return currentCart;

        return {
          ...currentCart,
          items: currentCart.items.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  quantity: data.quantity,
                }
              : item,
          ),
        };
      });

      // Update Navbar cart count
      await refreshCart();
    } catch (error) {
      console.error("Update quantity error:", error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again.",
        confirmButtonColor: "#5A4540",
      });
    } finally {
      setUpdating(null);
    }
  }

  async function removeItem(itemId: string) {
    const result = await Swal.fire({
      icon: "warning",
      title: "Remove item?",
      text: "This product will be removed from your cart.",
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Keep",
      confirmButtonColor: "#5A4540",
    });

    if (!result.isConfirmed) return;

    setUpdating(itemId);

    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Unable to remove",
          text: data.message || "Something went wrong.",
          confirmButtonColor: "#5A4540",
        });

        return;
      }

      // Update Cart page
      setCart((currentCart) => {
        if (!currentCart) return currentCart;

        return {
          ...currentCart,
          items: currentCart.items.filter((item) => item.id !== itemId),
        };
      });

      // Update Navbar cart count
      await refreshCart();

      Swal.fire({
        icon: "success",
        title: "Removed",
        text: "The item has been removed from your cart.",
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Remove item error:", error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again.",
        confirmButtonColor: "#5A4540",
      });
    } finally {
      setUpdating(null);
    }
  }

  const total =
    cart?.items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0,
    ) ?? 0;

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Heading Skeleton */}
        <div className="animate-pulse">
          <div className="h-8 w-40 rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 w-64 rounded bg-gray-100" />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Cart Items Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4"
              >
                {/* Image */}
                <div className="h-24 w-24 shrink-0 animate-pulse rounded-xl bg-gray-200 sm:h-28 sm:w-28" />

                <div className="flex flex-1 flex-col justify-between">
                  {/* Product name */}
                  <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />

                  {/* Price */}
                  <div className="mt-2 h-4 w-20 animate-pulse rounded bg-gray-100" />

                  {/* Quantity */}
                  <div className="mt-4 h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
                </div>

                {/* Price */}
                <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>

          {/* Summary Skeleton */}
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />

            <div className="mt-7 flex justify-between">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
            </div>

            <div className="my-5 border-t border-gray-100" />

            <div className="flex justify-between">
              <div className="h-6 w-14 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="mt-6 h-11 w-full animate-pulse rounded-xl bg-gray-200" />
          </aside>
        </div>
      </main>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          {/* Cart Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-secondary)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-9 w-9 text-[var(--color-primary)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h12.75l3-9H5.106M7.5 14.25 5.106 5.272M7.5 14.25h9.75m-9.75 0a3 3 0 0 1-3-3m12.75 3a3 3 0 0 1-3 3m3-3h.008v.008H15v-.008Z"
              />
            </svg>
          </div>

          <h1 className="mt-6 text-3xl font-semibold text-[var(--color-primary)]">
            Your Cart is Empty
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
            Looks like you haven&apos;t added anything to your cart yet.
            Discover something beautiful and start shopping.
          </p>

          <a
            href="/products"
            className="mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-[var(--color-primary)] px-7 text-sm font-medium text-white transition hover:bg-[var(--color-accent)]"
          >
            Continue Shopping
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
          Your Cart
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Review your items before checkout.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Cart Items */}
        <div className="space-y-4">
          {cart.items.map((item) => {
            const itemSubtotal = Number(item.product.price) * item.quantity;

            const isUpdating = updating === item.id;

            return (
              <div
                key={item.id}
                className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-4"
              >
                {/* Product Image */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-28 w-28 rounded-xl object-cover"
                />

                {/* Product Info */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="font-medium text-[var(--color-primary)]">
                      {item.product.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      ${Number(item.product.price).toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1 || isUpdating}
                          className="px-3 py-1.5 text-lg transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span className="flex min-w-8 items-center justify-center text-sm font-medium text-[var(--color-primary)]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={
                            item.quantity >= item.product.stock || isUpdating
                          }
                          className="px-3 py-1.5 text-lg transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Small Loading Spinner */}
                      {isUpdating && (
                        <span
                          className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-[var(--color-primary)]"
                          aria-label="Updating"
                        />
                      )}
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={isUpdating}
                      className="text-sm text-red-500 transition hover:text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Subtotal */}
                <div className="text-right font-medium text-[var(--color-primary)]">
                  ${itemSubtotal.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            Order Summary
          </h2>

          <div className="mt-6 flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>

            <span>${total.toFixed(2)}</span>
          </div>

          <div className="my-4 border-t border-gray-100" />

          <div className="flex justify-between text-lg font-semibold text-[var(--color-primary)]">
            <span>Total</span>

            <span>${total.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 flex h-11 w-full items-center justify-center rounded-xl bg-[var(--color-primary)] text-sm font-medium text-white transition hover:bg-[var(--color-accent)]"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}
