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
import WorkApplications from "./pages/WorkApplications";
import scrollToTop from "./scrollToTop.js";

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
        <scrollToTop />
        {!isHiddenPath && <Navbar />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/aboutus" element={<AboutUS />} />
          <Route
            exact
            path="/work-applications"
            element={<WorkApplications />}
          />
        </Routes>
        {!isHiddenPath && <Footer />}
      </ThemeProvider>
    </>
  );
}
export default App;
