"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCart } from "@/context/CartContext";

type AddToCartButtonProps = {
  productId: string;
  stock: number;
};

export default function AddToCartButton({
  productId,
  stock,
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [checking, setChecking] = useState(true);

  const { refreshCart } = useCart();

  // Check whether this product is already in the cart
  useEffect(() => {
    async function checkCart() {
      try {
        const response = await fetch("/api/cart");

        if (!response.ok) {
          return;
        }

        const cart = await response.json();

        const itemExists = cart?.items?.some(
          (item: { productId: string }) => item.productId === productId,
        );

        setAdded(itemExists);
      } catch (error) {
        console.error("Check cart error:", error);
      } finally {
        setChecking(false);
      }
    }

    checkCart();
  }, [productId]);

  async function handleAddToCart() {
    try {
      setLoading(true);

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: data.message || "Failed to add product to cart.",
          confirmButtonColor: "#5A4540",
        });

        return;
      }

      // Change this button's state
      setAdded(true);

      // Update Navbar cart count immediately
      await refreshCart();

      // Success message
      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: "Your product has been added successfully.",
        confirmButtonColor: "#5A4540",
        timer: 1800,
        showConfirmButton: false,
      });

      console.log("Cart item:", data);
    } catch (error) {
      console.error("Add to cart error:", error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again.",
        confirmButtonColor: "#5A4540",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={stock <= 0 || loading || added || checking}
      className="h-11 w-full rounded-xl bg-[var(--color-primary)] text-sm font-medium tracking-wide text-white transition hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {stock <= 0
        ? "Out of Stock"
        : checking
          ? "Checking..."
          : added
            ? "Added"
            : loading
              ? "Adding..."
              : "Add to Cart"}
    </button>
  );
}
