import "./App.css";
import Login from "./Components/auth/login/login";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./Components/dashboard/dashboard";
import NotFound from "./Components/notFound/not-found";
import Protected from "./Components/protected/protected";
import { useState } from "react";
function App() {
  const [loggedIn, setloggedIn] = useState(false);

  const handleLogin = () => {
    setloggedIn(true);
  };

  const handleCloseLogin = () => {
    setloggedIn(false);
  };

  return (
    <div className="root-container">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login onLogin={handleLogin} />} />
          <Route element={<Protected isSignedIn={loggedIn} />}>
          <Route
            path="/library/*"
            element={<Dashboard oncloseSession={handleCloseLogin} />}
          />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
