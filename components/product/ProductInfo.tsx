type ProductInfoProps = {
  name: string;
  category: string;
  price: string;
  description: string;
  stock: number;
};

export default function ProductInfo({
  name,
  category,
  price,
  description,
  stock,
}: ProductInfoProps) {
  return (
    <div className="p-5">
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
        {category}
      </p>

      <h2 className="text-xl font-semibold text-[var(--color-primary)]">
        {name}
      </h2>

      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-text-light)]">
        {description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-[var(--color-accent)]">
          ৳{price}
        </span>

        <span
          className={`text-xs font-medium ${
            stock > 0 ? "text-[var(--color-success)]" : "text-red-600"
          }`}
        >
          {stock > 0 ? `${stock} available` : "Out of stock"}
        </span>
      </div>
    </div>
  );
}
