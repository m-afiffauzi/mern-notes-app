import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="relative bg-primary-content min-h-screen px-4 pt-20">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route
              path="/dashboard"
              exact
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/dashboard" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
