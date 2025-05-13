import { Badge, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./book-item.css";
import { useState } from "react";
import { Star, StarFill } from "react-bootstrap-icons";
import DeleteBookModal from "../ui/modal/modal";

function BookItem({
  bookId,
  bookTitle,
  bookAuthor,
  bookRating,
  bookLength,
  imageUrl,
  available,
  onBookSelected,
  handleDelete,
}) {
  const [showUpdate, setShowUpdate] = useState(bookTitle);
  const [show, setShow] = useState(false);

  const handleUpdate = () => {
    setShowUpdate("Libro Seleccionado");

    onBookSelected(bookTitle);
  };

  const handleDeleteClick = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleConfirmDelete = () => {
    handleDelete(bookId);
    setShow(false);
  };

  return (
    <div className="card-container">
      <Card className="mx-3" style={{ width: "18rem" }} key={bookId}>
        <Card.Img
          height={400}
          variant="top"
          src={imageUrl !== "" ? imageUrl : "https://bit.ly/47Nylzk"}
        />
        <Card.Body>
          <div className="mb-2">
            {available ? (
              <Badge bg="success">Disponible</Badge>
            ) : (
              <Badge bg="danger">Reservado</Badge>
            )}
          </div>
          <p>{showUpdate === "Libro Seleccionado" && `${showUpdate}`}</p>
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
            onClick={handleDeleteClick}
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
