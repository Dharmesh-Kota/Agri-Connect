import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

// Modal styling
const StyledModal = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  backgroundColor: theme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  maxHeight: "80vh",
  overflowY: "auto",
}));

const ApplicationModal = ({
  open,
  onClose,
  application,
  onApplicantStatusChange,
}) => {
  const [localApplication, setLocalApplication] = useState(application);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    setLocalApplication(application);
    // console.log("app");

    // console.log(application);
  }, [application]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleHire = async (username_obj) => {
    try {
      // Assume the API endpoint for hiring applicants is something like:
      // POST /api/applications/{applicationId}/applicants/{username}/h_objire
      await onApplicantStatusChange(
        localApplication.application_id,
        username_obj,
        "hire"
      );
      setLocalApplication((prevApplication) => ({
        ...prevApplication,
        applicants: prevApplication.applicants.filter(
          (user) => user.username !== username_obj.username
        ),
        hired_workers: [...prevApplication.hired_workers, username_obj],
      }));
    } catch (error) {
      // Handle the error if the API call fails
      console.error(error);
    }
  };

  const handleFree = async (username_obj) => {
    try {
      // Assume the API endpoint for freeing applicants is something like:
      // POST /api/applications/{applicationId}/applicants/{username}/free
      await onApplicantStatusChange(
        localApplication.application_id,
        username_obj,
        "free"
      );
      setLocalApplication((prevApplication) => ({
        ...prevApplication,
        hired_workers: prevApplication.hired_workers.filter(
          (user) => user.username !== username_obj.username
        ),
      }));
    } catch (error) {
      // Handle the error if the API call fails
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModal>
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
        {/* <Typography variant="h6" gutterBottom>
          Applicants for {localApplication.title}
        </Typography> */}
        {/* <Typography variant="subtitle1" gutterBottom>
          Status: {localApplication.status}
        </Typography> */}
        <Typography variant="subtitle1" gutterBottom>
          Total Applicants:{" "}
          {localApplication.applicants ? localApplication.applicants.length : 0}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Total Hired:{" "}
          {localApplication.hired_workers
            ? localApplication.hired_workers.length
            : 0}
        </Typography>

        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Applicants" />
          <Tab label="Hired Applicants" />
        </Tabs>

        {tabIndex === 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Applicants
            </Typography>
            <List>
              {localApplication.applicants.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item.username} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleHire(item)}
                  >
                    Hire
                  </Button>
                </ListItem>
              ))}
            </List>
          </>
        )}

        {tabIndex === 1 && (
          <>
            <Typography variant="h6" gutterBottom>
              Hired Applicants
            </Typography>
            <List>
              {localApplication.hired_workers &&
                localApplication.hired_workers.map((obj, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={obj.username} />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleFree(obj)}
                    >
                      Free
                    </Button>
                  </ListItem>
                ))}
            </List>
          </>
        )}
      </StyledModal>
    </Modal>
  );
};

export default ApplicationModal;
