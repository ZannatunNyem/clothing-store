import Link from "next/link";
import { ShoppingCart } from "lucide-react";
const CartButton = () => {
  return (
    <Link
      href="/cart"
      className="btn btn-ghost btn-circle text-[var(--color-body)]
      hover:bg-[var(--color-accent)] border-0"
    >
      <ShoppingCart size={24} />
    </Link>
  );
};

export default CartButton;
