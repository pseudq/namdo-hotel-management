"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchFilter: "all" | "guests" | "receipts";
  setSearchFilter: (filter: "all" | "guests" | "receipts") => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState<
    "all" | "guests" | "receipts"
  >("all");

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchFilter,
        setSearchFilter,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
