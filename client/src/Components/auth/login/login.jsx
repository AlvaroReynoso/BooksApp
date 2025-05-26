import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import "./login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
    setErrors({ email: false, password: false });

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("El usuario no existe");
        }
        return res.json();
      })
      .then((data) => {
        const token = data.token || data.accessToken || data;
        localStorage.setItem("token", token);
        console.log("token saved:", token);
        onLogin();
        navigate("/library");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Card className="mt-5 mx-3 p-3 px-5 shadow">
      <Card.Body>
        <Row className="mb-2">
          <h5>¡Bienvenidos a Books Champion!</h5>
        </Row>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-4">
            <Form.Control
              type="email"
              required
              placeholder="Ingresar email"
              onChange={handleEmailChange}
              value={email}
              ref={emailRef}
              className={errors.email ? "border border-danger" : ""}
            />
            {errors.email && <p className="text-danger">Su email esta vacio</p>}
          </FormGroup>
          <FormGroup className="mb-4">
            <Form.Control
              type="password"
              required
              placeholder="Ingresar contraseña"
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
                  type="submit"
                  className="login-button"
                >
                  Iniciar sesión
                </Button>
                <Link className="link-register-button" to={"/register"}>
                  Registrarse
                </Link>
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;
