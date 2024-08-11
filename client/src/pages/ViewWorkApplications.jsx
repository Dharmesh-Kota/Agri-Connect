import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Grid, Container } from "@mui/material";
import ViewApplicationCard from "../components/ViewApplicationCard";
import ApplicationModal from "../components/ApplicantsModal";
import AOS from "aos";
import "aos/dist/aos.css";
import config from "../config";

const ViewWorkApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const dummy_data = [
  //   {
  //     id: 1,
  //     title: "Software Engineer",
  //     company: "Tech Corp",
  //     workersRequired: 5,
  //     closingDate: "2024-08-31",
  //     description:
  //       "A software engineer position at Tech Corp, focusing on building scalable applications.",
  //     amountPerDay: "200",
  //     status: "Open",
  //     applicants: [
  //       "alice",
  //       "bob",
  //       "charlie",
  //       "alice",
  //       "bob",
  //       "charlie",
  //       "alice",
  //       "bob",
  //       "charlie",
  //       "alice",
  //       "bob",
  //       "charlie",
  //     ], // Dummy applicant usernames
  //     hired: ["david"], // Dummy hired applicant usernames
  //   },
  //   {
  //     id: 2,
  //     title: "Data Scientist",
  //     company: "Data Inc",
  //     workersRequired: 3,
  //     closingDate: "2024-09-15",
  //     description:
  //       "A data scientist role at Data Inc, involving data analysis and machine learning.",
  //     amountPerDay: "250",
  //     status: "Open",
  //     applicants: ["eve", "frank"], // Dummy applicant usernames
  //     hired: [], // No hired applicants yet
  //   },
  // ];

  const fetchApplications = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };

      const results = await axios.get(
        (config.BACKEND_API || "http://localhost:8000") +
          `/view-work-applications`,
        { headers }
      );

      console.log(results.data.applications);

      setApplications(results.data.applications);
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

  const handleEditApplication = async (application_id) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };

      // const results = await axios.post(
      //   (config.BACKEND_API || "http://localhost:8000") +
      //     `/update-work-application`,
      //   { headers }
      // );

      // console.log(results);

      // console.log("Form submitted:", response.data);
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting application. Please try again.");
    }
  };

  const handleDeleteApplication = async (application_id) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };

      const results = await axios.get(
        (config.BACKEND_API || "http://localhost:8000") +
          `/delete-work-application/${application_id}`,
        { headers }
      );

      setApplications((apps) =>
        apps.filter((app) => app.application_id !== application_id)
      );

      // console.log("Form submitted:", response.data);
      toast.success("Application deleted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error deleting application. Please try again.");
    }
  };

  const handleApplicantStatusChange = async (
    application_id,
    username_obj,
    action
  ) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };

      // console.log(username);

      const response = await axios.get(
        (config.BACKEND_API || "http://localhost:8000") +
          (action === "hire"
            ? `/hire-worker/${application_id}/${username_obj.username}`
            : `/free-worker/${application_id}/${username_obj.username}`),
        { headers }
      );

      console.log(response);

      if (response.status === 200 || response.status === 201) {
        // Update application state only if API call is successful
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.application_id === application_id
              ? {
                  ...app,
                  applicants:
                    action === "hire"
                      ? app.applicants.filter(
                          (user) => user.username !== username_obj.username
                        )
                      : app.applicants,
                  hired_workers:
                    action === "hire"
                      ? [...app.hired_workers, username_obj]
                      : app.hired_workers.filter(
                          (user) => user.username !== username_obj.username
                        ),
                }
              : app
          )
        );
        toast.success(
          `${username_obj.username} has been ${
            action === "hire" ? "hired" : "freed"
          }.`
        );
      } else {
        throw new Error("Failed to update applicant status.");
      }
    } catch (error) {
      toast.error(
        `Failed to ${action === "hire" ? "hire" : "free"} ${
          username_obj.username
        }.`
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
          {applications &&
            applications.map((app) => (
              <Grid item xs={12} key={app._id} data-aos="fade-up">
                <ViewApplicationCard
                  workersRequired={app.workers_required}
                  closingDate={app.closing_date}
                  description={app.description}
                  amountPerDay={app.labour}
                  status={"Open"}
                  onViewApplicants={() => handleViewApplicants(app)}
                  onEdit={() => handleEditApplication(app.application_id)}
                  onDelete={() => handleDeleteApplication(app.application_id)}
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
