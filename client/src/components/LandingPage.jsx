import React from "react";
import "../CSS/LandingPage.css";
import { Box, Grid, Typography } from "@mui/material";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import leaf from "../images/leaf.png";

function LandingPage() {
  const createLeaves = () => {
    const leaves = [];
    for (let i = 0; i < 10; i++) {
      leaves.push(
        <img
          key={i}
          src={leaf}
          className="falling-leaf"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 10}s`,
            width: `${Math.random() * 50 + 70}px`,
            height: "auto",
          }}
        />
      );
    }
    return leaves;
  };

  return (
    <>
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        {createLeaves()}
        <Box sx={{ position: "absolute", bottom: 0, left: -10 }}>
          <div className="zigzag">
            <img
              src={img2}
              style={{
                width: "16em",
                height: "100%",
              }}
            />
          </div>
        </Box>
        <Box sx={{ position: "absolute", top: -20, right: -50 }}>
          <div className="zigzag">
            <img
              src={img3}
              style={{
                width: "20em",
                height: "100%",
              }}
            />
          </div>
        </Box>
        <Grid
          item
          container
          margin={0}
          padding={0}
          sx={{
            width: "100%",
            height: "100vh",
            // backgroundColor: "lightblue",
          }}
        >
          <Grid
            xs={12}
            item
            container
            margin={0}
            padding={0}
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              fontWeight="bold"
              sx={{
                m: 10,
                color: "#134611",
                fontSize: "6em",
                fontFamily: "'DM Serif Display', serif",
              }}
            >
              Welcome To AgriConnect
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default LandingPage;
