"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartButton = () => {
  const { cartCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative btn btn-ghost btn-circle text-[var(--color-body)] hover:bg-[var(--color-accent)] border-0"
      aria-label={`Shopping cart with ${cartCount} items`}
    >
      <ShoppingCart size={24} />

      {cartCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[10px] font-semibold text-white">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
