import React from "react";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/AboutUs.css";

import Button from '@mui/material/Button';
import { Box, Typography, Grid } from "@mui/material";

const ImgcontainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "3px solid black",
    borderRadius: "15px",
    height: "40%",
    width:"80%",
    margin:"auto"
}

const HomeImg = {
    width: "100%",
    height: "100%",
}


const buttonStyle = {
    padding: "12px 24px",         // Increased padding for larger buttons
    fontSize: "25px",             // Increased font size for better visibility
    borderRadius: "15px",         // Rounded corners
    backgroundColor: "#1976d2",   // Custom background color
    color: "#fff",                // White text color
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
    textTransform: "none",        // Prevent all caps text
    transition: "all 0.3s ease",  // Smooth transition for hover effects
    '&:hover': {
      backgroundColor: "#115293", // Darker shade on hover
    },
  };
  



// const ProjectDetailsContainer = {
//     display:"flex",
//     alignItems:"center",
//     justifyContent:"center"
// }

// const ProjectImgContainer = {

// }

// const ProjectTextContainer = {

// }


const containerStyle = {
    margin: "50px auto",
    padding:"50px auto",
    width: "80%",
  };
  
  const zigzagItemStyle = {
    padding: "20px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    marginBottom: "30px",
  };
  
  const textStyle = {
    fontSize: "18px",
    color: "#333",
  };
  
  const imageStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
  };

function Home() {
  const navigate = useNavigate();

    return (
        <>
        <div style={ImgcontainerStyle}>
        <img
            src="https://via.placeholder.com/500x250"
            alt="Project Image 1"
            style={imageStyle}
            />
        </div>
        <div>
      <Box sx={{ '& button': { m: 2 } }}> {/* Increased margin for spacing */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button size="large" sx={buttonStyle} onClick={()=>{navigate("/find_work")}}>Find Work</Button>
          <Button size="large" sx={buttonStyle} onClick={()=>{navigate("/rent_machine")}}>Rent Machine</Button>
        </div>
      </Box>
    </div>

        <Box style={containerStyle}>
      <Grid container spacing={4} style={zigzagItemStyle}>
        {/* First Row: Image on Left, Text on Right */}
        <Grid item xs={12} md={6}>
          <img
            src="https://via.placeholder.com/300"
            alt="Project Image 1"
            style={imageStyle}
            />
        </Grid>
        <Grid item xs={12} md={6} style={textStyle}>
          <Typography>
            This is the description for the first image. The text is on the right.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4} style={zigzagItemStyle}>
        {/* Second Row: Text on Left, Image on Right */}
        <Grid item xs={12} md={6} style={textStyle}>
          <Typography>
            This is the description for the second image. The text is on the left.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="https://via.placeholder.com/300"
            alt="Project Image 2"
            style={imageStyle}
            />
        </Grid>
      </Grid>

      <Grid container spacing={4} style={zigzagItemStyle}>
        {/* Third Row: Image on Left, Text on Right */}
        <Grid item xs={12} md={6}>
          <img
            src="https://via.placeholder.com/300"
            alt="Project Image 3"
            style={imageStyle}
            />
        </Grid>
        <Grid item xs={12} md={6} style={textStyle}>
          <Typography>
            This is the description for the third image. The text is on the right.
          </Typography>
        </Grid>
      </Grid>
    </Box>

        </>
    );
}
export default Home;
