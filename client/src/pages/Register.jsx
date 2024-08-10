import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";
import {
  Grid,
  Avatar,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import axios from "axios";
import image1 from "../images/login_img.jpg";
import img1 from "../images/img1.png";
import config from "../config.js";

export default function Login() {
  axios.defaults.withCredentials = true;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);
  const [justVerify, setJustVerify] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const { setIsLoggedIn, validateUser, isLoggedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();

  const [isValidEmail, setIsValidEmail] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);

  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };

  const handlePasswordofLogin = (e) => {
    const input = e.target.value;
    setPassword(input);
    if (input.length < 8) {
      setValidPassword(false);
      return;
    } else {
      setValidPassword(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setJustVerify(true);
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      password !== repassword ||
      location == "" ||
      !validPassword ||
      username.length >= 255 ||
      email.length >= 255 ||
      password.length > 255
    ) {
      return;
    }
    setLoading(true);

    try {
      const results = await axios.post(
        (config.BACKEND_API || "http://localhost:8000") + "/sign-up",
        {
          username,
          email,
          name,
          password,
          location,
        }
      );
      if (results.status === 201) {
        toast.success("Sign Up successful!");
        navigate("/login");
      } else {
        toast.error("An error occurred during registration.");
      }
    } catch (err) {
      toast.error("Error Occured !!");
      console.log("error -> ", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      validateUser();
    } else {
      navigate(-1);
    }
  }, []);

  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        };

        const response = await fetch(
          (config.BACKEND_API || "http://localhost:8000") + "/getTomTomApiKey",
          { headers }
        );
        const data = await response.json();
        setApiKey(data.apiKey?.trim());
      } catch (error) {
        console.error("Error fetching API key:", error);
      }
    };
    fetchApiKey();
  }, []);

  const initializeTomTomSearchBox = (apiKey) => {
    var options = {
      searchOptions: {
        key: apiKey,
        language: "en-GB",
        limit: 5,
        placeholder: "Search for Nearby Location",
      },
      autocompleteOptions: {
        key: apiKey,
        language: "en-GB",
      },
    };

    // Set the container to the ID of the div
    options.container = "#searchBoxContainer";

    var ttSearchBox = new window.tt.plugins.SearchBox(
      window.tt.services,
      options
    );

    ttSearchBox.on("tomtom.searchbox.resultselected", function (data) {
      const newLocation =
        String(data.data.result.position.lat) +
        "," +
        String(data.data.result.position.lng);
      document.getElementById("location").value = newLocation;
      setLocation(newLocation);
    });

    var searchBoxHTML = ttSearchBox.getSearchBoxHTML();
    document.getElementById("searchBoxContainer").appendChild(searchBoxHTML);
  };

  useEffect(() => {
    if (apiKey) {
      initializeTomTomSearchBox(apiKey);
    }
  }, [apiKey]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        paddingX: { xs: 2, sm: 4 },
        paddingY: { xs: 4, sm: 6 },
        // background:
        // "radial-gradient(788px at 0.7% 3.4%, rgb(164, 231, 192) 0%, rgb(255, 255, 255) 90%)",
        background: `url(${img1}) no-repeat bottom center fixed`,
        backgroundSize: "cover",
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        sx={{
          padding: { xs: 2, sm: 4 },
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          backdropFilter: "blur(12px)",
          backgroundColor: "transparent",
        }}
      >
        <Avatar sx={{ backgroundColor: "#134611", mb: 2 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                color="success"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                id="name"
                label="Name"
                placeholder="Name"
                variant="outlined"
                fullWidth
                required
                size="small"
                autoComplete="off"
                error={justVerify && (name === "" || name.length >= 255)}
                helperText={
                  justVerify &&
                  (name === "" ? "This field cannot be empty." : "")
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#134611" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 25,
                    fontWeight: "bold",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="success"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                id="username"
                label="Username"
                placeholder="username"
                variant="outlined"
                fullWidth
                required
                size="small"
                autoComplete="off"
                error={
                  justVerify && (username === "" || username.length >= 255)
                }
                helperText={
                  justVerify &&
                  (username === "" ? "This field cannot be empty." : "")
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#134611" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 25,
                    fontWeight: "bold",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="success"
                value={email}
                onChange={handleEmailChange}
                id="email"
                label="Email"
                placeholder="abc@gmail.com"
                variant="outlined"
                fullWidth
                required
                size="small"
                autoComplete="off"
                error={
                  justVerify &&
                  (email === "" || email.length >= 255 || !isValidEmail)
                }
                helperText={
                  justVerify &&
                  (email === ""
                    ? "This field cannot be empty."
                    : !isValidEmail
                    ? "Invalid Email-id"
                    : "")
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRoundedIcon sx={{ color: "#134611" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 25,
                    fontWeight: "bold",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="success"
                value={password}
                onChange={handlePasswordofLogin}
                id="password"
                label="Password"
                placeholder="password"
                variant="outlined"
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                size="small"
                autoComplete="off"
                error={
                  justVerify &&
                  (!validPassword || password === "" || password.length >= 255)
                }
                helperText={
                  justVerify &&
                  (password === ""
                    ? "This field cannot be empty."
                    : !validPassword
                    ? "The password must contain at least 8 characters."
                    : "")
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyRoundedIcon sx={{ color: "#134611" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility sx={{ color: "#134611" }} />
                        ) : (
                          <VisibilityOff sx={{ color: "#134611" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 25,
                    fontWeight: "bold",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="success"
                value={repassword}
                onChange={(e) => {
                  setRePassword(e.target.value);
                }}
                id="confirm-password"
                label="Confirm Password"
                placeholder="Confirm Password"
                variant="outlined"
                fullWidth
                required
                size="small"
                autoComplete="off"
                name="password"
                type={showPasswordConfirm ? "text" : "password"}
                error={
                  justVerify && (repassword === "" || repassword !== password)
                }
                helperText={
                  justVerify &&
                  (repassword === ""
                    ? "This field cannot be empty."
                    : repassword !== password
                    ? "Password doesn't match"
                    : "")
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyRoundedIcon sx={{ color: "#134611" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConfirm}
                        onMouseDown={handleMouseDownPasswordConfirm}
                        edge="end"
                      >
                        {showPasswordConfirm ? (
                          <Visibility sx={{ color: "#134611" }} />
                        ) : (
                          <VisibilityOff sx={{ color: "#134611" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 25,
                    fontWeight: "bold",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography fontWeight="bold">
                <LocationOnRoundedIcon sx={{ color: "#134611" }} /> Location*
              </Typography>
              <Grid item margin={0} padding={0} id="searchBoxContainer"></Grid>
              <TextField
                id="location"
                label="Location"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                sx={{ display: "none" }}
                error={justVerify && location === ""}
                helperText={
                  justVerify &&
                  (location === "" ? "Please select your location" : "")
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  borderRadius: "12px",
                  backgroundColor: "#134611",
                  color: "white",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "#155d27",
                  },
                }}
              >
                {!loading ? "Sign Up" : "Signing Up"}
                {loading && <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                {loading && (
                  <CircularProgress
                    size={20}
                    sx={{
                      color: "white",
                      right: 0,
                    }}
                  />
                )}
              </Button>
            </Grid>
            <Grid item container justifyContent="space-between" xs={12}>
              <Button
                color="secondary"
                variant="text"
                onClick={() => {
                  navigate("/login");
                }}
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  textDecoration: "underline",
                }}
              >
                Already have an account? Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
