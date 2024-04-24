"use client`";

import { useSearchParams } from "next/navigation";

interface Pagination {
  page: number;
  limit: number;
  offset: number;
  query: string | null;
}

/**
 * Custom hook that retrieves pagination information from the URL search parameters.
 * @returns An object containing the current page and page limit.
 */
const useSearchParamsPagination = (): Pagination => {
  const searchParams = useSearchParams();

  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("search") || null;

  //The offset is used to determine the starting index of the data to be fetched.
  const offset = (page - 1) * limit;

  return { page, limit, query, offset };
};

export default useSearchParamsPagination;
