import express from "express";
import type { Router } from "express";
import { authMiddleware } from "../middleware/verifyToken.ts";
import { uploadBook } from "../controllers/admin_controller.ts";
import upload from "../utils/multer.ts";

const adminrouter: Router = express.Router();

adminrouter.post(
  "/upload",
  authMiddleware,
  upload.fields([
    { name: "book", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  uploadBook
);
export default adminrouter;
