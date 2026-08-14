import ProductCard from "./ProductCard";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  stock: number;
  category: {
    name: string;
  };
};

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-12 text-center">
        <p className="text-[var(--color-text-light)]">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
