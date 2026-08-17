import Link from "next/link";
import SearchBar from "./SearchBar";

type NavLinksProps = {
  role?: string;
};

const NavLinks = ({ role }: NavLinksProps) => {
  if (role === "ADMIN") {
    return (
      <div className="flex items-center">
        <Link
          href="/admin/dashboard"
          className="text-sm font-medium tracking-wide text-white/90 transition-colors hover:text-[var(--color-accent)]"
        >
          Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-between gap-8">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-sm font-medium text-white/90 transition-colors hover:text-[var(--color-accent)]"
        >
          Home
        </Link>

        <Link
          href="/shop"
          className="text-sm font-medium text-white/90 transition-colors hover:text-[var(--color-accent)]"
        >
          Shop
        </Link>

        <Link
          href="/contact"
          className="text-sm font-medium text-white/90 transition-colors hover:text-[var(--color-accent)]"
        >
          Contact
        </Link>
      </div>

      <div className="ml-4 w-[300px] lg:w-[340px]">
        <SearchBar />
      </div>
    </div>
  );
};

export default NavLinks;
