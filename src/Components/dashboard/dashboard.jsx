import React, { useState } from "react";
import Books from "../books/books";
import NewBook from "../new-book/newBook";
import { books as initialBooks } from "../../data";
import { replace, Route, Routes, useLocation, useNavigate } from "react-router";
import "./dashboard.css";
import BookDetails from "../book-details/book-details";

const Dashboard = ({ oncloseSession }) => {
  const [books, setBooks] = useState(initialBooks);
  const location = useLocation();
  const navigate = useNavigate();
  const handleOnBookAdded = (newBook) => {
    setBooks((prevBooks) => [
      ...prevBooks,
      { ...newBook, bookId: Math.random() },
    ]);
  };

  const handleDeleteBook = (bookId) => {
    console.log("Deleting book with ID:", bookId);
    const updatedBooks = books.filter((book) => book.bookId !== bookId);
    console.log("Updated books:", updatedBooks);
    setBooks(updatedBooks);
  }; 

  const handleSession = () => {
    navigate("/login");
    alert("Cerrando sesion");
    oncloseSession();
  };
  const handleAddBook = () => {
    navigate("/library/new-book", { replace: true });
  };

  return (
    <div>
      {location.pathname !== "/library/new-book" && (
        <div className="sesion-container">
          <button onClick={handleSession}>Cerrar Sesion</button>
          <button onClick={handleAddBook}>Agregar libro</button>
        </div>
      )}

      <h1>Book Champions</h1>
      <Routes>
        <Route
          index
          element={<Books books={books} handleDeleteBook={handleDeleteBook} />}
        />
        <Route path={"/:id"} element={<BookDetails/>} />
        <Route
          path={"/new-book"}
          element={<NewBook onBookAdded={handleOnBookAdded} />}
        />
      </Routes>
    </div>
  );
};

export default Dashboard;
