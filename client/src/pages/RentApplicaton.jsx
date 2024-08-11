import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  Chip,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  Grid,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import ApplicationCard from "../components/RentApplicationCard";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import DropdownWithSelectedOptions from "../components/DropdownWithSelectedOptions";
import config from "../config";
import { ArrowBack } from "@mui/icons-material";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";

const chipsContainerStyle = {
  display: "flex",
  flexWrap: "wrap", // Allows wrapping if there's not enough space
  gap: "8px", // Spacing between chips
};

// const dummy_data = [
//     {
//         owner: "John Doe Farms",
//         description: "Heavy-duty tractor suitable for plowing and tilling large fields.",
//         category: ["Tractors", "Irrigation Systems"],
//         rent: 150, // in dollars per day
//         quantity_available: 2
//     },
//     {
//         owner: "Green Harvest Co.",
//         description: "Advanced combine harvester equipped with GPS and auto-steering for precision harvesting.",
//         category: ["Harvesters"],
//         rent: 500, // in dollars per day
//         quantity_available: 1
//     },
//     {
//         owner: "Sunny Acres Agri",
//         description: "Efficient sprinkler system ideal for irrigating medium-sized farms.",
//         category: ["Irrigation Systems"],
//         rent: 80, // in dollars per day
//         quantity_available: 5
//     }
// ];

const RentApplication = () => {
  const [openDialog, setOpenDialog] = useState(true);
  const [useCurrentLocation, setUseCurrentLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [applications, setApplications] = useState([]);
  const [maxValue, setMaxValue] = useState();

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectCategoryOptions, setSelectCategoryOptions] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    category: [],
    description: "",
    rent: 0,
    quantity_available: 0,
  });
  const [formErrors, setFormErrors] = useState({
    category: false,
    description: false,
    rent: false,
    quantity_available: false,
  });

  useEffect(() => {
    try {
      let dummy_data = [];
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };
      const fetchfunction = async () => {
        try {
          const response = await axios.get(
            `${config.BACKEND_API || "http://localhost:8000"}/rent-application`,
            { headers }
          );
          let dummy_data = response.data.applications;
          // console.log(dummy_data);
          // Filter the dummy_data

          const filteredApplications = dummy_data.filter((application) => {
            // Check if any of the application's categories are in the selectedOptions
            const categoryMatch = application.category.some((cat) =>
              selectedOptions.includes(cat)
            );

            // Check if the rent is below the threshold
            const priceMatch =
              application.rent <= maxValue || maxValue === undefined;

            // Return true if both conditions are met
            return categoryMatch && priceMatch;
          });

          // Update the applications state with the filtered data
          setApplications(filteredApplications);
          // console.log(filteredApplications);
          // console.log(selectedOptions);
          return response.data; // Return the fetched data
        } catch (error) {
          console.error("Error fetching data:", error);
          return []; // Return an empty array on error
        }
      };

      fetchfunction();
    } catch (error) {
      toast.error("Failed to fetch applications.");
    }
  }, [selectedOptions, maxValue]);
  useEffect(() => {
    try {
      let dummy_data = [];
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };
      const fetchfunction = async () => {
        try {
          const response = await axios.get(
            `${config.BACKEND_API || "http://localhost:8000"}/rent-application`,
            { headers }
          );
          let dummy_data = response.data.applications;
          // console.log(dummy_data);
          // Filter the dummy_data

          const filteredApplications = dummy_data.filter((application) => {
            // Check if any of the application's categories are in the selectedOptions
            const categoryMatch = application.category.some((cat) =>
              selectedOptions.includes(cat)
            );

            // Check if the rent is below the threshold
            const priceMatch =
              application.rent <= maxValue || maxValue === undefined;

            // Return true if both conditions are met
            return categoryMatch && priceMatch;
          });

          // Update the applications state with the filtered data
          // console.log(filteredApplications);
          // console.log(response.data);
          setApplications(filteredApplications);
          return response.data; // Return the fetched data
        } catch (error) {
          // console.error('Error fetching data:', error);
          return []; // Return an empty array on error
        }
      };

      fetchfunction();
    } catch (error) {
      toast.error("Failed to fetch applications.");
    }
  }, [selectedOptions, maxValue]);

  const fetchApplications = async (location) => {
    //   try {
    //     // Your fetch logic here
    //     setApplications(dummy_data);
    //   } catch (error) {
    //     toast.error("Failed to fetch applications.");
    //   }
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    if (useCurrentLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ latitude, longitude });
            // Pass the current location to the backend to fetch data
            handleCloseDialog();
            fetchApplications({ latitude, longitude });
          },
          (error) => {
            // Handle location error
            setOpenDialog(false);
            // Fetch applications with fallback location
            fetchApplications();
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
        setOpenDialog(false);
        fetchApplications();
      }
    } else if (useCurrentLocation === false) {
      // Fetch applications with profile location
      fetchApplications();
      handleCloseDialog();
    }
  }, [useCurrentLocation]);

  const handleLocationChoice = (choice) => {
    setUseCurrentLocation(choice === "current");
    // You can also handle the scenario where you need to handle a profile location fetch here
    // If you want to trigger fetching immediately after choice
    // fetchApplications();
  };

  const handleCloseDialog = () => {
    if (useCurrentLocation === null) {
      // Prevent closing if no choice has been made
      return;
    }
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    // Ensure the input value is numeric and within the acceptable range
    if (!isNaN(value) && value >= 0 && value <= 100000) {
      setMaxValue(value);
    }
  };

  const handleIconClick = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleFormChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      category: formValues.category.length <= 0,
      description: !formValues.description,
      rent: formValues.rent <= 0,
      quantity_available: formValues.quantity_available <= 0,
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };
    formValues.category = selectCategoryOptions;
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${
            config.BACKEND_API || "http://localhost:8000"
          }/create-rent-application`,
          { formValues },
          { headers }
        );
        console.log("Form submitted:", response.data);
        toast.success("Application submitted successfully!");
        handleFormClose();
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting application. Please try again.");
        handleFormClose();
      }
    }
  };
  const handleChipDelete = (chipToDelete) => {
    formValues.category((prevValues) => ({
      ...prevValues,
      category: prevValues.category.filter((item) => item !== chipToDelete),
    }));
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog} // Allow closing via backdrop click or escape key
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#134611" }}>
          Location Preference
        </DialogTitle>{" "}
        <DialogContent>
          <Typography variant="body1">
            Would you like to use your current location or the location
            mentioned in your profile?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleLocationChoice("current")}
            color="success"
            sx={{ fontWeight: "bold" }}
            variant="contained"
          >
            Use Current Location
          </Button>
          <Button
            onClick={() => handleLocationChoice("profile")}
            color="secondary"
            sx={{ fontWeight: "bold" }}
            variant="outlined"
          >
            Use Profile Location
          </Button>
        </DialogActions>
      </Dialog>

      <div
        style={{
          margin: "50px",
          marginTop: "100px",
          width: "80%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <DropdownWithSelectedOptions
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        <TextField
          color="success"
          type="number"
          placeholder="Max Price"
          onChange={handleInputChange}
          value={maxValue}
          inputProps={{ min: 0, max: 100000, step: 5000 }}
          fullWidth
          margin="normal"
          style={{ width: "200px", height: "50px", margin: "50px" }}
        />
        {/* <Button onClick={handleChoiceChange}>Search</Button> */}
      </div>

      {selectedOptions.length==0 && <>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          padding={10}
          margin={0}
          xs={12}
          sm={12}
          md={12}
          xl={12}
          lg={12}
          style={{
            // backgroundColor: "ghostwhite",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <Grid
            item
            margin={0}
            padding={0}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: "#f0fff1",
              borderRadius: "16px",
              padding: 4,
            }}
          >
            <Typography variant="h4" sx={{ color: "#134611" }}>
              <HourglassEmptyRoundedIcon fontSize="large" color="success" />
              NO RENT APPLICATIONS FOUND
            </Typography>
          </Grid>
        </Grid>
      </>
    }
      {applications.length > 0 && (
        <Container>
          <Grid container spacing={4}>
            {applications.map((app, index) => (
              <Grid item xs={12} key={app.id} data-aos="fade-up">
                <ApplicationCard
                  owner={app.owner}
                  description={app.description}
                  category={app.category}
                  rent={app.rent}
                  quantity_available={app.quantity_available}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* Floating Icon */}
      <IconButton
        aria-label="Add"
        sx={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          backgroundColor: "#d8f3dc",
        }}
      >
        <AddRoundedIcon
          onClick={handleIconClick}
          style={{
            fontSize: "2em",
            color: "#134611",
            zIndex: 1000,
          }}
        />
      </IconButton>

      {/* Form Modal */}
      <Dialog open={formOpen} onClose={handleFormClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: "#134611", fontWeight: "bold" }}>
          Submit Application
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 3,
            }}
          >
            <DropdownWithSelectedOptions
              selectedOptions={selectCategoryOptions}
              setSelectedOptions={setSelectCategoryOptions}
            />
            <TextField
              color="success"
              label="Description"
              name="description"
              type="text"
              value={formValues.description}
              onChange={handleFormChange}
              fullWidth
              error={formErrors.description}
              helperText={formErrors.description && "This field is required"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontWeight: "bold",
                },
              }}
            />
            <TextField
              color="success"
              label="quantity_available"
              name="quantity_available"
              multiple
              type="number"
              value={formValues.quantity_available}
              onChange={handleFormChange}
              fullWidth
              error={formErrors.quantity_available}
              helperText={
                formErrors.quantity_available &&
                "This field is required and must be greater than 0"
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontWeight: "bold",
                },
              }}
            />
            <TextField
              color="success"
              label="rent (in Rupee)"
              name="rent"
              type="number"
              value={formValues.rent}
              onChange={handleFormChange}
              fullWidth
              error={formErrors.rent}
              helperText={
                formErrors.rent &&
                "This field is required and must be greater than 0"
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  fontWeight: "bold",
                },
              }}
            />
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ fontWeight: "bold" }}
              >
                Submit
              </Button>
              <Button
                onClick={handleFormClose}
                sx={{ fontWeight: "bold" }}
                color="error"
              >
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RentApplication;
