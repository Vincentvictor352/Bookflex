import express from "express";
import type { Router } from "express";
import { getBooks } from "../controllers/books_controller.ts";
import { authMiddleware } from "../middleware/verifyToken.ts";

const bookroute: Router = express.Router();
bookroute.get("/all", authMiddleware, getBooks);
export default bookroute;
