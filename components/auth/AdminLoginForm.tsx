"use client";

import Swal from "sweetalert2";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { Eye, EyeOff, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        await Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "The email or password you entered is incorrect.",
          confirmButtonColor: "#B89B5E",
          confirmButtonText: "Try Again",
        });

        return;
      }

      const session = await getSession();

      if (session?.user?.role !== "ADMIN") {
        await Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "This account does not have administrator access.",
          confirmButtonColor: "#B89B5E",
        });

        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Welcome back",
        text: "Taking you to the administration panel...",
        confirmButtonColor: "#B89B5E",
        timer: 1200,
        showConfirmButton: false,
      });

      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "We couldn't complete your login. Please try again.",
        confirmButtonColor: "#B89B5E",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[460px]">
      {/* Back to Store */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-light)] transition hover:text-[var(--color-primary)]"
      >
        <ArrowLeft size={16} strokeWidth={1.8} />
        Back to Store
      </Link>

      {/* Card */}
      <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] px-7 py-8 shadow-[0_20px_55px_rgba(6,60,49,0.10)] sm:px-9 sm:py-9">
        {/* Brand */}
        <div className="mb-8 text-center">
          <p className="text-2xl font-medium uppercase tracking-[0.28em] text-[var(--color-accent)]">
            LUMÉ
          </p>

          <div className="mx-auto mt-4 h-px w-10 bg-[var(--color-accent)]" />

          <h1 className="mt-5 text-xl font-semibold text-[var(--color-primary)]">
            Administration
          </h1>

          <p className="mt-2 text-sm leading-6 text-[var(--color-text-light)]">
            Sign in to manage your store.
          </p>
        </div>

        {/* Security Notice */}
        <div className="mb-7 flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-body)] px-4 py-3.5">
          <ShieldCheck
            size={19}
            strokeWidth={1.8}
            className="mt-0.5 shrink-0 text-[var(--color-accent)]"
          />

          <div>
            <p className="text-xs font-semibold text-[var(--color-primary)]">
              Administrator access
            </p>

            <p className="mt-1 text-[11px] leading-5 text-[var(--color-text-light)]">
              This area is restricted to authorized store administrators.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="admin-email"
              className="mb-2 block text-sm font-medium text-[var(--color-text)]"
            >
              Email address
            </label>

            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-body)] px-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="admin-password"
                className="block text-sm font-medium text-[var(--color-text)]"
              >
                Password
              </label>
            </div>

            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-body)] px-4 pr-12 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[var(--color-text-light)] transition hover:text-[var(--color-primary)]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={18} strokeWidth={1.8} />
                ) : (
                  <Eye size={18} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-12 w-full rounded-xl bg-[var(--color-primary)] text-sm font-semibold tracking-wide text-white transition hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Signing in...
              </span>
            ) : (
              "Sign In to Administration"
            )}
          </button>
        </form>

        {/* Bottom note */}
        <p className="mt-7 text-center text-[11px] leading-5 text-[var(--color-text-light)]">
          Authorized personnel only. Your administrator session is protected by
          secure authentication.
        </p>
      </div>
    </div>
  );
}
