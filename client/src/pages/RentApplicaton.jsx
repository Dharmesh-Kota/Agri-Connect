import React, { useState , useEffect } from "react";



import { Box, MenuItem, FormControl, Select, Chip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {Grid,Container,Button,Dialog,DialogActions,DialogContent,DialogTitle,Typography,} from "@mui/material";
import ApplicationCard from "../components/RentApplicationCard";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles


const dropdownStyle = {
    margin: "auto",
    width: "80%",
};

const RentApplication = () => {
    const [selectedOption, setSelectedOption] = useState([]);
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




  const handleChange = (event) => {
    const { value } = event.target;
    // Ensure only unique values are added
    setSelectedOption((prev) => {
      const newValues = typeof value === 'string'? value.split(',') : value;
      return [...new Set([...prev, ...newValues])];
    });
  };

  const handleRemove = (deleteOption) => {
    setSelectedOption(selectedOption.filter(option => option !== deleteOption));
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


      <Box style={dropdownStyle}>
        <FormControl fullWidth>
          <Select
            multiple value={selectedOption}
            onChange={handleChange}
            displayEmpty
            renderValue={(selected) => selected.length ?  selected.join(" "): <em>Select Option</em>}
          >
            {/* <MenuItem value="">
              <em>Select Option</em>
            </MenuItem> */}
            <MenuItem value="Compact_Tractors">Compact Tractors</MenuItem>
            <MenuItem value="Plows">Plows</MenuItem>
            <MenuItem value="Seeders">Seeders</MenuItem>
            <MenuItem value="Sprinkler_Systems">Sprinkler Systems</MenuItem>
            <MenuItem value="Combine_Harvester">Combine Harvester</MenuItem>
            <MenuItem value="Sprayers">Sprayers</MenuItem>
            <MenuItem value="Balers">Balers</MenuItem>
          </Select>
        </FormControl>

        {selectedOption.length > 0 && (
          <div>
              <Box display="flex" alignItems="center" mt={2} >
                {selectedOption.map((option) => (
                <Chip
                  label={`Option ${option}`}
                  style= {{margin:"5px"}}
                  onDelete={() => handleRemove(option)}
                  deleteIcon={
                    <IconButton size="small">
                      <CloseIcon />
                    </IconButton>
                  }
                  color="primary"
                />
                ))}
              </Box>
          </div>
        )}
      </Box>
      <Container>
        <Grid container spacing={4}>
          {applications.map((app) => (
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
    </>
  );
};

export default RentApplication;
