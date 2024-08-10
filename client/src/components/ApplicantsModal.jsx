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
  }, [application]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleHire = async (username) => {
    try {
      // Assume the API endpoint for hiring applicants is something like:
      // POST /api/applications/{applicationId}/applicants/{username}/hire
      await onApplicantStatusChange(localApplication.id, username, "hire");
      setLocalApplication((prevApplication) => ({
        ...prevApplication,
        applicants: prevApplication.applicants.filter(
          (user) => user !== username
        ),
        hired: [...prevApplication.hired, username],
      }));
    } catch (error) {
      // Handle the error if the API call fails
      console.error(error);
    }
  };

  const handleFree = async (username) => {
    try {
      // Assume the API endpoint for freeing applicants is something like:
      // POST /api/applications/{applicationId}/applicants/{username}/free
      await onApplicantStatusChange(localApplication.id, username, "free");
      setLocalApplication((prevApplication) => ({
        ...prevApplication,
        hired: prevApplication.hired.filter((user) => user !== username),
        applicants: [...prevApplication.applicants, username],
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
        <Typography variant="h6" gutterBottom>
          Applicants for {localApplication.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Status: {localApplication.status}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Total Applicants: {localApplication.applicants.length}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Total Hired: {localApplication.hired.length}
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
              {localApplication.applicants.map((username) => (
                <ListItem key={username}>
                  <ListItemText primary={username} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleHire(username)}
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
              {localApplication.hired.map((username) => (
                <ListItem key={username}>
                  <ListItemText primary={username} />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleFree(username)}
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
