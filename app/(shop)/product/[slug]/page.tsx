import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--color-body)] px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Product Card */}
        <div className="card relative overflow-hidden bg-[var(--color-card)] shadow-xl lg:card-side">
          {/* Category Badge - Top Right */}
          <div className="absolute right-5 top-5 z-10 rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-lg">
            {product.category.name}
          </div>

          {/* Image */}
          <figure className="lg:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="h-full max-h-[650px] w-full object-cover"
            />
          </figure>

          {/* Information */}
          <div className="card-body justify-center p-7 sm:p-10 lg:w-1/2">
            {/* Product Label */}
            <span className="text-sm font-medium uppercase tracking-widest text-[var(--color-text-light)]">
              Product
            </span>

            {/* Name */}
            <h1 className="mt-4 text-4xl font-bold text-[var(--color-primary)] sm:text-5xl">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-3 text-3xl font-bold text-[var(--color-accent)]">
              ৳{product.price.toString()}
            </p>

            <div className="divider" />

            {/* Description */}
            <p className="text-base leading-7 text-[var(--color-text-light)]">
              {product.description}
            </p>

            {/* Stock */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-[var(--color-body)] p-4">
              <span className="font-medium text-[var(--color-text)]">
                Availability
              </span>

              <span
                className={`badge ${
                  product.stock > 0 ? "badge-success" : "badge-error"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of stock"}
              </span>
            </div>

            {/* Add to Cart */}
            <button
              disabled={product.stock <= 0}
              className="btn mt-5 h-14 border-none bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)]"
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
