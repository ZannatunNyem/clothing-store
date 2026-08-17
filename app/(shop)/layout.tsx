import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>

      <main className="flex-1">{children}</main>

      <Footer></Footer>
    </div>
  );
}
