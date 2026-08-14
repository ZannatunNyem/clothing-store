import Link from "next/link";

const categories = [
  {
    name: "Men",
    description: "Effortless essentials for him",
    href: "/shop?category=Men",
    image: "/man.jpg",
  },
  {
    name: "Women",
    description: "Refined everyday pieces for her",
    href: "/shop?category=Women",
    image: "/woman.png",
  },
  {
    name: "Kids",
    description: "Comfortable styles for little ones",
    href: "/shop?category=Kids",
    image: "/kid.jpg",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-[var(--color-primary)] px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
            Explore
          </p>

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Shop by Category
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-white/65">
            Find the perfect everyday T-shirt for every member of the family.
          </p>
        </div>

        {/* Categories */}
        <div className="grid gap-5 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative h-[380px] overflow-hidden rounded-2xl border border-white/10"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-[var(--color-primary)]/55 transition duration-500 group-hover:bg-[var(--color-primary)]/40" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                <p className="text-4xl font-bold text-white sm:text-5xl">
                  {category.name}
                </p>

                <p className="mt-4 text-sm text-white/80">
                  {category.description}
                </p>

                <span className="mt-7 text-sm font-semibold text-[var(--color-accent)] transition duration-300 group-hover:translate-x-1">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
