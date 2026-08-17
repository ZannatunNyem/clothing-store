"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  ArrowLeft,
  CirclePlus,
  LogOut,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Add Products",
    href: "/admin/products/add",
    icon: CirclePlus,
  },
  {
    name: "Manage Products",
    href: "/admin/products/manage",
    icon: ShoppingBag,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: Package,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-5 z-40 hidden h-[calc(100vh-5rem)] w-64 shrink-0 border-r border-black/5 bg-[var(--color-text-body)] lg:flex lg:flex-col">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-8">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-black/30">
          Store Management
        </p>

        <div className="mt-5 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-black/50 hover:bg-[var(--color-body)] hover:text-[var(--color-primary)]"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="shrink-0  border-black/5 p-4">
        {/* Logout */}
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin" })}
          className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-primary transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} strokeWidth={1.8} />
          <span>Logout</span>
        </button>

        {/* Back to Store */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-black/50 transition-colors hover:bg-[var(--color-body)] hover:text-[var(--color-primary)]"
        >
          <ArrowLeft size={18} strokeWidth={1.8} />
          <span>Back to Store</span>
        </Link>
      </div>
    </aside>
  );
}
