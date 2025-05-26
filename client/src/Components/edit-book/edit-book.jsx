import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";
import BookForm from "../book-form/book-form";

const EditBook = ({ books, setBooks }) => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [editBook, setEditBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const bookToEdit = books.find((book) => book.bookId === parseInt(bookId));
    if (bookToEdit) {
      setEditBook(bookToEdit);
    }
  }, [bookId, books]);

  const handleBookUpdate = async (updatedBook) => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No hay token de autenticación");
      }

      const response = await fetch(`http://localhost:3000/books/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBook),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Token expirado o inválido");
        }
        throw new Error("Error al actualizar el libro");
      }

      const updatedBookFromServer = await response.json();

      // Actualizar el estado local
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.bookId === updatedBookFromServer.bookId
            ? updatedBookFromServer
            : book
        )
      );

      toast.success("El libro se actualizó con éxito.");
      // Navegar de vuelta a la lista de libros
      navigate("/library");
    } catch (error) {
      console.error("Error updating book:", error);
      setError(error.message);
      toast.error("Error al actualizar el libro.");

      // Si el token es inválido, redirigir al login
      if (error.message.includes("Token")) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <BookForm
        editBook={editBook}
        onBookAdded={handleBookUpdate}
        loading={loading}
      />
    </div>
  );
};

export default EditBook;
