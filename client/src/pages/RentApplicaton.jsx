import React, { useState, useEffect } from "react";
import { Box, MenuItem, FormControl, Select, Chip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Grid, Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography , TextField} from "@mui/material";
import toast from "react-hot-toast";
import ApplicationCard from "../components/RentApplicationCard";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import DropdownWithSelectedOptions from "../components/DropdownWithSelectedOptions";


const chipsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap', // Allows wrapping if there's not enough space
    gap: '8px', // Spacing between chips
}


const dummy_data = [
    {
        owner: "John Doe Farms",
        description: "Heavy-duty tractor suitable for plowing and tilling large fields.",
        category: ["Tractors", "Irrigation Systems"],
        rent: 150, // in dollars per day
        quantity_available: 2
    },
    {
        owner: "Green Harvest Co.",
        description: "Advanced combine harvester equipped with GPS and auto-steering for precision harvesting.",
        category: ["Harvesters"],
        rent: 500, // in dollars per day
        quantity_available: 1
    },
    {
        owner: "Sunny Acres Agri",
        description: "Efficient sprinkler system ideal for irrigating medium-sized farms.",
        category: ["Irrigation Systems"],
        rent: 80, // in dollars per day
        quantity_available: 5
    }
];


//this is dropdown menu as component.



// const DropdownWithSelectedOptions = () => {

// // Handle the selection of a new option
// const [selectedOptions, setSelectedOptions] = useState([]);
// const handleChange = (event) => {
//     const { value } = event.target;
//     setSelectedOptions((prevSelected) => {
//         // Ensure only unique values are added
//         if (!prevSelected.includes(value)) {
//             return [...prevSelected, value];
//         }
//         return prevSelected;
//     });
// };

// // Handle the removal of a selected option
// const handleRemove = (optionToRemove) => {
//     setSelectedOptions((prevSelected) => prevSelected.filter(option => option !== optionToRemove));
// };

// return (
//     <Box style={dropdownStyle}>
//         <FormControl fullWidth>
//             <Select
//                 value=""
//                 onChange={handleChange}
//                 displayEmpty
//                 >
//                 <MenuItem value="" disabled>
//                     <em>Select Option</em>
//                 </MenuItem>
//                 <MenuItem value="Option 1">Option 1</MenuItem>
//                 <MenuItem value="Option 2">Option 2</MenuItem>
//                 <MenuItem value="Option 3">Option 3</MenuItem>
//                 <MenuItem value="Option 4">Option 4</MenuItem>
//                 <MenuItem value="Option 5">Option 5</MenuItem>
//             </Select>
//         </FormControl>

//         {/* Display the selected options as chips with a delete button */}
//         <Box mt={2} display="flex" flexWrap="wrap">
//             {selectedOptions.map((option) => (
//                 <Chip
//                 key={option}
//                     label={option}
//                     onDelete={() => handleRemove(option)}
//                     deleteIcon={
//                         <IconButton size="small">
//                             <CloseIcon />
//                         </IconButton>
//                     }
//                     style={{ margin: "5px" }}
//                     />
//                 ))}
//         </Box>
//     </Box>
// );
// };


const RentApplication = () => {

    const [openDialog, setOpenDialog] = useState(true);
    const [useCurrentLocation, setUseCurrentLocation] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [applications, setApplications] = useState([]);
    const [maxValue , setMaxValue] = useState();

    const [selectedOptions, setSelectedOptions] = useState([]);
    
    // const handleChoiceChange = () => {
    //     setApplications([]);
    //     try {
    //         // Your fetch logic here
    //         // Filter the dummy_data
    //         const filteredApplications = dummy_data.filter(application => {
    //             // Check if any of the application's categories are in the selectedOptions
    //             const categoryMatch = application.category.some(cat => selectedOptions.includes(cat));

    //             // Check if the rent is below the threshold
    //             const priceMatch = application.rent <= maxValue;

    //             // Return true if both conditions are met
    //             return categoryMatch && priceMatch;
    //         });

    //         // Update the applications state with the filtered data
    //         setApplications(filteredApplications);

    //     } catch (error) {
    //         toast.error("Failed to fetch applications.");
    //     }
    // }

    useEffect(()=>{
        try {
            // Your fetch logic here
            // Filter the dummy_data
            const filteredApplications = dummy_data.filter(application => {
                // Check if any of the application's categories are in the selectedOptions
                const categoryMatch = application.category.some(cat => selectedOptions.includes(cat));

                // Check if the rent is below the threshold
                const priceMatch = application.rent <= maxValue || maxValue === undefined;

                // Return true if both conditions are met
                return categoryMatch && priceMatch;
            });

            // Update the applications state with the filtered data
            setApplications(filteredApplications);
            console.log(applications);

        } catch (error) {
            toast.error("Failed to fetch applications.");
        }


    }, [selectedOptions,maxValue]); 

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
      };
      
    }
   

    return (
        <>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog} // Allow closing via backdrop click or escape key
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

            {/* this is dropdown menu which is not working */}

            <div style={{ margin:"30px", marginTop: "100px", width: "100%" , display:"flex", flexDirection:'row'}}>
                <DropdownWithSelectedOptions 
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                />
                <TextField
                    type="number"
                    placeholder="Max Price"
                    onChange={handleInputChange}
                    value={maxValue}
                    inputProps={{ min: 0, max: 100000, step: 5000 }}
                    fullWidth
                    margin="normal"

                    style={{width:"200px" , height:"50px", margin:"auto"}}
                />
                {/* <Button onClick={handleChoiceChange}>Search</Button> */}
            </div>


            {applications.length > 0 && <Container>
                <Grid container spacing={4}>
                    {applications.map((app, index) => (
                        <Grid item xs={12} key={app.id} data-aos="fade-up">
                            <ApplicationCard
                                owner={app.owner}
                                description={app.description}
                                category={app.category}
                                rent={app.rent}
                                quantity_available={app.quantity_available}
                                rent_id={app.rent_id}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>}

        </>
    );
};

export default RentApplication;
