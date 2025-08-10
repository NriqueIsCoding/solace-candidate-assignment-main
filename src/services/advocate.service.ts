import db from "../db";
import { advocates } from "../db/schema";
import { ilike, or, sql, asc, desc } from "drizzle-orm";
import { FetchAdvocatesArgs } from "@localtypes/index";

export async function fetchAdvocatesWithPagination({ 
  searchTerm, 
  page, 
  limit, 
  sortColumn = "firstName", // Default sort column
  sortOrder = "asc",    // Default sort order
}: FetchAdvocatesArgs) {
  const offset = (page - 1) * limit;

  // Condition to specifically check if the search term matches a specialty
  const specialtySearchCondition = sql`CAST(${advocates.specialties} AS TEXT) ILIKE ${`%${searchTerm.toLowerCase()}%`}`;

  // Conditions for the search query
  const conditions = searchTerm ? [
    ilike(advocates.firstName, `%${searchTerm.toLowerCase()}%`),
    ilike(advocates.lastName, `%${searchTerm.toLowerCase()}%`),
    ilike(advocates.city, `%${searchTerm.toLowerCase()}%`),
    ilike(advocates.degree, `%${searchTerm.toLowerCase()}%`),
    specialtySearchCondition,
    sql`CAST(${advocates.yearsOfExperience} AS TEXT) ILIKE ${`%${searchTerm.toLowerCase()}%`}`,
  ] : [];

  // Createing base queries
  let advocateQuery = db.select().from(advocates);
  let totalCountQuery = db.select({ count: sql<number>`count(*)` }).from(advocates);

  // Apply search conditions only if they exist
  if (conditions.length > 0) {
    advocateQuery = advocateQuery.where(or(...conditions));
    totalCountQuery = totalCountQuery.where(or(...conditions));
  }
  
  // This line determine the sort order (asc or desc)
  const sortDirection = sortOrder === "asc" ? asc : desc;

  // We need to handle sorting on different columns.
  switch (sortColumn) {
    case "firstName":
      advocateQuery = advocateQuery.orderBy(sortDirection(advocates.firstName));
      break;
    case "lastName":
      advocateQuery = advocateQuery.orderBy(sortDirection(advocates.lastName));
      break;
    case "city":
      advocateQuery = advocateQuery.orderBy(sortDirection(advocates.city));
      break;
    case "yearsOfExperience":
      advocateQuery = advocateQuery.orderBy(sortDirection(advocates.yearsOfExperience));
      break;
    default:
      // Default sort on firstName if the sortColumn is not recognized
      advocateQuery = advocateQuery.orderBy(sortDirection(advocates.firstName));
      break;
  }

  // Executing the count query
  const totalCountResult = await totalCountQuery;
  const totalCount = totalCountResult[0].count;

  // Pagination
  const data = await advocateQuery.limit(limit).offset(offset);

  // Determine if any of the fetched advocates specialties match the search term
  const matchedSpecialty = searchTerm 
    ? data.some(advocate => 
        advocate.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : false;

  // console.log('data', data)
  return { data, totalCount, currentPage: page, limit, matchedSpecialty };
}
