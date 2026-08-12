const SearchBar = () => {
  return (
    <div className="form-control">
      <div className="join">
        <input
          type="text"
          placeholder="Search products..."
          className="input join-item w-64 bg-[var(--color-card)] text-[var(--color-text)] placeholder:text-[var(--color-text-light)]"
        />

        <button className="btn join-item bg-[var(--color-accent)] text-white hover:bg-[var(--color-primary)]">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
