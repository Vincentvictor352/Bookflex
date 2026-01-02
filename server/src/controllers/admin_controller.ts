import { type Request, type Response, type NextFunction } from "express";

import { booksTable } from "../models/schema.ts";
import { db } from "../configs/dbconnection.ts";
import { validateupdates } from "../utils/validation.ts";
import { HandleResponse } from "../utils/HandleResponse.ts";
import fs from "fs";
import { PDFDocument } from "pdf-lib";
import { uploadTocloudinary } from "../utils/uploadTocloudinary.ts";
import { eq } from "drizzle-orm";

export async function uploadBook(
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const bookFile = req.files?.book?.[0];
    const coverFile = req.files?.cover?.[0];
    const { title, author } = req.body;

    const { error } = validateupdates.validate({ title, author });
    if (error) {
      return HandleResponse(
        res,
        false,
        400,
        error.details[0]?.message as string
      );
    }
    if (!bookFile || !coverFile) {
      return HandleResponse(res, false, 400, "Book and cover required");
    }
    const pdfBuffer = fs.readFileSync(bookFile.path);

    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pageCount = pdfDoc.getPageCount();
    // Get number of pages

    //  Upload PDF to Cloudinary
    const bookUpload = await uploadTocloudinary.uploadBook(bookFile.path);

    //  Upload cover image to Cloudinary
    const coverUpload = await uploadTocloudinary.uploadCoverBook(
      coverFile.path
    );
    // Save to database
    await db.insert(booksTable).values({
      title,
      author,
      userId: req.user.id,
      filePath: bookUpload.url,
      filePublicId: bookUpload.publicId,
      coverphoto: coverUpload.url,
      coverPublicId: coverUpload.publicId,
      pageCount,
    });

    // 4 Delete local files
    fs.unlinkSync(bookFile.path);
    fs.unlinkSync(coverFile.path);

    return HandleResponse(res, true, 201, "Book uploaded successfully");
  } catch (err) {
    next(err);
  }
}

export async function updateBook(req: any, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { title, author } = req.body;

    const bookFile = req.files?.book?.[0];
    const coverFile = req.files?.cover?.[0];

    const [existingBook] = await db
      .select()
      .from(booksTable)
      .where(eq(booksTable.id, id))
      .limit(1);

    if (!existingBook) {
      return HandleResponse(res, false, 404, "Book not found");
    }

    const updateData: any = {};

    if (title) updateData.title = title;
    if (author) updateData.author = author;

    // 📘 Replace book file
    if (bookFile) {
      const pdfBuffer = fs.readFileSync(bookFile.path);
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      updateData.pageCount = pdfDoc.getPageCount();

      // delete old pdf from cloudinary
      await uploadTocloudinary.deleteFile(existingBook.filePublicId);

      const newBook = await uploadTocloudinary.uploadBook(bookFile.path);
      updateData.filePath = newBook.url;
      updateData.filePublicId = newBook.publicId;

      fs.unlinkSync(bookFile.path);
    }

    // 🖼 Replace cover image
    if (coverFile) {
      await uploadTocloudinary.deleteFile(existingBook.coverPublicId);

      const newCover = await uploadTocloudinary.uploadCoverBook(coverFile.path);
      updateData.coverphoto = newCover.url;
      updateData.coverPublicId = newCover.publicId;

      fs.unlinkSync(coverFile.path);
    }

    await db.update(booksTable).set(updateData).where(eq(booksTable.id, id));

    return HandleResponse(res, true, 200, "Book updated successfully");
  } catch (err) {
    next(err);
  }
}

// export async function deleteBook(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const { id } = req.params;

//     // const book = await db.query.booksTable.findFirst({
//     //   where: eq(booksTable.id, id),
//     // });
//     const [book] = await db
//       .select()
//       .from(booksTable)
//       .where(eq(booksTable.id, id))
//       .limit(1);
//     if (!book) {
//       return HandleResponse(res, false, 404, "Book not found");
//     }

//     // delete from cloudinary
//     await uploadTocloudinary.deleteFile(book.filePublicId);
//     await uploadTocloudinary.deleteFile(book.coverPublicId);

//     // delete from db
//     await db.delete(booksTable).where(eq(booksTable.id, id));

//     return HandleResponse(res, true, 200, "Book deleted successfully");
//   } catch (err) {
//     next(err);
//   }
// }
