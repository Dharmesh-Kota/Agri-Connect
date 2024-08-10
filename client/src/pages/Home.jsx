import React from "react";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/AboutUs.css";

import Button from '@mui/material/Button';
import { Box, Typography, Grid } from "@mui/material";
import rentimg from "../images/rent.png"
import hireimg from "../images/hire.jpg"

const ImgcontainerStyle = {
    height: "40%",
    width:"100%",
}
const welcometext = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Centers the text
    color: '#ffffff',
    fontSize: '2rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Adds shadow for better readability
    textAlign: 'center'
  };


const imageStyle = {
    width: '100%',
    height: 'auto',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', // Use 'column' if you want a vertical layout
    gap: '20px', // Space between the two sections
    padding: '20px'
  };
  
  const textrentStyle = {
    position: 'absolute',
    right: '15%',
    bottom: '20%',
    transform: 'translateY(-50%)',
    color: '#ffffff',
    fontSize: '5rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
  };
  
  const ButtonrentStyle = {
    position: 'absolute',
    right: '27.5%',
    bottom: '20%',
    padding: '10px 20px',
    fontSize: '1.5rem',
    color: '#000000',
    fontWeight: 'bold', // Make the font bold
    backgroundColor: 'transparent', // Remove background color
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '5px 5px 7px rgba(0, 0, 0, 0.3)'
};
  
  const texthireStyle = {
    position: 'absolute',
    left: '15%',
    bottom: '20%',
    transform: 'translateY(-50%)',
    color: '#ffffff',
    fontSize: '5rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
  };
  
  const ButtonhireStyle = {
    position: 'absolute',
    left: '27.5%',
    bottom: '20%',
    padding: '10px 20px',
    fontSize: '1.5rem',
    color: '#000000',
    fontWeight: 'bold', // Make the font bold
    backgroundColor: 'transparent', // Remove background color
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
};

const contentStyle = {
    textAlign: 'justify', // Aligns text justification
    padding: '20px',
    width: '80%', // Use lowercase 'width' instead of 'Width'
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  };
  
  const headingStyle = {
    fontSize: '2.5rem',
    margin: '0',
    color: '#333'
  };
  
  const paragraphStyle = {
    fontSize: '1.2rem',
    color: '#555',
    lineHeight: '1.6',
    textAlign: 'justify', // Justifies text within paragraphs
    margin: '0 0 20px' // Adds spacing between paragraphs
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
        <div style={{ fontSize: '6rem' }}>Welcome to</div>
        <div style={{ fontSize: '7.5rem' }}>AgriConnect</div>
      </div>
        </div>
        <div>
    </div>
    <div style={containerStyle}>
        <div style={imageStyle}>
        <img src={hireimg} alt="Background" style={{ width: '80%', height: '500px' }} />
        <div style={texthireStyle}>
            Hire & Get Hired
        </div>
        <button style={ButtonhireStyle}>Hiring</button>
        </div>
        <div style={imageStyle}>
        <img src={rentimg} alt="Background" style={{ width: '80%', height: '500px' }} />
        <div style={textrentStyle}>
            Acquire & Lease
        </div>
        <button style={ButtonrentStyle}>Rent Machine</button>
        </div>
    </div>


    <div style={contentStyle}>
      <h1 style={headingStyle}>What We Do</h1>
      <p style={paragraphStyle}>
        At AgriConnect, we bridge the gap between technology and agriculture. Our platform offers innovative solutions to connect farmers with essential resources, equipment rentals, and expert advice. Whether you're looking to hire machinery, access advanced tools, or gain insights into the latest agricultural practices, AgriConnect provides a seamless and efficient way to support your farming needs.
      </p>
      <p style={paragraphStyle}>
        Our goal is to empower farmers with the tools and knowledge they need to thrive in a rapidly evolving industry. Join us in transforming agriculture and achieving greater productivity and sustainability for the future.
      </p>
    </div>
        </>
    );
}
export default Home;
