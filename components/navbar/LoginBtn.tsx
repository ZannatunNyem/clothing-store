"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, ChevronDown, CircleUserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function LoginBtn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (status === "loading") {
    return <div className="h-10 w-10 animate-pulse rounded-full bg-white/20" />;
  }

  const closeMenu = () => setOpen(false);

  // =========================
  // ADMIN
  // =========================
  if (status === "authenticated" && session.user?.role === "ADMIN") {
    return (
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2"
          aria-label="Open admin account menu"
        >
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "Admin"}
              className="h-10 w-10 rounded-full border-2 border-[var(--color-accent)] object-cover transition-opacity hover:opacity-85"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full ">
              <CircleUserRound size={25} className="text-white" />
            </div>
          )}

          {/* <ChevronDown
            size={15}
            className={`text-white transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          /> */}
        </button>

        {/* Admin Menu */}
        <div
          className={`absolute right-0 top-12 z-50 w-40 origin-top-right overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-lg transition-all duration-200 ${
            open
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-95 opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={() => {
              closeMenu();
              signOut({ callbackUrl: "/" });
            }}
            className="w-full px-4 py-3 text-left text-sm text-[var(--color-text)] transition hover:bg-[var(--color-body)]"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // NORMAL USER
  // =========================
  if (status === "authenticated") {
    return (
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2"
          aria-label="Open account menu"
        >
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="h-10 w-10 rounded-full border-2 border-[var(--color-accent)] object-cover transition-opacity hover:opacity-85"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full ">
              <CircleUserRound size={25} className="text-white" />
            </div>
          )}

          {/* <ChevronDown
            size={15}
            className={`text-white transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          /> */}
        </button>

        {/* User Menu */}
        <div
          className={`absolute right-0 top-12 z-50 w-48 origin-top-right overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-lg transition-all duration-200 ${
            open
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-95 opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={() => {
              closeMenu();
              router.push("/profile");
            }}
            className="w-full px-4 py-3 text-left text-sm text-[var(--color-text)] transition hover:bg-[var(--color-body)]"
          >
            Profile
          </button>

          <button
            type="button"
            onClick={() => {
              closeMenu();
              router.push("/orders");
            }}
            className="w-full border-t border-[var(--color-border)] px-4 py-3 text-left text-sm text-[var(--color-text)] transition hover:bg-[var(--color-body)]"
          >
            My Orders
          </button>

          <button
            type="button"
            onClick={() => {
              closeMenu();
              signOut({ callbackUrl: "/" });
            }}
            className="w-full border-t border-[var(--color-border)] px-4 py-3 text-left text-sm text-[var(--color-text)] transition hover:bg-[var(--color-body)]"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // LOGGED OUT
  // =========================
  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10"
        aria-label="Open account menu"
      >
        <CircleUserRound size={25} className="text-white" />
      </button>

      <div
        className={`absolute right-0 top-12 z-50 w-40 origin-top-right overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-lg transition-all duration-200 ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => {
            closeMenu();
            router.push("/login");
          }}
          className="w-full px-4 py-3 text-left text-sm text-[var(--color-text)] transition hover:bg-[var(--color-body)]"
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => {
            closeMenu();
            router.push("/register");
          }}
          className="w-full border-t border-[var(--color-border)] px-4 py-3 text-left text-sm text-[var(--color-text)] transition hover:bg-[var(--color-body)]"
        >
          Register
        </button>
      </div>
    </div>
  );
}
