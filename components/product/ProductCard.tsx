import Link from "next/link";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import AddToCartButton from "./AddToCartButton";

type ProductCardProps = {
  product: {
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
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <Link href={`/product/${product.slug}`}>
        <ProductImage src={product.image} alt={product.name} />
      </Link>

      {/* Product Information */}
      <ProductInfo
        name={product.name}
        category={product.category.name}
        price={product.price}
        description={product.description}
        stock={product.stock}
      />

      {/* Add to Cart */}
      <div className="px-5 pb-5">
        <AddToCartButton productId={product.id} stock={product.stock} />
      </div>
    </article>
  );
}
