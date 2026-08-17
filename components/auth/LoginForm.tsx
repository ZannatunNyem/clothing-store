"use client";

import Swal from "sweetalert2";
import GoogleButton from "./GoogleButton";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

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
          text: "Invalid email or password.",
          confirmButtonColor: "#B89B5E",
        });

        return;
      }

      await getSession();

      await Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "You have logged in successfully.",
        confirmButtonColor: "#B89B5E",
        timer: 1500,
        showConfirmButton: false,
      });

      window.location.href = "/";
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again.",
        confirmButtonColor: "#B89B5E",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_12px_40px_rgba(6,60,49,0.08)]">
      <div className="grid lg:grid-cols-2">
        {/* LEFT — Image */}
        <div className="relative hidden min-h-[620px] lg:block">
          <img
            src="/img-4.jpg"
            alt="LUME collection"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[var(--color-primary)]/35" />

          <div className="absolute inset-x-0 bottom-0 p-10 text-white">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]">
              LUME
            </p>

            <h2 className="max-w-sm text-3xl font-semibold leading-tight">
              Welcome back to your style.
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
              Log in to explore your favorites and continue your shopping
              journey.
            </p>
          </div>
        </div>

        {/* RIGHT — Login Form */}
        <div className="px-7 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          {/* Header */}
          <div className="mb-8">
            <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
              Welcome Back
            </p>

            <h1 className="text-center text-2xl font-semibold tracking-tight text-[var(--color-text)]">
              Log in to LUME
            </h1>

            <p className="mt-2 text-center text-sm leading-6 text-[var(--color-text-light)]">
              Access your account and continue shopping.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[var(--color-text)]"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-body)] px-4 text-sm text-[var(--color-text)] outline-none transition-all placeholder:text-[var(--color-text-light)]/70 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/10"
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[var(--color-text)]"
                >
                  Password
                </label>

                <a
                  href="/forgot-password"
                  className="text-xs font-medium text-[var(--color-accent)] transition hover:text-[var(--color-gold-dark)]"
                >
                  Forgot password?
                </a>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-body)] px-4 pr-12 text-sm text-[var(--color-text)] outline-none transition-all placeholder:text-[var(--color-text-light)]/70 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/10"
                  required
                />

                {/* Eye Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[var(--color-text-light)] transition hover:bg-[var(--color-border)]/40 hover:text-[var(--color-primary)]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-lg bg-[var(--color-primary)] text-sm font-semibold tracking-wide text-white transition-all hover:bg-[var(--color-accent)] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--color-border)]" />

            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-light)]">
              Or
            </span>

            <div className="h-px flex-1 bg-[var(--color-border)]" />
          </div>

          {/* Google */}
          <GoogleButton />

          {/* Register */}
          <p className="mt-6 text-center text-sm text-[var(--color-text-light)]">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-[var(--color-accent)] transition hover:text-[var(--color-gold-dark)]"
            >
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
