// import Link from "next/link";

// const NavLinks = () => {
//   return (
//     <div className="hidden lg:flex">
//       <ul className="menu menu-horizontal gap-1">
//         <li>
//           <Link
//             href="/"
//             className="text-[var(--color-body)] hover:bg-[var(--color-accent)]"
//           >
//             Home
//           </Link>
//         </li>

//         <li>
//           <Link
//             href="/shop"
//             className="text-[var(--color-body)] hover:bg-[var(--color-accent)]"
//           >
//             Shop
//           </Link>
//         </li>

//         <li>
//           <Link
//             href="/category/women"
//             className="text-[var(--color-body)] hover:bg-[var(--color-accent)]"
//           >
//             Women
//           </Link>
//         </li>

//         <li>
//           <Link
//             href="/category/men"
//             className="text-[var(--color-body)] hover:bg-[var(--color-accent)]"
//           >
//             Men
//           </Link>
//         </li>

//         <li>
//           <Link
//             href="/category/kids"
//             className="text-[var(--color-body)] hover:bg-[var(--color-accent)]"
//           >
//             Kids
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default NavLinks;

import Link from "next/link";

type NavLinksProps = {
  role?: string;
};

const NavLinks = ({ role }: NavLinksProps) => {
  // ADMIN NAVIGATION
  if (role === "ADMIN") {
    return (
      <div className="flex items-center gap-7">
        <Link
          href="/admin"
          className="text-white transition hover:text-[var(--color-accent)]"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/products"
          className="text-white transition hover:text-[var(--color-accent)]"
        >
          Products
        </Link>

        <Link
          href="/admin/orders"
          className="text-white transition hover:text-[var(--color-accent)]"
        >
          Orders
        </Link>

        <Link
          href="/admin/users"
          className="text-white transition hover:text-[var(--color-accent)]"
        >
          Users
        </Link>

        <Link
          href="/"
          className="text-[var(--color-accent)] transition hover:opacity-80"
        >
          Store
        </Link>
      </div>
    );
  }

  // CUSTOMER NAVIGATION
  return (
    <div className="flex items-center gap-7">
      <Link
        href="/"
        className="text-white transition hover:text-[var(--color-accent)]"
      >
        Home
      </Link>

      <Link
        href="/shop"
        className="text-white transition hover:text-[var(--color-accent)]"
      >
        Shop
      </Link>

      <Link
        href="/orders"
        className="text-white transition hover:text-[var(--color-accent)]"
      >
        Orders
      </Link>
    </div>
  );
};

export default NavLinks;
