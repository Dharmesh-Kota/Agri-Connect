import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ViewApplicationCard from "../components/ViewApplicationCard";
import ApplicationModal from "../components/ApplicantsModal";
import AOS from "aos";
import "aos/dist/aos.css";
import config from "../config";
import {
  Grid,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Box,
} from "@mui/material";

const ViewWorkApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [currApplicationId, setCurrApplicationId] = useState(null);

  const [formValues, setFormValues] = useState({
    workers_required: "",
    description: "",
    closing_date: "",
    labour: "",
  });
  const [formErrors, setFormErrors] = useState({
    workers_required: false,
    description: false,
    closing_date: false,
    labour: false,
  });

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleFormChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const today = new Date().toISOString().split("T")[0];
    const errors = {
      workers_required: formValues.workers_required <= 0,
      description: !formValues.description,
      closing_date: formValues.closing_date < today,
      labour: formValues.labour <= 0,
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        };

        // console.log(formValues);

        const results = await axios.post(
          (config.BACKEND_API || "http://localhost:8000") +
            `/update-work-application/${currApplicationId}`,
          formValues,
          { headers }
        );

        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.application_id === currApplicationId
              ? {
                  ...app,
                  workers_required: formValues.workers_required,
                  description: formValues.description,
                  closing_date: formValues.closing_date,
                  labour: formValues.labour,
                }
              : app
          )
        );

        setFormValues({
          workers_required: "",
          description: "",
          closing_date: "",
          labour: "",
        });

        // console.log("Form submitted:", response.data);
        toast.success("Application submitted successfully!");
        handleFormClose();
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting application. Please try again.");
        handleFormClose();
      }
    }
  };

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

      // console.log(results.data.applications);

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

  const handleEditApplication = (application_id) => {
    setFormOpen(true);
    setCurrApplicationId((prev) => application_id);
    const data = applications.filter(
      (app) => app.application_id === application_id
    )[0];
    let closingDate = new Date(data.closing_date);
    const formattedDate = closingDate.toISOString().split("T")[0];

    setFormValues({
      workers_required: data.workers_required,
      description: data.description,
      closing_date: formattedDate,
      labour: data.labour,
    });
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

      <Dialog open={formOpen} onClose={handleFormClose} maxWidth="sm" fullWidth>
        <DialogTitle>Submit Application</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 3,
            }}
          >
            <TextField
              label="Workers Required"
              name="workers_required"
              type="number"
              value={formValues.workers_required}
              onChange={handleFormChange}
              fullWidth
              error={formErrors.workers_required}
              helperText={
                formErrors.workers_required &&
                "This field is required and must be greater than 0"
              }
            />
            <TextField
              label="Description"
              name="description"
              type="text"
              value={formValues.description}
              onChange={handleFormChange}
              fullWidth
              error={formErrors.description}
              helperText={formErrors.description && "This field is required"}
            />
            <TextField
              label="Closing Date"
              name="closing_date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formValues.closing_date}
              onChange={handleFormChange}
              fullWidth
              error={formErrors.closing_date}
              helperText={
                formErrors.closing_date &&
                "This field is required and must be a future date"
              }
            />
            <TextField
              label="Labour (in Rupee)"
              name="labour"
              type="number"
              value={formValues.labour}
              onChange={handleFormChange}
              fullWidth
              error={formErrors.labour}
              helperText={
                formErrors.labour &&
                "This field is required and must be greater than 0"
              }
            />
            <DialogActions>
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button onClick={handleFormClose} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewWorkApplications;
