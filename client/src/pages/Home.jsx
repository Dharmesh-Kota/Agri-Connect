import React from "react";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/AboutUs.css";

import WorkIcon from "@mui/icons-material/Work";
import BuildIcon from "@mui/icons-material/Build";
import InsightsIcon from "@mui/icons-material/Insights";
import { Card, CardContent, Typography, Grid } from "@mui/material";

import GroupIcon from "@mui/icons-material/Group";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import rentimg from "../images/rent.png";
import hireimg from "../images/hire.jpg";

const ImgcontainerStyle = {
  height: "40%",
  width: "100%",
};
const welcometext = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)", // Centers the text
  color: "#ffffff",
  fontSize: "2rem",
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Adds shadow for better readability
  textAlign: "center",
};

const imageStyle = {
  width: "100%",
  height: "auto",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column", // Use 'column' if you want a vertical layout
  gap: "20px", // Space between the two sections
  padding: "20px",
};

const textrentStyle = {
  position: "absolute",
  right: "20%",
  bottom: "30%",
  transform: "translateY(-50%)",
  color: "#ffffff",
  fontSize: "5rem",
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
};

const ButtonrentStyle = {
  position: "absolute",
  right: "27.5%",
  bottom: "30%",
  padding: "10px 20px",
  fontSize: "1.5rem",
  color: "#000000",
  fontWeight: "bold", // Make the font bold
  backgroundColor: "transparent", // Remove background color
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  boxShadow: "5px 5px 7px rgba(0, 0, 0, 0.3)",
};

const texthireStyle = {
  position: "absolute",
  left: "20%",
  bottom: "30%",
  transform: "translateY(-50%)",
  color: "#ffffff",
  fontSize: "5rem",
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
};

const ButtonhireStyle = {
  position: "absolute",
  left: "27.5%",
  bottom: "30%",
  padding: "10px 20px",
  fontSize: "1.5rem",
  color: "#000000",
  fontWeight: "bold", // Make the font bold
  backgroundColor: "transparent", // Remove background color
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
};
const contentStyle = {
  padding: "30px",
  width: "80%",
  margin: "20px auto",
  // background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
  // borderRadius: '15px',
  // boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
};

const cardStyle = {
  maxWidth: 345,
  margin: "15px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  padding: "10px",
  height: "200px",
};

const iconStyle = {
  fontSize: "3rem",
  color: "#00796b", // Teal color for the icons
};
const headingStyle = {
  display: "flex",
  justifyContent: "center",
  fontSize: "2.8rem",
  margin: "0 0 20px",
  color: "#333",
  fontWeight: "600",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
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
        <div style={welcometext}>
          <div style={{ fontSize: "6rem" }}>Welcome to</div>
          <div style={{ fontSize: "7.5rem" }}>AgriConnect</div>
        </div>
      </div>
      <div></div>
      <div style={containerStyle}>
        <div style={imageStyle}>
          <img
            src={hireimg}
            alt="Background"
            style={{ width: "65%", height: "500px", borderRadius: "10px" }}
          />
          <div style={texthireStyle}>Hire or Get Hired</div>
          <button
            style={ButtonhireStyle}
            onClick={() => {
              navigate("/work_application");
            }}
          >
            Hiring
          </button>
        </div>
        <div style={imageStyle}>
          <img
            src={rentimg}
            alt="Background"
            style={{ width: "65%", height: "500px", borderRadius: "10px" }}
          />
          <div style={textrentStyle}>Acquire or Lease</div>
          <button
            style={ButtonrentStyle}
            onClick={() => {
              navigate("/rent_application");
            }}
          >
            Rent Machine
          </button>
        </div>
      </div>

      <div style={contentStyle}>
        <h1 style={headingStyle}>What we do?</h1>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card style={cardStyle}>
              <CardContent>
                <WorkIcon style={iconStyle} />
                <Typography variant="h5" component="div" gutterBottom>
                  Connect
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Easily connect farmers with skilled workers or find job
                  opportunities in agriculture.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card style={cardStyle}>
              <BuildIcon style={iconStyle} />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Rent Equipment
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  List and rent agricultural machinery effortlessly. Access
                  high-quality tools as needed.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card style={cardStyle}>
              <InsightsIcon style={iconStyle} />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Innovate
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Get insights into the latest farming practices and
                  technologies to stay ahead in agriculture.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
export default Home;
