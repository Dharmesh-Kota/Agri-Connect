import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Grid, Container } from "@mui/material";
import MachineryRentalCard from "../components/MachineryRentalCard";
import HoldersModal from "../components/HoldersModal";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";

// Dummy data for testing
const dummyApplications = [
  {
    id: 1,
    title: "Excavator",
    category: ["Heavy Machinery", "Construction"],
    description: "A powerful excavator for heavy-duty tasks.",
    unitsAvailable: 5,
    unitsRented: 2,
    holders: ["user1", "user2", "user3"],
  },
  // Add more dummy data as needed
];

const ViewRentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchApplications = async () => {
    // Simulate fetching applications with dummy data
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };

      const results = await axios.get(
        (process.env.BACKEND_API || "http://localhost:8000") +
          `/view-rent-applications/`,
        { headers }
      );

      setApplications(results.data.applications);
      
      // console.log(results.data);
      // console.log("Form submitted:", response.data);
      toast.success("Application deleted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error deleting application. Please try again.");
    }

    // setApplications(dummyApplications);
  };

  const handleShowHolders = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };
  const handleEdit = (application)=>{
    
  };
  const handleDelete = async (application_id)=>{
    console.log(application_id);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };

      const results = await axios.get(
        (process.env.BACKEND_API || "http://localhost:8000") +
          `/delete-rent-application/${application_id}`,
        { headers }
      );

      setApplications((apps) =>
        apps.filter((app) => app.rent_id !== application_id)
      );

      console.log("Form submitted:", results.data);
      toast.success("Application deleted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error deleting application. Please try again.");
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUnitsAvailableChange = (updatedApplication) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === updatedApplication.id ? updatedApplication : app
      )
    );
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    fetchApplications();
  }, []);

  return (
    <>
      <Container sx={{ pt: "5em" }}>
        <Grid container spacing={4}>
          {applications.map((app) => (
            <Grid item xs={12} key={app.id} data-aos="fade-up">
              <MachineryRentalCard
                title={app.title}
                category={app.category}
                description={app.description}
                unitsAvailable={app.quantity_available                }
            
                onShowHolders={() => handleShowHolders(app)}
                onEdit = {()=> handleEdit(app)}
                onDelete = {()=> handleDelete(app.rent_id)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {selectedApplication && (
        <HoldersModal
          open={isModalOpen}
          onClose={handleModalClose}
          application={selectedApplication}
          onUnitsAvailableChange={handleUnitsAvailableChange}
        />
      )}
    </>
  );
};

export default ViewRentApplications;
