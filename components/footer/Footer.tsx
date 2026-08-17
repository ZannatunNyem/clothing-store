import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block font-serif text-2xl tracking-[0.18em] text-[var(--color-accent)] transition-opacity hover:opacity-80"
            >
              LUMÉ
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Timeless pieces designed for everyday life. Thoughtfully selected
              for comfort, simplicity, and effortless style.
            </p>

            {/* Social Links */}
            <div className="mt-7 flex gap-5 text-sm text-white/60">
              <a
                href="#"
                className="transition-colors hover:text-[var(--color-accent)]"
              >
                Instagram
              </a>

              <a
                href="#"
                className="transition-colors hover:text-[var(--color-accent)]"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
              Shop
            </h3>

            <ul className="mt-6 space-y-4 text-sm text-white/60">
              <li>
                <Link
                  href="/shop"
                  className="transition-colors hover:text-white"
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?category=Men"
                  className="transition-colors hover:text-white"
                >
                  Men
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?category=Women"
                  className="transition-colors hover:text-white"
                >
                  Women
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?category=Kids"
                  className="transition-colors hover:text-white"
                >
                  Kids
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
              Customer Care
            </h3>

            <ul className="mt-6 space-y-4 text-sm text-white/60">
              <li>
                <Link
                  href="/orders"
                  className="transition-colors hover:text-white"
                >
                  Track Order
                </Link>
              </li>

              <li>
                <Link
                  href="/shipping"
                  className="transition-colors hover:text-white"
                >
                  Shipping & Delivery
                </Link>
              </li>

              <li>
                <Link
                  href="/returns"
                  className="transition-colors hover:text-white"
                >
                  Returns & Exchanges
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="transition-colors hover:text-white"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-accent)]">
              Contact
            </h3>

            <div className="mt-6 space-y-4 text-sm text-white/60">
              <p>
                <span className="block text-xs uppercase tracking-wider text-white/30">
                  Email
                </span>

                <a
                  href="mailto:hello@lume.com"
                  className="mt-1 inline-block transition-colors hover:text-white"
                >
                  hello@lume.com
                </a>
              </p>

              <p>
                <span className="block text-xs uppercase tracking-wider text-white/30">
                  Phone
                </span>

                <a
                  href="tel:+8801234567890"
                  className="mt-1 inline-block transition-colors hover:text-white"
                >
                  +880 1234 567 890
                </a>
              </p>

              <p>
                <span className="block text-xs uppercase tracking-wider text-white/30">
                  Location
                </span>

                <span className="mt-1 block">Dhaka, Bangladesh</span>
              </p>

              <Link
                href="/contact"
                className="inline-block pt-2 text-sm font-medium text-white underline underline-offset-4 transition-colors hover:text-[var(--color-accent)]"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        {/* <div className="mt-14 border-t border-white/10 pt-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-serif text-xl">Stay in the loop</h3>

              <p className="mt-2 text-sm text-white/50">
                Subscribe for new arrivals, exclusive offers, and updates.
              </p>
            </div>

            <form className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                className="h-11 min-w-0 flex-1 border border-white/15 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-[var(--color-accent)]"
              />

              <button
                type="submit"
                className="h-11 bg-[var(--color-accent)] px-6 text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-primary)] transition-opacity hover:opacity-90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div> */}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 text-xs text-white/40 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>© {new Date().getFullYear()} LUMÉ. All rights reserved.</p>

          <div className="flex flex-wrap gap-5">
            <Link
              href="/about"
              className="transition-colors hover:text-white/70"
            >
              About
            </Link>

            <Link
              href="/privacy"
              className="transition-colors hover:text-white/70"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-white/70"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="transition-colors hover:text-white/70"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
