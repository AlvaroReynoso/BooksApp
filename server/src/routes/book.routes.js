import { Router } from "express";
import {
  createBook,
  updateBook,
  getOneBook,
  getAllBooks,
  deleteBook,
} from "../services/book.services.js";

const router = Router();

router.get("/books/:id", getOneBook);
router.get("/books", getAllBooks);
router.post("/books", createBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

export default router;
