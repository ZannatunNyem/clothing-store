"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useCart } from "@/context/CartContext";

type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
    stock: number;
  };
};

type Cart = {
  id: string;
  items: CartItem[];
};

export default function CheckoutPage() {
  const router = useRouter();
  const { refreshCart } = useCart();

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
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

    fetchCart();
  }, []);

  ////

  async function placeOrder() {
    if (
      !fullName.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !postalCode.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Information",
        text: "Please fill in all shipping details.",
        confirmButtonColor: "#5A4540",
      });

      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          phone,
          address,
          city,
          postalCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Unable to place order",
          text: data.error || "Something went wrong.",
          confirmButtonColor: "#5A4540",
        });

        return;
      }
      await refreshCart();

      await Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Your order has been created successfully.",
        confirmButtonColor: "#5A4540",
      });

      window.location.href = `/orders/${data.orderId}`;
      //window.location.href = `/orders/${data.order.id}`;
    } catch (error) {
      console.error("Place order error:", error);

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
  ////

  const total =
    cart?.items.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0,
    ) ?? 0;

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="animate-pulse">
          <div className="h-8 w-40 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-64 rounded bg-gray-100" />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="h-6 w-48 rounded bg-gray-200" />

              <div className="mt-6 space-y-5">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item}>
                    <div className="h-4 w-24 rounded bg-gray-100" />
                    <div className="mt-2 h-11 w-full rounded-xl bg-gray-100" />
                  </div>
                ))}
              </div>
            </div>

            <div className="h-64 rounded-2xl border border-gray-200 bg-white p-6" />
          </div>
        </div>
      </main>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Add some products before proceeding to checkout.
          </p>

          <Link
            href="/products"
            className="mt-7 flex h-11 items-center justify-center rounded-xl bg-[var(--color-primary)] px-7 text-sm font-medium text-white transition hover:bg-[var(--color-accent)]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-semibold text-[var(--color-primary)]">
          Checkout
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Enter your shipping information to complete your order.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Shipping Form */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            Shipping Information
          </h2>

          <div className="mt-6 space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-[var(--color-primary)]"
              >
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-2 h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none transition focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="text-sm font-medium text-[var(--color-primary)]"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="mt-2 h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none transition focus:border-[var(--color-primary)]"
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="text-sm font-medium text-[var(--color-primary)]"
              >
                Address
              </label>

              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House, road, area"
                rows={3}
                className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)]"
              />
            </div>

            {/* City + Postal Code */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="city"
                  className="text-sm font-medium text-[var(--color-primary)]"
                >
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Dhaka"
                  className="mt-2 h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none transition focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="text-sm font-medium text-[var(--color-primary)]"
                >
                  Postal Code
                </label>

                <input
                  id="postalCode"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="1200"
                  className="mt-2 h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none transition focus:border-[var(--color-primary)]"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={placeOrder}
              disabled={submitting}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-[var(--color-primary)] text-sm font-medium text-white transition hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </section>

        {/* Order Summary */}
        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[var(--color-primary)]">
                    {item.product.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="text-sm font-medium text-[var(--color-primary)]">
                  ${(Number(item.product.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="my-6 border-t border-gray-100" />

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="mt-4 flex justify-between text-lg font-semibold text-[var(--color-primary)]">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
