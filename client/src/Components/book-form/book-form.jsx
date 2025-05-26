import { Button, Card, Col, Form, Row } from "react-bootstrap";
import "./book-form.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const BookForm = ({ onBookAdded, editBook, loading }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [available, setAvailable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (editBook) {
      setTitle(editBook.bookTitle);
      setAuthor(editBook.bookAuthor);
      setRating(editBook.bookRating);
      setPageCount(editBook.bookLength);
      setImageUrl(editBook.imageUrl);
      setSummary(editBook.summary);
      setAvailable(editBook.available);
    }
  }, [editBook]);

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

  const handleChangeSummary = (e) => {
    setSummary(e.target.value);
  };

  const handleChangeAvailable = (e) => {
    setAvailable(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) {
      toast.error("El título y el autor son obligatorios.");
      return;
    }

    const bookData = {
      bookTitle: title,
      bookAuthor: author,
      bookRating: rating,
      bookLength: pageCount,
      imageUrl,
      summary,
      available,
    };

    // Si estamos editando, incluir el bookId
    if (editBook) {
      bookData.bookId = editBook.bookId;
    }

    // Llamar a la función proporcionada por el componente padre
    onBookAdded(bookData);

    // Solo limpiar el formulario si no estamos editando
    if (!editBook) {
      toast.success("El libro se creó con éxito.");
      navigate("/library", { replace: true });
      setTitle("");
      setAuthor("");
      setRating("");
      setPageCount("");
      setImageUrl("");
      setSummary("");
      setAvailable(false);
    }
  };

  const handleBack = () => {
    navigate("/library", { replace: true });
  };

  return (
    <div className="card-container">
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
                    value={title || ""}
                    disabled={loading}
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
                    value={author || ""}
                    disabled={loading}
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
                    value={rating || ""}
                    disabled={loading}
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
                    value={pageCount || ""}
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="summary">
                <Form.Label>Resumen</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ingresar resumen del libro"
                  onChange={handleChangeSummary}
                  value={summary || ""}
                  disabled={loading}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>URL de imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar url de imagen"
                  onChange={handleChangeImageUrl}
                  value={imageUrl || ""}
                  disabled={loading}
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
                  checked={available || false}
                  disabled={loading}
                />
                <div className="button-card-container">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading
                      ? editBook
                        ? "Actualizando..."
                        : "Agregando..."
                      : editBook
                      ? "Actualizar libro"
                      : "Agregar libro"}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleBack}
                    disabled={loading}
                  >
                    Volver
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookForm;
