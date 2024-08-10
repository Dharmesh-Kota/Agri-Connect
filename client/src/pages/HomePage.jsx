import React from "react";
import LandingPage from "../components/LandingPage";
import Home from "./Home";

const FixedComponent = () => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <LandingPage />
      </div>
      <Home />
    </>
  );
};

export default FixedComponent;
