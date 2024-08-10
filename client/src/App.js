import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import AboutUS from "./pages/AboutUs";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Quicksand",
    },
  });

  const location = useLocation();
  const hiddenPaths = [
    "/login",
    "/register",
    "/account",
    "/dashboard",
    "/cart",
    "/order-details",
  ];
  const isHiddenPath = hiddenPaths.includes(location.pathname);

  return (
    <>
      <ThemeProvider theme={theme}>
        {!isHiddenPath && <Navbar />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/aboutus" element={<AboutUS />} />
        </Routes>
        {!isHiddenPath && <Footer />}
      </ThemeProvider>
    </>
  );
}
export default App;
