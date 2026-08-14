const features = [
  {
    title: "Quality First",
    description: "Thoughtfully selected materials for everyday comfort.",
  },
  {
    title: "Secure Shopping",
    description: "Your account and shopping experience are protected.",
  },
  {
    title: "Easy Ordering",
    description:
      "A simple and smooth shopping experience from start to finish.",
  },
  {
    title: "Made for Everyday",
    description:
      "Timeless T-shirts designed to fit effortlessly into your life.",
  },
];

export default function TrustSection() {
  return (
    <section className="border-t border-[var(--color-primary)]/10 bg-[var(--color-card)] px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title}>
              <div className="mb-4 h-1 w-10 rounded-full bg-[var(--color-accent)]" />

              <h3 className="text-lg font-bold text-[var(--color-primary)]">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--color-text-light)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
