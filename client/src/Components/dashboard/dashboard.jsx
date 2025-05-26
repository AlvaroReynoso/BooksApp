import React, { useEffect, useState } from "react";
import Books from "../books/books";
import NewBook from "../book-form/book-form";
import { books as initialBooks } from "../../data";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import "./dashboard.css";
import BookDetails from "../book-details/book-details";
import BookForm from "../book-form/book-form";
import EditBook from "../edit-book/edit-book";

const Dashboard = ({ onLogout }) => {
  const [books, setBooks] = useState(initialBooks);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/library") {
      fetch("http://localhost:3000/books", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setBooks([...data]);
        })
        .catch((err) => console.log(err));
    }
  }, [location]);

  const handleOnBookAdded = (enteredBook) => {
    fetch("http://localhost:3000/books", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify(enteredBook),
    })
      .then((res) => res.json())
      .then((data) => setBooks((prevBooks) => [data, ...prevBooks]))
      .catch((err) => console.log(err));
  };

  const handleDeleteBook = (bookId) => {
    console.log("Deleting book with ID:", bookId);
    const updatedBooks = books.filter((book) => book.bookId !== bookId);
    console.log("Updated books:", updatedBooks);
    setBooks(updatedBooks);
  };

  const handleLogout = () => {
    navigate("/login");
    onLogout();
  };
  const handleAddBook = () => {
    navigate("/library/new-book", { replace: true });
  };

  return (
    <div>
      {location.pathname !== "/library/new-book" && (
        <div className="sesion-container">
          <button onClick={handleLogout}>Cerrar Sesion</button>
          <button onClick={handleAddBook}>Agregar libro</button>
        </div>
      )}

      <h1>Book Champions</h1>
      <Routes>
        <Route
          index
          element={<Books books={books} handleDeleteBook={handleDeleteBook} />}
        />
        <Route path={"/:id"} element={<BookDetails />} />
        <Route
          path={"/new-book"}
          element={<BookForm onBookAdded={handleOnBookAdded} />}
        />
        <Route
          path="/edit-book/:bookId"
          element={<EditBook books={books} setBooks={setBooks} />}
        />
      </Routes>
    </div>
  );
};

export default Dashboard;
