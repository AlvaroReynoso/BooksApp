import "./App.css";
import Login from "./Components/auth/login/login";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./Components/dashboard/dashboard";
import NotFound from "./Components/notFound/not-found";
import Protected from "./Components/protected/protected";
import { Toaster, toast } from "react-hot-toast"; // Importar React Hot Toast
import { useState } from "react";
import Register from "./Components/register/register";

function App() {
  const [loggedIn, setloggedIn] = useState(false);

  const handleLogin = () => {
    setloggedIn(true);
    toast.success("Inicio de sesión exitoso");
  };

  const handleLogout = () => {
    setloggedIn(false);
    localStorage.removeItem("token");
    toast.success("Sesión cerrada");
  };

  const showError = (message) => {
    toast.error(message);
  };

  return (
    <div className="root-container">
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<Register onError={showError} />} />
          <Route path="login" element={<Login onLogin={handleLogin} />} />
          <Route element={<Protected isSignedIn={loggedIn} />}>
            <Route
              path="/library/*"
              element={<Dashboard onLogout={handleLogout} />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
