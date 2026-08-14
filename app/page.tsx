import Banner from "@/components/home/Banner";
import BrandSection from "@/components/home/BrandSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TrustSection from "@/components/home/TrustSection";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FeaturedProducts></FeaturedProducts>
      <CategorySection></CategorySection>
      <BrandSection></BrandSection>
      <TrustSection></TrustSection>
    </div>
  );
}
