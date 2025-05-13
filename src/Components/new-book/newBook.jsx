import { Button, Card, Col, Form, Row } from "react-bootstrap";
import "./new-book.css";
import { useState } from "react";
// import { books } from "../../data";

const NewBook = ({ onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [available, setAvailable] = useState(false);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeAuthor = (e) => {
    setAuthor(e.target.value);
  };
  const handleChangeRating = (e) => {
    setRating(e.target.value);
  };
  const handleChangePageCount = (e) => {
    setPageCount(e.target.value);
  };
  const handleChangeImageUrl = (e) => {
    setImageUrl(e.target.value);
  };
  const handleChangeAvailable = (e) => {
    setAvailable(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookData = {
      bookTitle: title,
      bookAuthor: author,
      bookRating: rating,
      bookLength: pageCount,
      imageUrl,
      available,
    };
    onBookAdded(bookData);
    setTitle("");
    setAuthor("");
    setRating("");
    setPageCount("");
    setImageUrl("");
    setAvailable(false);
  };

  return (
    <Card className="m-4 w-100" bg="light">
      <Card.Body>
        <Form className="text-white" onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar título"
                  onChange={handleChangeTitle}
                  value={title}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="author">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar autor"
                  onChange={handleChangeAuthor}
                  value={author}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Puntuación</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresar cantidad de estrellas"
                  max={5}
                  min={0}
                  onChange={handleChangeRating}
                  value={rating}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="pageCount">
                <Form.Label>Cantidad de páginas</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingresar cantidad de páginas"
                  min={1}
                  onChange={handleChangePageCount}
                  value={pageCount}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-between">
            <Form.Group className="mb-3" controlId="imageUrl">
              <Form.Label>URL de imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar url de imagen"
                onChange={handleChangeImageUrl}
                value={imageUrl}
              />
            </Form.Group>
          </Row>
          <Row className="justify-content-end">
            <Col
              md={3}
              className="d-flex flex-column justify-content-end align-items-end"
            >
              <Form.Check
                type="switch"
                id="available"
                className="mb-3"
                label="¿Disponible?"
                onChange={handleChangeAvailable}
                value={available}
              />
              <Button variant="primary" type="submit">
                Agregar lectura
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NewBook;
