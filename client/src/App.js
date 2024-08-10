import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import { useAuth } from "./context/auth";
import AboutUS from "./pages/AboutUs";

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/aboutus" element={<AboutUS />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
