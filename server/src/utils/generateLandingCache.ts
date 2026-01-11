import { db } from "../configs/dbconnection.ts";
import { booksTable } from "../models/schema.ts";
import fs from "fs";
import path from "path";
export async function generateLandingCache() {
  const books = await db
    .select({
      id: booksTable.id,
      title: booksTable.title,
      author: booksTable.author,
      cover: booksTable.coverphoto,
      isFeatured: booksTable.isFeatured,
      category: booksTable.category,
    })
    .from(booksTable)
    .orderBy(booksTable.createdAt);

  const cacheData = {
    featuredBooks: books.filter((b) => b.isFeatured).slice(0, 1),
    latestBooks: books.slice(0, 13),
    updatedAt: new Date().toISOString(),
  };

  const cacheDir = path.join(process.cwd(), "src/cache");
  const filePath = path.join(cacheDir, "landing-books.json");

  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(cacheData, null, 2));

  console.log("✅ landing-books.json regenerated");
}
