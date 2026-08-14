export default function BrandSection() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Text */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
            Our Philosophy
          </p>

          <h2 className="text-4xl font-bold leading-tight text-[var(--color-primary)] sm:text-5xl">
            Simple pieces.
            <br />
            Exceptional feeling.
          </h2>

          <p className="mt-6 max-w-lg text-base leading-8 text-[var(--color-text-light)]">
            We believe great style doesn't need to be complicated. Our
            collection focuses on timeless T-shirts that combine comfort,
            quality, and effortless elegance.
          </p>

          <p className="mt-4 max-w-lg text-base leading-8 text-[var(--color-text-light)]">
            Designed for everyday life, made to become the pieces you reach for
            again and again.
          </p>
        </div>

        {/* Decorative Box */}
        <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-3xl bg-[var(--color-primary)]">
          <div className="absolute h-72 w-72 rounded-full border border-[var(--color-accent)]/30" />

          <div className="absolute h-56 w-56 rounded-full border border-[var(--color-accent)]/20" />

          <div className="relative text-center">
            <p className="text-6xl font-bold text-[var(--color-accent)]">01</p>

            <p className="mt-4 text-sm uppercase tracking-[0.35em] text-white/70">
              Less. But Better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
