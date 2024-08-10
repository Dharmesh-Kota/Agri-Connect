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
import axios from "axios";
import image1 from "../images/login_img.jpg";
import img1 from "../images/img1.png";

export default function Login() {
  axios.defaults.withCredentials = true;

  const [loading, setLoading] = useState(false);
  const [justVerify, setJustVerify] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const { setIsLoggedIn, validateUser, isLoggedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [emailUsername, setEmailUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
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
      emailUsername === "" ||
      password === "" ||
      !validPassword ||
      emailUsername.length >= 255 ||
      password.length > 255
    ) {
      return;
    }
    setLoading(true);

    try {
      const results = await axios.post(
        (process.env.BACKEND_API || "http://localhost:8000") +
          "/create-session",
        {
          emailUsername,
          password,
        }
      );
      if (results.status === 200) {
        window.localStorage.setItem("token", results.data.token);
        window.localStorage.setItem("username", results.data.username);
        setIsLoggedIn(true);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid Credentials");
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
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                color="success"
                value={emailUsername}
                onChange={(e) => {
                  setEmailUsername(e.target.value);
                }}
                id="username"
                label="Username"
                placeholder="username"
                variant="outlined"
                fullWidth
                required
                size="small"
                autoComplete="on"
                error={
                  justVerify &&
                  (emailUsername === "" || emailUsername.length >= 255)
                }
                helperText={
                  justVerify &&
                  (emailUsername === "" ? "This field cannot be empty." : "")
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
                autoComplete="on"
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
                {!loading ? "Sign In" : "Signing In"}
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
                  navigate("/register");
                }}
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  textDecoration: "underline",
                }}
              >
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
