type ProductImageProps = {
  src: string;
  alt: string;
};

export default function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-body)]">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  );
}
