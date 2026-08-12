import Link from "next/link";

const NavLinks = () => {
  return (
    <div className="hidden lg:flex">
      <ul className="menu menu-horizontal gap-1">
        <li>
          <Link
            href="/"
            className="text-[var(--color-body)] hover:bg-[var(--color-accent)]"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/shop"
            className="text-[var(--color-body)] hover:bg-[var(--color-accent)]"
          >
            Shop
          </Link>
        </li>

        <li>
          <Link
            href="/category/women"
            className="text-[var(--color-body)] hover:bg-[var(--color-accent)]"
          >
            Women
          </Link>
        </li>

        <li>
          <Link
            href="/category/men"
            className="text-[var(--color-body)] hover:bg-[var(--color-accent)]"
          >
            Men
          </Link>
        </li>

        <li>
          <Link
            href="/category/kids"
            className="text-[var(--color-body)] hover:bg-[var(--color-accent)]"
          >
            Kids
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavLinks;
