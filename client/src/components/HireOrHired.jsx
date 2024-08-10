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
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.5%", // Adjust padding as needed
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
            sx={{ m: 4, p: 1, px: 4, fontWeight: "bold" }}
            variant="outlined"
            color="success"
            onClick={() => {
              navigate("/work-application");
            }}
          >
            Hiring <OpenInNewRoundedIcon color="success" sx={{ mx: 1 }} />
          </Button>
        </Typography>
      </Box>

      {/* Image Container */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
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
