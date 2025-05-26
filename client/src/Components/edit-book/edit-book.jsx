import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import BookForm from "../book-form/book-form";

const EditBook = ({ books, setBooks }) => {
  const { bookId } = useParams();
  const [editBook, setEditBook] = useState({});

  useEffect(() => {
    const bookToEdit = books.find((book) => book.bookId === parseInt(bookId));
    if (bookToEdit) {
      setEditBook(bookToEdit);
    }
  }, [bookId, books]);

  const handleBookUpdate = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.bookId === updatedBook.bookId ? updatedBook : book
      )
    );
  };

  return (
    <div>
      <BookForm editBook={editBook} onBookAdded={handleBookUpdate} />
    </div>
  );
};

export default EditBook;
