import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.length < 3) {
      setErrors({
        ...errors,
        name: true,
      });
      nameRef.current.focus();
      return;
    }

    if (!emailRef.current.value.length) {
      setErrors({
        ...errors,
        email: true,
      });
      emailRef.current.focus();
      return;
    }

    if (!password.length || password.length < 7) {
      setErrors({
        ...errors,
        password: true,
      });
      passwordRef.current.focus();
      return;
    }

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Usario registrado con éxito"), console.log(data);
      })
      .catch((err) => console.log(err));

    setErrors({ name: false, email: false, password: false });
    navigate("/login");
  };
  return (
    <div>
      <Card className="mt-5 mx-3 p-3 px-5 shadow">
        <Card.Body>
          <Row className="mb-2">
            <h5>¡Bienvenidos a Books Champion!</h5>
          </Row>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-4">
              <Form.Control
                type="text"
                required
                placeholder="Ingresar su nombre"
                onChange={handleNameChange}
                value={name}
                ref={nameRef}
                className={errors.name ? "border border-danger" : ""}
              />
              {errors.name && (
                <p className="text-danger">
                  Su nombre debe contener mas de 3 caracteres
                </p>
              )}
            </FormGroup>
            <FormGroup className="mb-4">
              <Form.Control
                type="email"
                required
                placeholder="Ingresar su email"
                onChange={handleEmailChange}
                value={email}
                ref={emailRef}
                className={errors.email ? "border border-danger" : ""}
              />
              {errors.email && (
                <p className=" text-danger">Su email debe ser valido</p>
              )}
            </FormGroup>
            <FormGroup className="mb-4">
              <Form.Control
                type="password"
                required
                placeholder="Ingresar su contraseña"
                onChange={handlePasswordChange}
                value={password}
                ref={passwordRef}
                className={errors.password ? "border border-danger" : ""}
              />
              {errors.password && (
                <p className=" text-danger">
                  Su contraseña debe contener mas de 7 caracteres
                </p>
              )}
            </FormGroup>
            <Row>
              <Col />
              <Col md={6} className="d-flex justify-content-end">
                <div className="buttons-container">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Volver
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="login-button"
                  >
                    Registrarse
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

export default Register;
