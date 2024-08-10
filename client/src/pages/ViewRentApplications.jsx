import React, { useState, useEffect } from "react";
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

  const fetchApplications = () => {
    // Simulate fetching applications with dummy data
    setApplications(dummyApplications);
  };

  const handleShowHolders = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

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
                unitsAvailable={app.unitsAvailable}
                unitsRented={app.unitsRented}
                onShowHolders={() => handleShowHolders(app)}
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
