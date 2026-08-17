"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-[var(--color-body)] px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="h-8 w-32 animate-pulse rounded bg-black/10" />
          <div className="mt-8 h-96 animate-pulse rounded-2xl bg-black/10" />
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-body)] px-5">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-accent)]">
            Account
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-[var(--color-primary)]">
            Please sign in
          </h1>

          <p className="mt-3 text-sm text-[var(--color-text-light)]">
            Sign in to view your profile.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-block bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-[var(--color-body)] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-accent)]">
            Account
          </p>

          <h1 className="mt-2 text-4xl font-semibold text-[var(--color-primary)]">
            My Profile
          </h1>

          <p className="mt-3 text-sm text-[var(--color-text-light)]">
            Manage your account and view your activity.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
          {/* User Header */}
          <div className="flex flex-col gap-6 border-b border-black/5 px-6 py-8 sm:flex-row sm:items-center sm:px-8">
            {/* Profile Image */}
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-[var(--color-body)]">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "Profile"}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-[var(--color-primary)]">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            {/* User Info */}
            <div>
              <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
                {user.name || "User"}
              </h2>

              <p className="mt-1 text-sm text-[var(--color-text-light)]">
                {user.email}
              </p>

              <span className="mt-3 inline-block rounded-full bg-[var(--color-body)] px-3 py-1 text-xs font-medium text-[var(--color-primary)]">
                {user.role || "User"}
              </span>
            </div>
          </div>

          {/* Account Information */}
          <div className="px-6 py-8 sm:px-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
              Account Information
            </h3>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {/* Name */}
              <div className="rounded-xl border border-black/5 p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-light)]">
                  Full Name
                </p>

                <p className="mt-2 text-sm font-medium text-[var(--color-primary)]">
                  {user.name || "Not available"}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-xl border border-black/5 p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-light)]">
                  Email
                </p>

                <p className="mt-2 break-all text-sm font-medium text-[var(--color-primary)]">
                  {user.email}
                </p>
              </div>

              {/* Account Type */}
              <div className="rounded-xl border border-black/5 p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-light)]">
                  Account Type
                </p>

                <p className="mt-2 text-sm font-medium capitalize text-[var(--color-primary)]">
                  {user.role || "User"}
                </p>
              </div>

              {/* Profile Photo */}
              <div className="rounded-xl border border-black/5 p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-light)]">
                  Profile Photo
                </p>

                <p className="mt-2 text-sm font-medium text-[var(--color-primary)]">
                  {user.image ? "Added" : "Not added"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 border-t border-black/5 pt-8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Quick Actions
              </h3>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Link
                  href="/orders"
                  className="flex items-center justify-center rounded-xl border border-black/10 px-5 py-3 text-sm font-medium text-white bg-[var(--color-accent)] transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-body)] hover:text-primary"
                >
                  My Orders
                </Link>

                <Link
                  href="/cart"
                  className="flex items-center justify-center rounded-xl border border-black/10 px-5 py-3 text-sm font-medium text-white bg-[var(--color-accent)] transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-body)] hover:text-primary"
                >
                  My Cart
                </Link>

                <Link
                  href="/shop"
                  className="flex items-center justify-center rounded-xl border border-black/10 px-5 py-3 text-sm font-medium text-white bg-[var(--color-accent)] transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-body)] hover:text-primary"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
