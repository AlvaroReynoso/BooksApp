import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteBookModal({ show, onClose, onConfirm }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar libro?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Estas seguro de eliminar el libro?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Volver
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteBookModal;
