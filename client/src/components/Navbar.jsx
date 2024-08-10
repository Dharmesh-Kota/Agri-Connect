import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [showNavbar, setShowNavbar] = useState(true);
  const { isLoggedIn, setIsLoggedIn, LogOut } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setShowNavbar(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const navbarStyle = {
    position: "fixed",
    width: "100%",
    top: "0",
    zIndex: 100,
    transition: "top 0.3s",
    top: showNavbar ? "0" : "-80px", // Adjust based on navbar height
    backdropFilter: "blur(10px)",
    margin: 0,
    overflowY: "hidden",
    zIndex: 4,
  };

  return (
    <nav className="navbar navbar-expand-lg p-1" style={navbarStyle}>
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "xx-large",
            fontFamily: "Quicksand",
          }}
        >
          <img
            src={Logo}
            alt="AgriConnect Logo"
            style={{ width: "55px", height: "45px" }}
          />{" "}
          AgriConnect
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <MenuIcon />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <Button
              disableRipple
              variant="text"
              sx={{
                fontWeight: "bold",
                transition: "all 0.3s ease",
                border: "2px solid transparent",
                "&:hover": {
                  borderBottom: "2px solid #134611",
                  borderTopRightRadius: "5px",
                  borderTopLeftRadius: "5px",
                },
              }}
            >
              <Link
                className="nav-link active"
                to="/"
                style={{
                  fontFamily: "Quicksand",
                  transition: "all 0.3s ease",
                  color: "#134611",
                }}
              >
                Home
              </Link>
            </Button>
            <Button
              disableRipple
              variant="text"
              sx={{
                fontWeight: "bold",
                transition: "all 0.3s ease",
                border: "2px solid transparent",
                "&:hover": {
                  borderBottom: "2px solid #134611",
                  borderTopRightRadius: "5px",
                  borderTopLeftRadius: "5px",
                },
              }}
            >
              <Link
                className="nav-link active"
                to="/work-applications"
                style={{
                  fontFamily: "Quicksand",
                  transition: "all 0.3s ease",
                  color: "#134611",
                }}
              >
                Hiring
              </Link>
            </Button>
            <Button
              disableRipple
              variant="text"
              sx={{
                fontWeight: "bold",
                transition: "all 0.3s ease",
                border: "2px solid transparent",
                "&:hover": {
                  borderBottom: "2px solid #134611",
                  borderTopRightRadius: "5px",
                  borderTopLeftRadius: "5px",
                },
              }}
            >
              <Link
                className="nav-link active"
                to="/rent-applications"
                style={{
                  fontFamily: "Quicksand",
                  transition: "all 0.3s ease",
                  color: "#134611",
                }}
              >
                Rent Applications
              </Link>
            </Button>
            <Button
              disableRipple
              variant="text"
              sx={{
                fontWeight: "bold",
                transition: "all 0.3s ease",
                border: "2px solid transparent",
                "&:hover": {
                  borderBottom: "2px solid #134611",
                  borderTopRightRadius: "5px",
                  borderTopLeftRadius: "5px",
                },
              }}
            >
              <Link
                className="nav-link active"
                to="/aboutus"
                style={{ fontFamily: "Quicksand", color: "#134611" }}
              >
                AboutUS
              </Link>
            </Button>
            {isLoggedIn ? (
              <>
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircleOutlinedIcon
                      fontSize="large"
                      style={{ fontFamily: "Quicksand", color: "#134611" }}
                    />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={handleClose}
                      sx={{ fontWeight: "bold", color: "#134611" }}
                    >
                      <Link className="nav-link" to="/profile">
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem
                      sx={{ fontWeight: "bold", color: "#134611" }}
                      onClick={() => {
                        handleClose();
                        LogOut();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </>
            ) : (
              <Button
                disableRipple
                variant="outlined"
                style={{ transition: "all 0.3s ease" }}
                sx={{
                  "&:hover": {
                    borderBottom: "1px solid #134611",
                    borderRadius: "5px",
                  },
                }}
              >
                <Link
                  className="nav-link"
                  to="/login"
                  style={{ fontFamily: "Quicksand" }}
                >
                  LogIn/SignUP
                </Link>
              </Button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
