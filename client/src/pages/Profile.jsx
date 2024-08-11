import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/auth";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import config from "../config.js";

const Profile = () => {
  const navigate = useNavigate();
  const { validateUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState(""); // Latitude and Longitude
  const [birthdate, setBirthdate] = useState(null);
  const [experience, setExperience] = useState("");
  const [isWorking, setIsWorking] = useState(true);
  const [justVerify, setJustVerify] = useState(false);
  const [showEditFields, setShowEditFields] = useState(true);
  const [apiKey, setApiKey] = useState("");

  const [birthDatePicker, setBirthDatePicker] = useState(null);

  const theme = createTheme({
    typography: {
      fontFamily: "Quicksand",
      body1: { fontWeight: "600" },
    },
    palette: {
      primary: { main: "#4caf50" },
      secondary: { main: "#81c784" },
    },
  });

  const handlePhoneNumber = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      if (input.length <= 10) {
        setPhoneNumber(input);
      }
    }
  };

  const updateProfile = async () => {
    setJustVerify(true);

    if (
      name === "" ||
      address === "" ||
      location === "" ||
      phoneNumber.length !== 10 ||
      birthdate === "" ||
      address === ""
    ) {
      return;
    }

    setLoading(true);

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };

      const results = await axios.post(
        (config.BACKEND_API || "http://localhost:8000") +
          `/update-profile/${window.localStorage.getItem("username")}`,
        {
          name,
          username: userName,
          email,
          contact: phoneNumber,
          address,
          location,
          birthdate,
          experience,
        },
        { headers }
      );

      if (results?.status === 200) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (err) {
      console.log("Error ->", err);
      toast.error("Server Problem, Failed to Update user data.");
    }

    setLoading(false);
  };

  const getUser = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };

      const results = await axios.get(
        (config.BACKEND_API || "http://localhost:8000") +
          `/profile/${window.localStorage.getItem("username")}`,
        { headers }
      );

      // console.log(results.data);

      if (results?.status === 200) {
        const { user } = results?.data;
        setValid(user?.valid === undefined ? "" : user.valid);
        setName(user?.name === undefined ? "" : user.name);
        setUserName(user?.username === undefined ? "" : user.username);
        setEmail(user?.email === undefined ? "" : user.email);
        setPhoneNumber(user?.contact === undefined ? "" : user.contact);
        setAddress(user?.address === undefined ? "" : user.address);
        setLocation(user?.location === undefined ? "" : user.location);
        setIsWorking(user?.working === undefined ? "" : user.working);
        setExperience(user?.experience === undefined ? "" : user.experience);
        setBirthdate(user?.birthdate === undefined ? "" : user.birthdate);
        setBirthDatePicker(
          dayjs(user?.birthdate === undefined ? "" : user.birthdate)
        );
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      console.log("Error ->", err);
      toast.error("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    validateUser();
    getUser();
  }, [validateUser]);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        };

        const response = await fetch(
          (config.BACKEND_API || "http://localhost:8000") + "/getTomTomApiKey",
          {
            headers,
          }
        );
        const data = await response?.json();
        setApiKey(data?.apiKey?.trim());
      } catch (error) {
        console.error("Error fetching API key:", error);
      }
    };
    fetchApiKey();
  }, []);

  const initializeTomTomSearchBox = (apiKey) => {
    const options = {
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
      container: "#searchBoxContainer",
    };

    const ttSearchBox = new window.tt.plugins.SearchBox(
      window.tt.services,
      options
    );

    ttSearchBox.on("tomtom.searchbox.resultselected", (data) => {
      const newLocation = `${data.data.result.position.lat},${data.data.result.position.lng}`;
      document.getElementById("location").value = newLocation;
      setLocation(newLocation);
    });

    const searchBoxHTML = ttSearchBox.getSearchBoxHTML();
    document.getElementById("searchBoxContainer")?.appendChild(searchBoxHTML);
  };

  useEffect(() => {
    if (apiKey) {
      initializeTomTomSearchBox(apiKey);
    }
  }, [apiKey]);

  function formatToISOWithLocalTime(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  return (
    <ThemeProvider theme={theme}>
      <div
        data-aos="fade-up"
        style={{
          margin: "2em",
          fontFamily: "Quicksand",
          fontWeight: "600",
          marginTop: "5em",
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Card
              sx={{ maxWidth: "100%", padding: "1em", textAlign: "center" }}
            >
              <CardMedia
                component="img"
                alt="profile"
                height="100"
                image="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                sx={{
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
                  Username{userName !== "" ? ":" : ""} {userName}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontWeight: "bold" }}
                >
                  Email{email !== "" ? ":" : ""} {email}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontWeight: "bold" }}
                >
                  Phone{phoneNumber !== "" ? ": +91" : ""} {phoneNumber}
                </Typography>
                {address && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    Address{address !== "" ? ":" : ""} {address}
                  </Typography>
                )}
              </CardContent>
            </Card>
            {valid && (
              <Card
                sx={{
                  my: 4,
                  backgroundColor:
                    isWorking === "false" ? "#f08080" : "#e8f5e9",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    fontSize="large"
                    fontWeight="bold"
                    sx={{
                      color: isWorking === "false" ? "#c1121f" : "#388e3c",
                    }}
                  >
                    {typeof isWorking === "string"
                      ? isWorking === "false"
                        ? "Not Working"
                        : isWorking
                      : ""}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
          {showEditFields && (
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Card>
                <CardContent>
                  <Grid item>
                    <Typography
                      fontSize="xx-large"
                      sx={{
                        fontWeight: "bold",
                        color: "#134611",
                        textAlign: "center",
                      }}
                    >
                      Profile
                    </Typography>
                  </Grid>
                  <Grid item margin={0} padding={4}>
                    <Grid item xs={12} padding={1}>
                      <TextField
                        color="success"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        label="Name"
                        placeholder="Name"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        autoComplete="off"
                        error={justVerify && !name}
                        helperText={
                          justVerify && !name
                            ? "Please enter a valid name."
                            : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} padding={1}>
                      <TextField
                        color="success"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        id="username"
                        label="Username"
                        placeholder="Username"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        autoComplete="off"
                        error={justVerify && !userName}
                        InputProps={{
                          readOnly: true,
                        }}
                        helperText={
                          justVerify && !userName
                            ? "Please enter a valid username."
                            : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} padding={1}>
                      <TextField
                        color="success"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        label="Email"
                        placeholder="Email"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        autoComplete="off"
                        InputProps={{
                          readOnly: true,
                        }}
                        error={justVerify && email === ""}
                        helperText={
                          justVerify && email === ""
                            ? "Please enter a valid email."
                            : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} padding={1}>
                      <TextField
                        color="success"
                        value={phoneNumber}
                        onChange={handlePhoneNumber}
                        id="phone-number"
                        label="Phone Number"
                        placeholder="Phone Number"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        autoComplete="off"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} padding={1}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="Birth Date"
                            maxDate={dayjs()}
                            value={birthDatePicker}
                            onChange={(d) => {
                              setBirthdate((prev) =>
                                formatToISOWithLocalTime(d.$d)
                              );
                              setBirthDatePicker(d);
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                              },
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} padding={1} paddingY={2}>
                      <Typography fontWeight="bold">
                        <LocationOnRoundedIcon sx={{ color: "#134611" }} />
                        Location*
                      </Typography>
                      <Grid
                        item
                        margin={0}
                        padding={0}
                        id="searchBoxContainer"
                      ></Grid>
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
                    <Grid item xs={12} padding={1}>
                      <TextField
                        color="success"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        id="address"
                        label="Exact Address"
                        placeholder="Address"
                        variant="outlined"
                        fullWidth
                        required
                        size="small"
                        autoComplete="off"
                        error={justVerify && !address}
                        helperText={
                          justVerify && !address
                            ? "Please enter a valid address."
                            : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} padding={1}>
                      <TextField
                        color="success"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        id="experience"
                        label="Experiences"
                        placeholder="Experiences"
                        variant="outlined"
                        fullWidth
                        size="small"
                        autoComplete="off"
                        error={justVerify && !experience}
                        helperText={
                          justVerify && !experience
                            ? "Please enter a valid experience."
                            : ""
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} padding={1}>
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
                    <Grid item xs={12} container justifyContent="center">
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={updateProfile}
                        sx={{
                          width: "fit-content",
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
                        {!loading ? "Update" : "Updating..."}
                        {loading && (
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        )}
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
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Profile;
