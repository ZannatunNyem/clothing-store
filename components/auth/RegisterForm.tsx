"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import GoogleButton from "./GoogleButton";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        await Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.message || "Registration failed",
          confirmButtonColor: "#B89B5E",
        });

        return;
      }

      const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginResult?.error) {
        await Swal.fire({
          icon: "warning",
          title: "Account Created",
          text: "Your account was created. Please log in.",
          confirmButtonColor: "#B89B5E",
        });

        window.location.href = "/login";
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Your account has been created successfully.",
        confirmButtonColor: "#B89B5E",
        timer: 1500,
        showConfirmButton: false,
      });

      window.location.href = "/";
    } catch (error) {
      console.error("Registration error:", error);

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
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-[var(--color-accent)]">
          Join Us
        </p>

        <h1 className="text-[28px] font-medium leading-tight text-[var(--color-text)]">
          Create your account
        </h1>

        <div className="mx-auto mt-3 h-px w-12 bg-[var(--color-accent)]" />

        <p className="mt-3 text-sm text-[var(--color-text-light)]">
          Start your shopping journey with us
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-[var(--color-text)]"
          >
            Full name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-body)] px-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
            required
          />
        </div>

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-body)] px-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
            required
            minLength={6}
          />
        </div>

        {/* Register */}
        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-[var(--color-primary)] text-sm font-medium tracking-wide text-white transition hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}
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

      {/* Login */}
      <p className="mt-7 text-center text-sm text-[var(--color-text-light)]">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-medium text-[var(--color-accent)] transition hover:text-[var(--color-gold-dark)]"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}
