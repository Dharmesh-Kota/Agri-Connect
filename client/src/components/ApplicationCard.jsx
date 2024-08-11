import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import axios from "axios";
import toast from "react-hot-toast";
import config from "../config";

// Custom styled component for a more attractive card with greenish theme
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "1px 1px 1px 1px #134611",
  overflow: "visible",
  backgroundColor: "#ffffff", // Light background color
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "2px 2px 2px 2px #134611",
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
            fontSize="xx-large" // Larger font size
            sx={{ color: "#134611", fontWeight: "bold" }}
          >
            <strong>Person Name: </strong> {personName}
          </Typography>
          <Typography
            fontSize="large" // Larger font size
            sx={{ color: "#134611", fontWeight: "bold" }}
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
          <strong>Amount Per Day:</strong> &#8377; {amountPerDay}
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{ my: 2, fontWeight: "bold" }}
          onClick={() => onClickApplyHandle(applicationId)}
        >
          Apply
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default ApplicationCard;
