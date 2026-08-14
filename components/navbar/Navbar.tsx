// import Link from "next/link";
// import SearchBar from "./SearchBar";
// import NavLinks from "./NavLinks";
// import CartButton from "./CartButton";
// import LoginBtn from "./LoginBtn";

// const Navbar = () => {
//   return (
//     <nav className="bg-[var(--color-navbar)] border-b border-[var(--color-accent)]/30">
//       <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center px-6">
//         {/* Logo */}
//         <Link
//           href="/"
//           className="font-serif text-2xl tracking-[0.18em] text-[var(--color-accent)] transition hover:opacity-80"
//         >
//           LUMÉ
//         </Link>

//         {/* Navigation */}
//         <div className="ml-12">
//           <NavLinks />
//         </div>

//         {/* Right Side */}
//         <div className="ml-auto flex items-center gap-5">
//           {/* Search */}
//           <div className="hidden lg:block">
//             <SearchBar />
//           </div>

//           {/* Cart */}
//           <CartButton />

//           {/* Login */}
//           <LoginBtn />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import Link from "next/link";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import CartButton from "./CartButton";
import LoginBtn from "./LoginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  const role = session?.user?.role;

  return (
    <nav className="bg-[var(--color-navbar)] border-b border-[var(--color-accent)]/30">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl tracking-[0.18em] text-[var(--color-accent)] transition hover:opacity-80"
        >
          LUMÉ
        </Link>

        {/* Navigation */}
        <div className="ml-12">
          <NavLinks role={role} />
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-5">
          {/* Search - Customer only */}
          {role !== "ADMIN" && (
            <div className="hidden lg:block">
              <SearchBar />
            </div>
          )}

          {/* Cart - Customer only */}
          {role !== "ADMIN" && <CartButton />}

          {/* Login / User */}
          <LoginBtn />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
