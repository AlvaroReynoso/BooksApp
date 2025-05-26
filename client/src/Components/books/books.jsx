import React, { useState } from "react";
import BookItem from "../book-item/book-item";
import "./books.css";
import BookSearch from "../book-search/book-search";
const Books = ({ books, handleDeleteBook }) => {
  const [bookSelected, setBookSelected] = useState("");
  const [bookSearch, setBookSearch] = useState("");

  const handleBookSelected = (bookTitle) => {
    setBookSelected(bookTitle);
  };
  const handleBookSearch = (searchValue) => {
    setBookSearch(searchValue);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.bookTitle &&
      book.bookTitle.toLowerCase().includes(bookSearch.toLowerCase())
  );

  return (
    <div>
      <BookSearch handleBookSearch={handleBookSearch} />
      <p>{bookSelected && `Libros seleccionados: ${bookSelected}`} </p>
      <ul className="bookitem-grid">
        {filteredBooks.map((book) => (
          <li key={book.bookId}>
            <BookItem
              bookId={book.bookId}
              bookTitle={book.bookTitle}
              bookAuthor={book.bookAuthor}
              bookRating={book.bookRating}
              bookLength={book.bookLength}
              imageUrl={book.imageUrl}
              available={book.available}
              summary={book.summary}
              onBookSelected={handleBookSelected}
              handleDelete={handleDeleteBook}
            />
          </li>
        ))}
      </ul>
      {filteredBooks.length === 0 && <h3>No hay libros</h3>}
    </div>
  );
};
export default Books;
