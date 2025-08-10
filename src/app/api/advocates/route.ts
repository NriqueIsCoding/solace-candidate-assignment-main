import { fetchAdvocatesWithPagination } from "../../../services/advocate.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "5", 10);

  const { data, totalCount, currentPage, limit: fetchedLimit } = await fetchAdvocatesWithPagination({
    searchTerm,
    page,
    limit,
  });

  return Response.json({
    data,
    totalCount,
    currentPage,
    limit: fetchedLimit,
  });
}
