import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
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
  Box,
} from "@mui/material";
import ApplicationCard from "../components/ApplicationCard";
import AOS from "aos";
import "aos/dist/aos.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useAuth } from "../context/auth";
import config from "../config.js";

const WorkApplications = () => {
  const [openDialog, setOpenDialog] = useState(true);
  const [useCurrentLocation, setUseCurrentLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [applications, setApplications] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    workers_required: "",
    description: "",
    closing_date: "",
    labour: "",
  });
  const [formErrors, setFormErrors] = useState({
    workers_required: false,
    description: false,
    closing_date: false,
    labour: false,
  });

  // const dummy_data = [
  //   {
  //     id: 1,
  //     title: "Software Engineer",
  //     company: "Tech Corp",
  //     personName: "John Doe",
  //     applicationId: "APP1234",
  //     workers_required: 5,
  //     closing_date: "2024-08-31",
  //     description:
  //       "A software engineer position at Tech Corp, focusing on building scalable applications.",
  //     amountPerDay: "200",
  //   },
  //   {
  //     id: 2,
  //     title: "Data Scientist",
  //     company: "Data Inc",
  //     personName: "Jane Smith",
  //     applicationId: "APP5678",
  //     workers_required: 3,
  //     closing_date: "2024-09-15",
  //     description:
  //       "A data scientist role at Data Inc, involving data analysis and machine learning.",
  //     amountPerDay: "250",
  //   },
  // ];

  const fetchApplications = async (location) => {
    try {
      // fetch applications
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };

      const results = await axios.get(
        (config.BACKEND_API || "http://localhost:8000") +
          (location
            ? `/work-application?lat=${location.latitude}&lng=${location.longitude}`
            : `/work-application`),
        { headers }
      );

      // console.log(results.data.hirers);

      setApplications(results.data.hirers);
    } catch (error) {
      toast.error("Failed to fetch applications.");
    }
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
            handleCloseDialog();
            fetchApplications({ latitude, longitude });
          },
          (error) => {
            setOpenDialog(false);
            toast.error("Failed to get current location.");
            fetchApplications();
          }
        );
      } else {
        setOpenDialog(false);
        toast.error("Geolocation is not supported by this browser.");
        fetchApplications();
      }
    } else if (useCurrentLocation === false) {
      fetchApplications();
      handleCloseDialog();
    }
  }, [useCurrentLocation]);

  const handleLocationChoice = (choice) => {
    if (choice === "profile") {
      // Check if user is logged in
      const isLoggedIn = true; // Replace with actual login check
      if (!isLoggedIn) {
        toast.error("Please log in to use your profile location.");
        window.location.href = "/login"; // Redirect to login page
        return;
      }
    }
    setUseCurrentLocation(choice === "current");
  };

  const handleCloseDialog = () => {
    if (useCurrentLocation === null) {
      return;
    }
    setOpenDialog(false);
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
    const today = new Date().toISOString().split("T")[0];
    const errors = {
      workers_required: formValues.workers_required <= 0,
      description: !formValues.description,
      closing_date: formValues.closing_date <= today,
      labour: formValues.labour <= 0,
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        };

        // console.log(formValues);

        const results = await axios.post(
          (config.BACKEND_API || "http://localhost:8000") +
            `/create-work-application`,
          formValues,
          { headers }
        );

        // console.log(results);
        setFormValues({
          workers_required: "",
          description: "",
          closing_date: "",
          labour: "",
        });
        // console.log("Form submitted:", response.data);
        toast.success("Application submitted successfully!");
        handleFormClose();
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting application. Please try again.");
        handleFormClose();
      }
    }
  };

  return (
    <>
      <Dialog open={openDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Location Preference</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Would you like to use your current location or the location
            mentioned in your profile?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleLocationChoice("current")}
            color="primary"
          >
            Use Current Location
          </Button>
          <Button
            onClick={() => handleLocationChoice("profile")}
            color="secondary"
          >
            Use Profile Location
          </Button>
        </DialogActions>
      </Dialog>

      <Container sx={{ pt: "5em" }}>
        <Grid container spacing={4}>
          {applications.map((app) => (
            <Grid item xs={12} key={app._id} data-aos="fade-up">
              <ApplicationCard
                personName={app.hirer}
                applicationId={app.application_id}
                workers_required={app.workers_required}
                closing_date={app.closing_date}
                description={app.description}
                amountPerDay={app.labour}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Floating Icon */}
      <AddCircleIcon
        onClick={handleIconClick}
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          fontSize: "4em",
          color: "#4caf50",
          cursor: "pointer",
          zIndex: 1000,
        }}
      />

      {/* Form Modal */}
      <Dialog open={formOpen} onClose={handleFormClose} maxWidth="sm" fullWidth>
        <DialogTitle>Submit Application</DialogTitle>
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
            <TextField
              label="Workers Required"
              name="workers_required"
              type="number"
              value={formValues.workers_required}
              onChange={handleFormChange}
              fullWidth
              error={formErrors.workers_required}
              helperText={
                formErrors.workers_required &&
                "This field is required and must be greater than 0"
              }
            />
            <TextField
              label="Description"
              name="description"
              type="text"
              value={formValues.description}
              onChange={handleFormChange}
              fullWidth
              error={formErrors.description}
              helperText={formErrors.description && "This field is required"}
            />
            <TextField
              label="Closing Date"
              name="closing_date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formValues.closing_date}
              onChange={handleFormChange}
              fullWidth
              error={formErrors.closing_date}
              helperText={
                formErrors.closing_date &&
                "This field is required and must be a future date"
              }
            />
            <TextField
              label="Labour (in Rupee)"
              name="labour"
              type="number"
              value={formValues.labour}
              onChange={handleFormChange}
              fullWidth
              error={formErrors.labour}
              helperText={
                formErrors.labour &&
                "This field is required and must be greater than 0"
              }
            />
            <DialogActions>
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button onClick={handleFormClose} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkApplications;
