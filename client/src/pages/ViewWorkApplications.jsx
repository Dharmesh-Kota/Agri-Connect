import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Grid, Container } from "@mui/material";
import ViewApplicationCard from "../components/ViewApplicationCard";
import ApplicationModal from "../components/ApplicantsModal";
import AOS from "aos";
import "aos/dist/aos.css";

const ViewWorkApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dummy_data = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Corp",
      workersRequired: 5,
      closingDate: "2024-08-31",
      description:
        "A software engineer position at Tech Corp, focusing on building scalable applications.",
      amountPerDay: "200",
      status: "Open",
      applicants: [
        "alice",
        "bob",
        "charlie",
        "alice",
        "bob",
        "charlie",
        "alice",
        "bob",
        "charlie",
        "alice",
        "bob",
        "charlie",
      ], // Dummy applicant usernames
      hired: ["david"], // Dummy hired applicant usernames
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "Data Inc",
      workersRequired: 3,
      closingDate: "2024-09-15",
      description:
        "A data scientist role at Data Inc, involving data analysis and machine learning.",
      amountPerDay: "250",
      status: "Open",
      applicants: ["eve", "frank"], // Dummy applicant usernames
      hired: [], // No hired applicants yet
    },
  ];

  const fetchApplications = async () => {
    try {
      // Your fetch logic here
      setApplications(dummy_data);
    } catch (error) {
      toast.error("Failed to fetch applications.");
    }
  };

  const handleViewApplicants = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEditApplication = (id) => {
    toast.success(`Edit Application ${id}`);
    // Add your edit logic here
  };

  const handleDeleteApplication = (id) => {
    toast.success(`Delete Application ${id}`);
    // Add your delete logic here
  };

  const handleApplicantStatusChange = async (
    applicationId,
    username,
    action
  ) => {
    try {
      // API call to update the applicant status
      console.log("make");

      const response = await axios.post(
        `/api/applications/${applicationId}/applicants/${username}/${action}`
      );

      console.log(response.status);

      if (response.status === 200) {
        // Update application state only if API call is successful
        // setApplications((prevApplications) =>
        //   prevApplications.map((app) =>
        //     app.id === applicationId
        //       ? {
        //           ...app,
        //           applicants:
        //             action === "hire"
        //               ? app.applicants.filter((user) => user !== username)
        //               : app.applicants,
        //           hired:
        //             action === "hire"
        //               ? [...app.hired, username]
        //               : app.hired.filter((user) => user !== username),
        //         }
        //       : app
        //   )
        // );
        toast.success(
          `${username} has been ${action === "hire" ? "hired" : "freed"}.`
        );
      } else {
        throw new Error("Failed to update applicant status.");
      }
    } catch (error) {
      toast.error(
        `Failed to ${action === "hire" ? "hire" : "free"} ${username}.`
      );
      throw error;
    }
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
              <ViewApplicationCard
                title={app.title}
                company={app.company}
                workersRequired={app.workersRequired}
                closingDate={app.closingDate}
                description={app.description}
                amountPerDay={app.amountPerDay}
                status={app.status}
                onViewApplicants={() => handleViewApplicants(app)}
                onEdit={() => handleEditApplication(app.id)}
                onDelete={() => handleDeleteApplication(app.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {selectedApplication && (
        <ApplicationModal
          open={isModalOpen}
          onClose={handleModalClose}
          application={selectedApplication}
          onApplicantStatusChange={handleApplicantStatusChange}
        />
      )}
    </>
  );
};

export default ViewWorkApplications;
