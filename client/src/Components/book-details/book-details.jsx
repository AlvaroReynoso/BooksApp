import { useLocation, useNavigate } from "react-router";
import { Badge, Button, Card } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import "./book-details.css";
import { useState } from "react";

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showBookForm, setShowBookForm] = useState(false);
  const book = location.state?.book;

  if (!book) {
    return (
      <div>
        <p>Error: No book details available.</p>
        <Button onClick={() => navigate("/library")}>
          Volver a la página principal
        </Button>
      </div>
    );
  }
  const {
    bookId,
    bookTitle,
    bookAuthor,
    bookRating,
    bookLength,
    imageUrl,
    available,
    summary,
  } = location.state.book;
  console.log(location.state.book);

  const clickHandler = () => {
    navigate("/library");
  };

  const editBookHandler = () => {
    console.log("Editando libro con ID:", bookId);
    navigate(`/library/edit-book/${bookId}`, { state: { book } });
  };

  console.log(imageUrl);
  const ratingStars = Array.from({ length: 5 }, (_, index) =>
    index < bookRating ? <StarFill key={index} /> : <Star key={index} />
  );

  return (
    <Card className=" container-card" key={bookId}>
      <div className="card-img">
        <Card.Img
          height={500}
          variant="top"
          src={`../../../public/${imageUrl}`}
        />
      </div>
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
        {ratingStars}
        <p>{bookLength} páginas</p>
        <div className="my-3">
          <p>Sinopsis:</p>
          <p>{summary}</p>
        </div>
        <Button className="me-2" onClick={editBookHandler}>
          {showBookForm ? "Ocultar formulario" : "Editar libro"}
        </Button>
        <Button className="me-2" onClick={clickHandler}>
          Volver a la página principal
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookDetails;
