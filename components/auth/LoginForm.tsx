"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import GoogleButton from "./GoogleButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  }

  return (
    <div className="w-full max-w-[440px] rounded-3xl border border-[#F1D9D1] bg-white px-8 py-9 shadow-[0_15px_45px_rgba(217,120,104,0.12)] sm:px-10 sm:py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <p className="mb-2 text-[28px] font-semibold uppercase tracking-[0.2em] text-[#D97868]">
          Welcome Back
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#5A4540]"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-xl border border-[#EED8D0] bg-[#FFFAF7] px-4 text-sm text-[#4A3732] outline-none transition placeholder:text-[#B9A39C] focus:border-[#E58A7A] focus:ring-2 focus:ring-[#F8D5CC]"
            required
          />
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[#5A4540]"
            >
              Password
            </label>

            {/* <button
              type="button"
              className="text-xs font-medium text-[#D97868] hover:text-[#B95F50]"
            >
              Forgot password?
            </button> */}
          </div>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded-xl border border-[#EED8D0] bg-[#FFFAF7] px-4 text-sm text-[#4A3732] outline-none transition placeholder:text-[#B9A39C] focus:border-[#E58A7A] focus:ring-2 focus:ring-[#F8D5CC]"
            required
          />
        </div>

        {/* Login */}
        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#E58A7A] text-sm font-semibold text-white transition hover:bg-[#D97868] active:scale-[0.99]"
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#F0DED8]" />
        <span className="text-xs text-[#A58E87]">OR</span>
        <div className="h-px flex-1 bg-[#F0DED8]" />
      </div>

      {/* Google */}
      <GoogleButton />

      {/* Register */}
      <p className="mt-7 text-center text-sm text-[#8B7770]">
        Don't have an account?{" "}
        <a
          href="/register"
          className="font-semibold text-[#D97868] hover:text-[#B95F50]"
        >
          Create account
        </a>
      </p>
    </div>
  );
}
