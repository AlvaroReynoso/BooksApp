import { Book } from "../models/book.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.log("Error al obtener los libros", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getOneBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);
  if (!book) {
    return res.status(404).send({
      message: "El libro no se encontro",
    });
  }
  res.json(book);
};

export const createBook = async (req, res) => {
  const {
    bookTitle,
    bookAuthor,
    bookRating,
    bookLength,
    imageUrl,
    available,
    summary,
  } = req.body;
  if (!bookTitle || !bookAuthor) {
    return res.status(400).send({
      message: "El titulo y el autor son obligatorios",
    });
  }
  const newBook = await Book.create({
    bookTitle,
    bookAuthor,
    bookRating,
    bookLength,
    imageUrl,
    available,
    summary,
  });
  res.json(newBook);
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const {
    bookTitle,
    bookAuthor,
    bookRating,
    bookLength,
    imageUrl,
    available,
    summary,
  } = req.body;

  if (!bookTitle || !bookAuthor) {
    return res.status(400).send({
      message: "El titulo y el autor son obligatorios",
    });
  }

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).send({
        message: "El libro no se encontró",
      });
    }

    await book.update({
      bookTitle,
      bookAuthor,
      bookRating,
      bookLength,
      imageUrl,
      available,
      summary,
    });

    res.json(book);
  } catch (error) {
    console.error("Error al actualizar el libro", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) {
    return res.status(404).send({
      message: "El libro no se encontro",
    });
  }
  await book.destroy();
  res.json(`Se elimino el libro con el id: ${book}`);
};
