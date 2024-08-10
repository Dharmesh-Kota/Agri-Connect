import React from "react";
import "../CSS/LandingPage.css";
import { Grid, Typography } from "@mui/material";

function LandingPage() {
  return (
    <>
      <Grid
        item
        container
        margin={0}
        padding={0}
        sx={{
          width: "100%",
          height: "100vh",
          backgroundColor: "lightblue",
        }}
      >
        <Grid
          xs={6}
          item
          container
          margin={0}
          padding={0}
          sx={{
            backgroundColor: "lightpink",
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography fontWeight="bold" sx={{ m: 10, fontSize: "5em" }}>
            Welcome To Agri Connect
          </Typography>
        </Grid>
        <Grid xs={6} item container margin={0} padding={0}>
          B
        </Grid>
      </Grid>
      {/* <div className="zigzag"> */}
      {/* </div> */}
    </>
  );
}

export default LandingPage;
