import { ChangeEvent, memo } from "react";
import Link from "next/link";

import { SearchBarProps } from "@/types/interfaces";

const SearchBar = memo(({ search, setSearch }: SearchBarProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="relative mx-auto flex max-w-screen-lg items-center justify-center px-4 md:px-8">
      <div
        className="absolute inset-y-0 left-0 flex items-center pl-8 md:pl-12"
        aria-hidden="true"
      >
        <i className="bi bi-search" />
      </div>

      <input
        type="search"
        className="w-full rounded bg-white px-4 py-3 pl-10"
        placeholder="Search boards..."
        value={search}
        onChange={handleSearchChange}
        maxLength={10}
        aria-label="Search boards"
      />

      <Link
        href="/board/create"
        className="trans ml-2 whitespace-nowrap rounded bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create board
      </Link>
    </div>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
