import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import axios from "axios";
import toast from "react-hot-toast";
import config from "../config";

// Custom styled component for a more attractive card with greenish theme
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: theme.shadows[5],
  overflow: "visible",
  backgroundColor: "#ffffff", // Light background color
  border: `1px solid #a8d5ba`, // Light greenish border
  transition:
    "transform 0.3s ease-in-out, background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)", // Slightly scale up for a subtle effect
    backgroundColor: "#eaf4e5", // Very light green background on hover
    boxShadow: theme.shadows[10],
  },
}));

// Custom button styling with greenish theme
const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#4caf50", // Green background color
  color: "#fff",
  "&:hover": {
    backgroundColor: "#388e3c", // Darker green on hover
  },
}));

// when apply button click
const onClickApplyHandle = async (applicationId) => {
  try {
    // fetch applications
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    };

    const results = await axios.get(
      (config.BACKEND_API || "http://localhost:8000") +
        `/apply-for-work/${applicationId}`,
      { headers }
    );

    // console.log(results);
    toast.success("Applied Successfully");
  } catch (error) {
    toast.error("Internal Server Error");
  }
};

const ApplicationCard = ({
  personName,
  applicationId,
  workers_required,
  closing_date,
  description,
  amountPerDay,
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
            <strong>Person Name: </strong> {personName}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            fontFamily="'Quicksand', sans-serif"
            fontWeight={600} // Medium font weight
            fontSize="1.2rem" // Slightly larger font size
          >
            {description}
          </Typography>
        </Box>
        {/* <Typography
          variant="body2"
          color="text.secondary"
          paragraph
          fontFamily="'Quicksand', sans-serif"
          fontWeight={400} // Regular font weight
          fontSize="1rem" // Regular font size
        >
          {description}
        </Typography> */}
        {/* <Typography
          variant="body2"
          color="text.secondary"
          fontFamily="'Quicksand', sans-serif"
          fontWeight={500} // Medium font weight
          fontSize="1rem"
        >
          <strong>Person Name:</strong> {personName}
        </Typography> */}
        <Typography
          variant="body2"
          color="text.secondary"
          fontFamily="'Quicksand', sans-serif"
          fontWeight={500}
          fontSize="1rem"
        >
          <strong>Application ID:</strong> {applicationId}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontFamily="'Quicksand', sans-serif"
          fontWeight={500}
          fontSize="1rem"
        >
          <strong>Workers Required:</strong> {workers_required}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontFamily="'Quicksand', sans-serif"
          fontWeight={500}
          fontSize="1rem"
        >
          <strong>Closing Date:</strong>{" "}
          {new Date(closing_date).toISOString().split("T")[0]}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          fontFamily="'Quicksand', sans-serif"
          fontWeight={500}
          fontSize="1rem"
        >
          <strong>Amount Per Day:</strong> {amountPerDay}
        </Typography>
        <StyledButton
          variant="contained"
          size="small"
          onClick={() => onClickApplyHandle(applicationId)}
        >
          Apply
        </StyledButton>
      </CardContent>
    </StyledCard>
  );
};

export default ApplicationCard;
