const Banner = () => {
  return (
    <section className="overflow-hidden bg-[var(--color-body)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:flex-row-reverse lg:items-center lg:gap-16 lg:px-10 lg:py-20">
        {/* IMAGE COLLAGE */}
        <div className="w-full lg:w-1/2">
          <div className="mx-auto grid w-full max-w-[520px] grid-cols-2 gap-2.5 sm:gap-3">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div className="group relative overflow-hidden">
                <img
                  src="/1.jpg"
                  alt="Luxury clothing collection"
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="group relative overflow-hidden">
                <img
                  src="/2.jpg"
                  alt="Luxury fashion shoes"
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-2.5 pt-8 sm:gap-3 sm:pt-10">
              <div className="group relative overflow-hidden">
                <img
                  src="/3.jpg"
                  alt="Luxury jewelry"
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="group relative overflow-hidden">
                <img
                  src="/4.jpg"
                  alt="Luxury fabric"
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TEXT */}
        <div className="w-full text-center lg:w-1/2 lg:text-left">
          {/* COLLECTION LABEL */}
          <div className="mb-5 flex items-center justify-center gap-3 lg:justify-start">
            <span className="h-px w-8 bg-[var(--color-accent)] sm:w-10" />

            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[var(--color-accent)] sm:text-xs">
              New Collection
            </p>

            <span className="h-px w-8 bg-[var(--color-accent)] lg:hidden sm:w-10" />
          </div>

          {/* HEADING */}
          <h1 className="font-serif text-4xl font-medium leading-[1.08] tracking-tight text-[var(--color-text)] sm:text-5xl md:text-6xl lg:text-7xl">
            Find Your
            <span className="mt-2 block italic text-[var(--color-primary)]">
              Perfect Style
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mx-auto my-6 max-w-md text-sm leading-6 text-[var(--color-text-light)] sm:my-7 sm:text-base sm:leading-7 lg:mx-0">
            Discover timeless pieces crafted for every moment. Explore our
            latest collection and express your unique sense of style.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <button className="w-full rounded-full border border-[var(--color-accent)] bg-[var(--color-primary)] px-8 py-3 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-[var(--color-accent)] sm:w-auto">
              Shop Now
            </button>

            <button className="w-full rounded-full border border-[var(--color-accent)] bg-transparent px-8 py-3 text-sm font-medium tracking-wide text-[var(--color-primary)] transition duration-300 hover:bg-[var(--color-accent)] hover:text-white sm:w-auto">
              Explore Collection
            </button>
          </div>

          {/* BRAND DETAIL */}
          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
            <span className="h-px w-10 bg-[var(--color-border)] sm:w-16" />

            <span className="text-[10px] tracking-[0.3em] text-[var(--color-accent)] sm:text-xs">
              LUMÉ
            </span>

            <span className="h-px w-10 bg-[var(--color-border)] sm:w-16" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
