import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { light } from "@mui/material/styles/createPalette";

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
  discription,
  category,
  rent,
  quantity_available
}) => {
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
            <strong>Owner Name : </strong>{owner}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            fontFamily="'Quicksand', sans-serif"
            fontWeight={600} // Medium font weight
            fontSize="1.2rem" // Slightly larger font size
          >
            <strong>Descrition : </strong>{discription}
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
        
        <StyledButton variant="contained" size="small">
          Rent
        </StyledButton>
      </CardContent>
    </StyledCard>
  );
};

export default RentApplicationCard;
