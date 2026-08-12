import Link from "next/link";
import { CircleUserRound } from "lucide-react";
const UserMenu = () => {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle text-[var(--color-body)]
        hover:bg-[var(--color-accent)] border-0"
      >
        <CircleUserRound size={24} />
      </div>

      <ul
        tabIndex={0}
        className="menu dropdown-content z-10 mt-3 w-48 rounded-box bg-[var(--color-card)] p-2 text-[var(--color-text)] shadow"
      >
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/orders">My Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
