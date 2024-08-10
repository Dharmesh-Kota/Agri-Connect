import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import PlaceIcon from "@mui/icons-material/Place";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const Profile = () => {
  const imageURL =
    "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=";

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("John Doe");
  const [userName, setUserName] = useState("john_doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [type, setType] = useState("User");
  const [address, setAddress] = useState("123 Main St, Anytown, USA");
  const [phoneNumber, setPhoneNumber] = useState("1234567890");
  const [location, setLocation] = useState("37.7749,-122.4194"); // Latitude and Longitude of San Francisco
  const [birthdate, setBirthdate] = useState("1990-01-01");
  const [isWorking, setIsWorking] = useState(true); // New state for work status

  const [isValidPhone, setIsValidPhone] = useState(true);
  const navigate = useNavigate();

  const [justVerify, setJustVerify] = useState(false);
  const [showEditFields, setShowEditFields] = useState(true); // Boolean to show/hide right component

  const validatePhoneNumber = (input) => {
    if (input) {
      const value = input.replace(/\D/g, "");
      const isValid = /^\d{10}$/.test(value);
      setIsValidPhone(isValid);
    } else {
      setIsValidPhone(false);
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Quicksand",
      body1: {
        fontWeight: "600",
      },
    },
    palette: {
      primary: {
        main: "#4caf50", // Green color
      },
      secondary: {
        main: "#81c784", // Light green color
      },
    },
  });

  const UpdateProfile = async () => {
    setJustVerify(true);
    if (name === "" || address === "" || !isValidPhone || location === "") {
      return;
    }
    setLoading(true);

    // Mock update process
    setTimeout(() => {
      console.log("Profile updated with: ", {
        name,
        userName,
        email,
        phoneNumber,
        address,
        location,
        birthdate,
      });
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Using dummy data instead of fetching from backend
    setName("John Doe");
    setUserName("john_doe");
    setEmail("john.doe@example.com");
    setPhoneNumber("1234567890");
    setAddress("123 Main St, Anytown, USA");
    setLocation("37.7749,-122.4194"); // Latitude and Longitude of San Francisco
    setBirthdate("1990-01-01");
    validatePhoneNumber("1234567890");

    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <>
      <div
        data-aos="fade-up"
        style={{
          margin: "2em",
          fontFamily: "Quicksand",
          fontWeight: "600",
          marginTop: "5em",
        }}
      >
        <ThemeProvider theme={theme}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
              <Card
                sx={{
                  maxWidth: "100%",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "1em",
                }}
              >
                <CardMedia
                  component="img"
                  alt="profile"
                  height="100"
                  image={imageURL}
                  style={{
                    maxWidth: "80%",
                    height: "auto",
                    borderRadius: "50%",
                    margin: "auto",
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {name || "No Name"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Username: {userName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Email: {email}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Phone: +91 {phoneNumber}
                  </Typography>
                  {address && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontWeight: "bold" }}
                    >
                      Address: {address}
                    </Typography>
                  )}
                </CardContent>
              </Card>

              <Card
                sx={{
                  maxWidth: "100%",
                  marginBottom: "1em",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "1em",
                  marginTop: "1em",
                  backgroundColor: "#e8f5e9", // Light green background
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", color: "#388e3c" }} // Darker green color
                  >
                    {isWorking ? "Currently Working" : "Not Working"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {showEditFields && (
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    color: "#388e3c",
                    marginTop: "1em",
                    marginBottom: "1em",
                    textAlign: "center",
                  }} // Darker green color
                >
                  Profile
                </Typography>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          fullWidth
                          autoComplete="off"
                          error={justVerify && name === ""}
                          helperText={
                            justVerify && name === ""
                              ? "Please enter a valid name."
                              : ""
                          }
                          color="success"
                          size="small"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 25,
                              fontWeight: "bold",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Username"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          fullWidth
                          autoComplete="off"
                          error={justVerify && userName === ""}
                          helperText={
                            justVerify && userName === ""
                              ? "Please enter a valid username."
                              : ""
                          }
                          color="success"
                          size="small"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 25,
                              fontWeight: "bold",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          fullWidth
                          autoComplete="off"
                          error={justVerify && email === ""}
                          helperText={
                            justVerify && email === ""
                              ? "Please enter a valid email."
                              : ""
                          }
                          color="success"
                          size="small"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 25,
                              fontWeight: "bold",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Phone Number"
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            validatePhoneNumber(e.target.value);
                          }}
                          fullWidth
                          autoComplete="off"
                          error={justVerify && !isValidPhone}
                          helperText={
                            justVerify && !isValidPhone
                              ? "Please enter a valid phone number."
                              : ""
                          }
                          color="success"
                          size="small"
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
                          label="Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          fullWidth
                          autoComplete="off"
                          error={justVerify && address === ""}
                          helperText={
                            justVerify && address === ""
                              ? "Please enter a valid address."
                              : ""
                          }
                          color="success"
                          size="small"
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
                          label="Birthdate"
                          value={birthdate}
                          onChange={(e) => setBirthdate(e.target.value)}
                          fullWidth
                          autoComplete="off"
                          color="success"
                          size="small"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 25,
                              fontWeight: "bold",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={showEditFields}
                              onChange={(e) =>
                                setShowEditFields(e.target.checked)
                              }
                            />
                          }
                          label="Edit Profile"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={UpdateProfile}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Update"
                      )}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )}
          </Grid>
        </ThemeProvider>
      </div>
    </>
  );
};

export default Profile;
