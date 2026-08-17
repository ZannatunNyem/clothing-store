"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import GoogleButton from "./GoogleButton";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState("");
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
          image,
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
    <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[0_12px_40px_rgba(6,60,49,0.08)]">
      <div className="grid lg:grid-cols-2">
        {/* Left — Image */}
        <div className="relative hidden min-h-[720px] lg:block">
          <img
            src="/img-3.jpg"
            alt="LUME fashion collection"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-[var(--color-primary)]/35" />

          {/* Image Content */}
          <div className="absolute inset-x-0 bottom-0 p-10 text-white">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]">
              LUME
            </p>

            <h2 className="max-w-sm text-3xl font-semibold leading-tight">
              Style that feels like you.
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
              Discover timeless pieces designed for your everyday style.
            </p>
          </div>
        </div>

        {/* Right — Registration Form */}
        <div className="px-7 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          {/* Header */}
          <div className="mb-8">
            <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
              Create Account
            </p>

            <h1 className="text-center text-2xl font-semibold tracking-tight text-[var(--color-text)]">
              Welcome to LUME
            </h1>

            <p className="mt-2 text-center text-sm leading-6 text-[var(--color-text-light)]">
              Enjoy a seamless shopping experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
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
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-body)] px-4 text-sm text-[var(--color-text)] outline-none transition-all placeholder:text-[var(--color-text-light)]/70 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/10"
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
                  minLength={6}
                />

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

            {/* Profile Image */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-medium text-[var(--color-text)]"
              >
                Profile image URL
                <span className="ml-1 text-xs font-normal text-[var(--color-text-light)]">
                  (optional)
                </span>
              </label>

              <input
                id="image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="h-12 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-body)] px-4 text-sm text-[var(--color-text)] outline-none transition-all placeholder:text-[var(--color-text-light)]/70 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/10"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-[var(--color-border)] accent-[var(--color-accent)]"
              />

              <label
                htmlFor="terms"
                className="cursor-pointer text-xs leading-5 text-[var(--color-text-light)]"
              >
                I agree to the{" "}
                <a
                  href="/terms"
                  className="font-medium text-[var(--color-accent)] underline underline-offset-2 transition hover:text-[var(--color-gold-dark)]"
                >
                  Terms & Conditions
                </a>
              </label>
            </div>

            {/* Register */}
            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-lg bg-[var(--color-primary)] text-sm font-semibold tracking-wide text-white transition-all hover:bg-[var(--color-accent)] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
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

          {/* Login */}
          <p className="mt-6 text-center text-sm text-[var(--color-text-light)]">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-[var(--color-accent)] transition hover:text-[var(--color-gold-dark)]"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
