import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadPath),
  filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const fileFilter = (_req: any, file: any, cb: any) => {
  if (file.fieldname === "book") {
    // Only allow PDFs for 'book'    const allowedMimeTypes = [
    //   "application/pdf",
    //   "application/msword",
    //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    //   "application/vnd.ms-powerpoint",
    //   "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
    //   "text/plain",
    // ];
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Book must be a PDF file"), false);
    }
  } else if (file.fieldname === "cover") {
    // Only allow images for 'cover'
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Cover must be an image"), false);
    }
  } else {
    cb(new Error("Unexpected file field"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export default upload;
