import React , {useState} from "react";
import axios from 'axios'; 
import { Card, CardContent, Typography, Box , Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { light } from "@mui/material/styles/createPalette";
import toast from "react-hot-toast";



// Custom styled component for a more attractive card
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: theme.shadows[5],
  overflow: "visible",
  backgroundColor: "#ffffff", // Light background color
  border: `1px solid #d0e1d4`, // Light greenish border
  transition:
    "transform 0.3s ease-in-out, background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)", // Slightly scale up for a subtle effect
    backgroundColor: "#f9fdf6", // Very light green background on hover
    boxShadow: theme.shadows[10],
  },
}));

// Custom button styling
const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));



const RentApplicationCard = ({
  owner,
  description,
  category,
  rent,
  quantity_available,
  rent_id
}) => {
  const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [inputError, setInputError] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setInputValue("");  // Reset input value
        setInputError(false); // Reset error state
    };

    const handleInputChange = (event) => {
        const value = event.target.value;

        // Validate input value
        if ( isNaN(value) || value <= 0 || value > quantity_available) {
            setInputError(true);
        } else {
            setInputError(false);
        }

        setInputValue(value);
    };
    
        const handleSubmit = () => {
          console.log(rent_id);
          console.log(quantity_available);
            if (!inputError && inputValue !== "") {
                // Process the inputValue here, like saving it or making an API call
                const headers = {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${window.localStorage.getItem("token")}`
              };
                const postfunction = async ()=>{
                  try {
                    const response = await axios.post(
                        `${
                            process.env.BACKEND_API || "http://localhost:8000"
                          }/rent-machinery`,
                        {rent_id, quantity_available}, {headers}
                    );
                    console.log("Form submitted:", response.data);
                    toast.success("Application submitted successfully!");
                   
                } catch (error) {
                    console.error("Error submitting form:", error);
                    toast.error("Error submitting application. Please try again.");
                }


                }
                toast.success("Input value is valid!");
                handleClose(); // Close the modal after submission
            postfunction(); 

            } else {
                toast.error("Please enter a valid value.");
            }
        };
    
    
    return (
    <StyledCard>
      <CardContent>
        <Box mb={2}>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            fontFamily="'Quicksand', sans-serif" // Custom font family
            fontWeight={700} // Bold font weight
            fontSize="1.5rem" // Larger font size
          >
            <strong>Owner Name : </strong>
            {owner}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            fontFamily="'Quicksand', sans-serif"
            fontWeight={600} // Medium font weight
            fontSize="1.2rem" // Slightly larger font size
          >
            <strong>Descrition : </strong>
            {description}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          paragraph
          fontFamily="'Quicksand', sans-serif"
          fontWeight={400} // Regular font weight
          fontSize="1rem" // Regular font size
        >
          <ul>
            {category.map((cat, index) => (
              <li key={index}>{cat}</li> // Ensure each item has a unique `key`
            ))}
          </ul>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontFamily="'Quicksand', sans-serif"
          fontWeight={500} // Medium font weight
          fontSize="1rem"
        >
          <strong>Rent : </strong> {rent}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontFamily="'Quicksand', sans-serif"
          fontWeight={500}
          fontSize="1rem"
        >
          <strong>Quantity Available</strong> {quantity_available}
        </Typography>

        <div >
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Rent
            </Button>

            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Enter a Value</DialogTitle>
                <DialogContent style={{width:"400px" , height:"150px" , margin:"auto"}}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Enter a number"
                        type="number"
                        fullWidth
                        value={inputValue}
                        onChange={handleInputChange}
                        error={inputError}
                        helperText={inputError ? `Please enter a value greater than 0 and less than ${quantity_available}` : ""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
      </CardContent>
    </StyledCard>
  );
};

export default RentApplicationCard;
