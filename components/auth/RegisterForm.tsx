"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import GoogleButton from "./GoogleButton";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

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
      alert(data.message || "Registration failed");
      return;
    }

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  }

  return (
    <div className="w-full max-w-[440px] rounded-3xl border border-[#F1D9D1] bg-white px-8 py-9 shadow-[0_15px_45px_rgba(217,120,104,0.12)] sm:px-10 sm:py-10">
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D97868]">
          Join Us
        </p>

        <h1 className="text-[28px] font-semibold leading-tight text-[#4A3732]">
          Create your account
        </h1>

        <p className="mt-2 text-sm text-[#8B7770]">
          Start your shopping journey with us
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-[#5A4540]"
          >
            Full name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 w-full rounded-xl border border-[#EED8D0] bg-[#FFFAF7] px-4 text-sm text-[#4A3732] outline-none transition placeholder:text-[#B9A39C] focus:border-[#E58A7A] focus:ring-2 focus:ring-[#F8D5CC]"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#5A4540]"
          >
            Email address
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
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-[#5A4540]"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded-xl border border-[#EED8D0] bg-[#FFFAF7] px-4 text-sm text-[#4A3732] outline-none transition placeholder:text-[#B9A39C] focus:border-[#E58A7A] focus:ring-2 focus:ring-[#F8D5CC]"
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#E58A7A] text-sm font-semibold text-white transition hover:bg-[#D97868] active:scale-[0.99]"
        >
          Create Account
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#F0DED8]" />
        <span className="text-xs text-[#A58E87]">OR</span>
        <div className="h-px flex-1 bg-[#F0DED8]" />
      </div>

      <GoogleButton />

      <p className="mt-7 text-center text-sm text-[#8B7770]">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-semibold text-[#D97868] hover:text-[#B95F50]"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}
