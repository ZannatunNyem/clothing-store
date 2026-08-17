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
    <nav className="sticky top-0 z-50 border-b border-[var(--color-accent)]/20 bg-[var(--color-navbar)]">
      {" "}
      <div className="mx-auto flex min-h-[76px] w-full max-w-7xl items-center gap-8 px-5 sm:px-7 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 font-serif text-xl tracking-[0.18em] text-[var(--color-accent)] transition-opacity hover:opacity-80 sm:text-2xl"
        >
          LUMÉ
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden min-w-0 flex-1 md:block">
          <NavLinks role={role} />
        </div>

        {/* Right Side */}
        <div className="ml-auto flex shrink-0 items-center gap-4">
          {role !== "ADMIN" && <CartButton />}

          <div className="h-6 w-px bg-white/15" />

          <LoginBtn />
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="border-t border-[var(--color-accent)]/10 px-5 py-3 md:hidden">
        <NavLinks role={role} />
      </div>
    </nav>
  );
};

export default Navbar;
