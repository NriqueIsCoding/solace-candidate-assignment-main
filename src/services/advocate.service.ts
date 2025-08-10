import db from "../db";
import { advocates } from "../db/schema";
import { ilike, or, sql } from "drizzle-orm";
import { FetchAdvocatesArgs } from "@localtypes/index";

export async function fetchAdvocatesWithPagination({ searchTerm, page, limit }: FetchAdvocatesArgs) {
  const offset = (page - 1) * limit;

  // Conditions for the search query
  const conditions = searchTerm ? [
    ilike(advocates.firstName, `%${searchTerm.toLowerCase()}%`),
    ilike(advocates.lastName, `%${searchTerm.toLowerCase()}%`),
    ilike(advocates.city, `%${searchTerm.toLowerCase()}%`),
    ilike(advocates.degree, `%${searchTerm.toLowerCase()}%`),
    sql`${advocates.specialties}::jsonb @> ${JSON.stringify([searchTerm])}::jsonb`,
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

  // Executing the count query
  const totalCountResult = await totalCountQuery;
  const totalCount = totalCountResult[0].count;

  // Pagination
  const data = await advocateQuery.limit(limit).offset(offset);

  return { data, totalCount, currentPage: page, limit };
}
