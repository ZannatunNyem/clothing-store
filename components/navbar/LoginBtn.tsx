"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginBtn() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <button
        disabled
        className="rounded-full bg-[#E58A7A] px-5 py-2.5 text-sm font-medium text-white opacity-50"
      >
        Login
      </button>
    );
  }

  if (status === "authenticated") {
    return (
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-full bg-[#E58A7A] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#D97868]"
      >
        Logout
      </button>
    );
  }

  return (
    <button
      onClick={() => router.push("/login")}
      className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#D97868]"
    >
      Login
    </button>
  );
}
