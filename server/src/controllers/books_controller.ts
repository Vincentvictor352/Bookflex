import { type Request, type Response, type NextFunction } from "express";
import { db } from "../configs/dbconnection.ts";
import { booksTable } from "../models/schema.ts";
import { eq, inArray, sql } from "drizzle-orm";
import { HandleResponse } from "../utils/HandleResponse.ts";

export async function getFeaturedBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const books = await db
      .select()
      .from(booksTable)
      .where(eq(booksTable.isFeatured, true))
      .orderBy(sql`created_at DESC`);

    return HandleResponse(res, true, 200, books);
  } catch (err) {
    next(err);
  }
}

//  Get latest books (limit to e.g. 10)
export async function getLatestBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const books = await db
      .select()
      .from(booksTable)
      .orderBy(sql`created_at DESC`)
      .limit(10);

    return HandleResponse(res, true, 200, books);
  } catch (err) {
    next(err);
  }
}

//get all books
export async function getBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const category = req.query.category as string | undefined;

    const books = await db
      .select()
      .from(booksTable)
      .where(category ? eq(booksTable.category, category) : undefined);

    if (!books || books.length === 0) {
      return HandleResponse(
        res,
        false,
        404,
        category ? "No books found in this category" : "No books found"
      );
    }

    return HandleResponse(res, true, 200, books);
  } catch (err) {
    next(err);
  }
}
