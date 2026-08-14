"use client";

import Swal from "sweetalert2";
import GoogleButton from "./GoogleButton";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      const session = await getSession();

      await Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "You have logged in successfully.",
        confirmButtonColor: "#B89B5E",
        timer: 1500,
        showConfirmButton: false,
      });

      if (session?.user?.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
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
    <div className="w-full max-w-[440px] rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] px-8 py-9 shadow-[0_15px_45px_rgba(6,60,49,0.10)] sm:px-10 sm:py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <p className="mb-2 text-[28px] font-medium uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Welcome Back
        </p>

        <div className="mx-auto mt-3 h-px w-12 bg-[var(--color-accent)]" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[var(--color-text)]"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-body)] px-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-[var(--color-text)]"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-body)] px-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
            required
          />
        </div>

        {/* Login */}
        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-[var(--color-primary)] text-sm font-medium tracking-wide text-white transition hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-[var(--color-border)]" />

        <span className="text-xs tracking-widest text-[var(--color-text-light)]">
          OR
        </span>

        <div className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      {/* Google */}
      <GoogleButton />

      {/* Register */}
      <p className="mt-7 text-center text-sm text-[var(--color-text-light)]">
        Don't have an account?{" "}
        <a
          href="/register"
          className="font-medium text-[var(--color-accent)] transition hover:text-[var(--color-gold-dark)]"
        >
          Create account
        </a>
      </p>
    </div>
  );
}
