import Link from "next/link";

type NavLinksProps = {
  role?: string;
};

const NavLinks = ({ role }: NavLinksProps) => {
  // ADMIN NAVIGATION
  if (role === "ADMIN") {
    return (
      <div className="flex items-center gap-7">
        <Link
          href="/admin"
          className="text-white transition hover:text-[var(--color-accent)]"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/products"
          className="text-white transition hover:text-[var(--color-accent)]"
        >
          Products
        </Link>

        <Link
          href="/admin/orders"
          className="text-white transition hover:text-[var(--color-accent)]"
        >
          Orders
        </Link>

        <Link
          href="/admin"
          className="text-[var(--color-accent)] transition hover:opacity-80"
        >
          Admin
        </Link>
      </div>
    );
  }

  // CUSTOMER NAVIGATION
  return (
    <div className="flex items-center gap-7">
      <Link
        href="/"
        className="text-white transition hover:text-[var(--color-accent)]"
      >
        Home
      </Link>

      <Link
        href="/shop"
        className="text-white transition hover:text-[var(--color-accent)]"
      >
        Shop
      </Link>

      <Link
        href="/orders"
        className="text-white transition hover:text-[var(--color-accent)]"
      >
        Orders
      </Link>
    </div>
  );
};

export default NavLinks;
