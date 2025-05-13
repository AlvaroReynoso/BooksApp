import React, { useState } from "react";
import Books from "../books/books";
import NewBook from "../new-book/newBook";
import { books as initialBooks } from "../../data";
import { useNavigate } from "react-router";
import "./dashboard.css";

const Dashboard = ({ oncloseSession }) => {
  const [books, setBooks] = useState(initialBooks);
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

  return (
    <div>
      <h1>Book Champions</h1>
      <div className="sesion-container">
        <button onClick={handleSession}>Cerrar Sesion</button>
      </div>
      <NewBook onBookAdded={handleOnBookAdded} />
      <Books books={books} handleDeleteBook={handleDeleteBook} />
    </div>
  );
};

export default Dashboard;
