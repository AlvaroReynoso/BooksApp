import { Badge, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./book-item.css";
import { useState } from "react";
import { Star, StarFill } from "react-bootstrap-icons";
import DeleteBookModal from "../ui/modal/modal";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function BookItem({
  bookId,
  bookTitle,
  bookAuthor,
  bookRating,
  bookLength,
  imageUrl,
  available,
  summary,
  handleDelete,
}) {
  const [show, setShow] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`${bookId}`, {
      state: {
        book: {
          bookId,
          bookTitle,
          bookAuthor,
          bookRating,
          bookLength,
          imageUrl,
          available,
          summary,
        },
      },
    });
  };

  const handleDeleteClick = (id) => {
    setSelectedBookId(id);
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
    setSelectedBookId(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedBookId) return;

    fetch(`http://localhost:3000/books/${selectedBookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar el libro");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Book deleted:", data);
        handleDelete(selectedBookId);
        toast.success("Libro eliminado correctamente");
      })
      .catch((err) => {
        console.error("Error eliminando el libro:", err);
        toast.error("Error al eliminar el libro");
      });

    setShow(false);
    setSelectedBookId(null);
  };

  return (
    <div className="card-container">
      <Card className="mx-3" style={{ width: "18rem" }} key={bookId}>
        <Card.Img
          height={400}
          variant="top"
          src={imageUrl ? imageUrl : "https://bit.ly/47NylZk"}
        />
        <Card.Body>
          <div className="mb-2">
            {available ? (
              <Badge bg="success">Disponible</Badge>
            ) : (
              <Badge bg="danger">Reservado</Badge>
            )}
          </div>
          <Card.Title>{bookTitle}</Card.Title>
          <Card.Subtitle>{bookAuthor}</Card.Subtitle>
          <div>
            {[...Array(6)].map((_, index) =>
              index < bookRating ? (
                <StarFill size={16} color="Orange" key={index} />
              ) : (
                <Star size={16} color="Orange" key={index} />
              )
            )}
          </div>
          <p>{bookLength} paginas</p>
          <Button
            className="button-container"
            onClick={handleUpdate}
            variant="primary"
          >
            Seleccionar libro
          </Button>
          <Button
            className="button-container"
            variant="danger"
            onClick={() => handleDeleteClick(bookId)}
          >
            Eliminar libro
          </Button>
        </Card.Body>
      </Card>
      <DeleteBookModal
        show={show}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default BookItem;
