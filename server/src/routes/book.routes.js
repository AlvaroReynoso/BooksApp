import { Router } from "express";
import {
  createBook,
  updateBook,
  getOneBook,
  getAllBooks,
  deleteBook,
} from "../services/book.services.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get("/books/:id", verifyToken, getOneBook);
router.get("/books", verifyToken, getAllBooks);
router.post("/books", verifyToken, createBook);
router.put("/books/:id", verifyToken, updateBook);
router.delete("/books/:id", verifyToken, deleteBook);

export default router;
