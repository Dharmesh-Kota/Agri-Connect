import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import ApplicationCard from "../components/ApplicationCard";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const WorkApplications = () => {
  const [openDialog, setOpenDialog] = useState(true);
  const [useCurrentLocation, setUseCurrentLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [applications, setApplications] = useState([]);

  const fetchApplications = async (location) => {
    if (location) {
      // fetch with current location
    } else {
      // fetch with profile location
    }
    // Replace this URL with your backend API endpoint
    // const response = await fetch("/api/applications", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ location }),
    // });
    // const data = await response.json();
    // setApplications(data);
    // // Close the dialog after fetching applications
    // setOpenDialog(false);
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
            // console.error(error);
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

  return (
    <>
      <Dialog
        open={openDialog}
        // onClose={handleCloseDialog} // Disabling closing via backdrop click or escape key
        // disableBackdropClick
        // disableEscapeKeyDown
      >
        <DialogTitle>Location Preference</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Would you like to use your current location or the location
            mentioned in your profile?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleLocationChoice("current");
            }}
            color="primary"
          >
            Use Current Location
          </Button>
          <Button
            onClick={() => {
              handleLocationChoice("profile");
            }}
            color="secondary"
          >
            Use Profile Location
          </Button>
        </DialogActions>
      </Dialog>

      <Container>
        <Grid container spacing={4}>
          {applications.map((app) => (
            <Grid item xs={12} key={app.id} data-aos="fade-up">
              <ApplicationCard
                title={app.title}
                company={app.company}
                personName={app.personName}
                applicationId={app.applicationId}
                workersRequired={app.workersRequired}
                closingDate={app.closingDate}
                description={app.description}
                amountPerDay={app.amountPerDay}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default WorkApplications;
