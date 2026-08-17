"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) {
      router.push("/shop");
      return;
    }

    router.push(`/shop?search=${encodeURIComponent(value)}`);
  };

  const clearSearch = () => {
    setSearch("");
    router.push("/shop");
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-[380px]">
      <div className="group flex h-11 items-center overflow-hidden rounded-full border border-white/20 bg-white/95 shadow-sm transition-all duration-200 focus-within:border-[var(--color-accent)] focus-within:shadow-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="min-w-0 flex-1 bg-transparent px-5 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-light)]"
        />

        {search && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-text-light)] transition hover:bg-black/5 hover:text-[var(--color-text)]"
          >
            <X size={15} strokeWidth={1.8} />
          </button>
        )}

        <button
          type="submit"
          aria-label="Search"
          className="mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-white transition-all duration-200 hover:scale-105 hover:opacity-90"
        >
          <Search size={17} strokeWidth={2} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
