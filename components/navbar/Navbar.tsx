import Link from "next/link";
import NavLinks from "./NavLinks";
import CartButton from "./CartButton";
import LoginBtn from "./LoginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  return (
    <nav className="bg-[var(--color-navbar)] border-b border-[var(--color-accent)]/30">
      <div className="mx-auto flex min-h-[72px] w-full max-w-7xl items-center px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 font-serif text-xl sm:text-2xl tracking-[0.18em] text-[var(--color-accent)] transition hover:opacity-80"
        >
          LUMÉ
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavLinks role={role} />
        </div>

        {/* Right Side */}
        <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-5">
          {/* Cart - Customer only */}
          {role !== "ADMIN" && <CartButton />}

          {/* Login / User */}
          <LoginBtn />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-center border-t border-[var(--color-accent)]/10 px-4 py-3">
        <NavLinks role={role} />
      </div>
    </nav>
  );
};

export default Navbar;
