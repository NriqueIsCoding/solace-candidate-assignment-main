import { fetchAdvocatesWithPagination } from "../../../services/advocate.service";
import { SortOrder } from "@localtypes/index";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10); // Fallback "1"
  const limit = parseInt(searchParams.get("limit") || "5", 10); // Fallback "5"
  
  // Getting the sort column and provide a default if it's not present
  const sortColumn = searchParams.get("sortColumn") || "firstName";
  
  // Default to 'asc' if it's not present or invalid.
  const sortOrder = (searchParams.get("sortOrder") as SortOrder) || "asc"; // as SortOder: for type safety

  const { data, totalCount, currentPage, limit: fetchedLimit, matchedSpecialty } = await fetchAdvocatesWithPagination({
    searchTerm,
    page,
    limit,
    sortColumn,
    sortOrder,
  });

  return Response.json({
    data,
    totalCount,
    currentPage,
    limit: fetchedLimit,
    matchedSpecialty,
  });
}
