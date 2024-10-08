import React from "react";
import { Box, Typography, Button } from "@mui/material";
import hired from "../images/hired.jpg";
import { useNavigate } from "react-router-dom";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Text Container */}
      <Box
        sx={{
          flex: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0.5%", // Adjust padding as needed
          zIndex: 200,
        }}
      >
        <Typography
          fontWeight="bold"
          sx={{
            color: "#134611",
            fontSize: "6em",
            fontFamily: "'DM Serif Display', serif",
            textAlign: "left",
            maxWidth: "80%", // Ensure text does not overflow
          }}
        >
          Hire or get Hired
          <Button
            sx={{ p: 2, px: 4, fontWeight: "bold", fontSize: "20px" }}
            variant="outlined"
            color="success"
            onClick={() => {
              navigate("/work-applications");
            }}
          >
            Hiring <OpenInNewRoundedIcon color="success" sx={{ mx: 1 }} />
          </Button>
        </Typography>
      </Box>

      {/* Image Container */}
      <Box
        sx={{
          flex: 30,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          src={hired}
          alt="Portrait"
          style={{
            width: "50%", // Adjust width as needed
            height: "auto", // Maintain aspect ratio
            borderRadius: "12px",
          }}
        />
      </Box>
    </Box>
  );
}

export default LandingPage;
