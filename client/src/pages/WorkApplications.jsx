import React, { useEffect } from "react";
import { Grid, Container } from "@mui/material";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import ApplicationCard from "../components/ApplicationCard";

// Sample data for cards
const applications = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Corp",
    personName: "John Doe",
    applicationId: "APP1234",
    workersRequired: 5,
    closingDate: "2024-08-31",
    description:
      "A software engineer position at Tech Corp, focusing on building scalable applications.",
    amountPerDay: "$200",
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "Data Inc",
    personName: "Jane Smith",
    applicationId: "APP5678",
    workersRequired: 3,
    closingDate: "2024-09-15",
    description:
      "A data scientist role at Data Inc, involving data analysis and machine learning.",
    amountPerDay: "$250",
  },
  // Add more application data as needed
];

const WorkApplications = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <Container>
      <Grid container spacing={4}>
        {applications.map((app) => (
          <Grid item xs={12} key={app.id} data-aos="fade-up">
            <ApplicationCard
              title={app.title}
              company={app.company}
              personName={app.personName}
              applicationId={app.applicationId}
              workersRequired={app.workersRequired}
              closingDate={app.closingDate}
              description={app.description}
              amountPerDay={app.amountPerDay}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WorkApplications;
