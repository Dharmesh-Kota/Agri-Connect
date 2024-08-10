import React from "react";
import { Box, Grid, Typography } from "@mui/material";

function LandingPage() {
  return (
    <>
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <Grid
          item
          container
          margin={0}
          padding={0}
          sx={{
            width: "100%",
            height: "100vh",
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
              Welcome To Agri Connect
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default LandingPage;
