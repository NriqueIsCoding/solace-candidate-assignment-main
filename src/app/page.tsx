"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import SearchBar from "./searchBar";
import AdvocateTable from "./advocateTable";
import PaginationControls from "./paginationControls";
import { Advocate } from "../types";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isTableLoading, setIsTableLoading] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 5; // we can set the desire items per page here

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchAdvocates = useCallback(async (term: string, page: number, limit: number, signal: AbortSignal) => {
    setIsTableLoading(true);

    try {
      const url = `/api/advocates?search=${encodeURIComponent(term)}&page=${page}&limit=${limit}`;
      console.log("Fetching from URL:", url);
      const response = await fetch(url, { signal });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { data, totalCount: newTotalCount } = await response.json();
      setAdvocates(data);
      setTotalCount(newTotalCount);
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted:", error.message);
      } else {
        console.error("Failed to fetch advocates:", error);
      }
    } finally {
      setIsTableLoading(false);
      setIsInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const debounceTimeout = setTimeout(() => {
      fetchAdvocates(searchTerm, currentPage, itemsPerPage, abortController.signal);
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
      abortController.abort();
    };
  }, [searchTerm, currentPage, fetchAdvocates]); // Re-fetch when search or page changes

  // Handler to update search term and reset page
  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1); // Resetting to the first page on a new search
  };

  // Handler to reset search term and page
  const handleResetSearch = () => {
    setSearchTerm("");
    setCurrentPage(1); // Reset to the first page on reset
  };

  if (isInitialLoading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          <span className="ml-4 text-xl mt-4 text-gray-500">Loading advocates...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8 flex flex-col">
      <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col flex-grow">
        <header className="mb-4">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
            Solace Advocates
          </h1>
        </header>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={handleSearchChange}
          handleResetSearch={handleResetSearch}
        />
        <AdvocateTable advocates={advocates} isTableLoading={isTableLoading} />
        <PaginationControls
          currentPage={currentPage}
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  );
}
