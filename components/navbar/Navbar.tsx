import Link from "next/link";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import CartButton from "./CartButton";
import UserMenu from "./UserMenu";
import LoginBtn from "./LoginBtn";
const Navbar = () => {
  return (
    <div className="bg-[var(--color-navbar)] shadow-sm py-4">
      <div className="mx-auto flex w-full max-w-7xl items-center px-4">
        <Link href="/" className="text-2xl font-bold text-[var(--color-body)]">
          LUMÉ
        </Link>

        <div className="ml-8">
          <NavLinks />
        </div>

        <div className="ml-auto hidden md:block">
          <SearchBar />
        </div>

        <div className="ml-3 flex items-center gap-1">
          <CartButton />
          <LoginBtn />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
