import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-serif text-2xl tracking-[0.18em] text-[var(--color-accent)] transition hover:opacity-80"
            >
              LUMÉ
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
              Timeless T-shirts designed for everyday comfort and effortless
              style. Simple pieces, thoughtfully made for you.
            </p>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
                Everyday Luxury
              </p>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Shop
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>
                <Link
                  href="/products"
                  className="transition hover:text-[var(--color-accent)]"
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=Men"
                  className="transition hover:text-[var(--color-accent)]"
                >
                  Men
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=Women"
                  className="transition hover:text-[var(--color-accent)]"
                >
                  Women
                </Link>
              </li>

              <li>
                <Link
                  href="/products?category=Kids"
                  className="transition hover:text-[var(--color-accent)]"
                >
                  Kids
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Customer
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>
                <Link
                  href="/orders"
                  className="transition hover:text-[var(--color-accent)]"
                >
                  My Orders
                </Link>
              </li>

              <li>
                <Link
                  href="/cart"
                  className="transition hover:text-[var(--color-accent)]"
                >
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="transition hover:text-[var(--color-accent)]"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-center text-xs text-white/50 sm:px-10 md:flex-row md:items-center md:justify-between md:text-left lg:px-16">
          <p>© {new Date().getFullYear()} YOURBRAND. All rights reserved.</p>

          <p className="tracking-wide">Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
