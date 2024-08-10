import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import toast from "react-hot-toast";

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

const HoldersModal = ({
  open,
  onClose,
  application,
  onUnitsAvailableChange,
}) => {
  const [localApplication, setLocalApplication] = useState(application);

  useEffect(() => {
    setLocalApplication(application);
  }, [application]);

  const handleFree = async (username) => {
    try {
      // Perform the API call to free the holder
      const response = await axios.post(
        `/api/applications/${localApplication.id}/holders/${username}/free`
      );

      if (response.status === 200) {
        // Update application state only if API call is successful
        const updatedApplication = {
          ...localApplication,
          unitsAvailable: localApplication.unitsAvailable + 1,
          holders: localApplication.holders.filter(
            (holder) => holder !== username
          ),
        };
        setLocalApplication(updatedApplication);
        onUnitsAvailableChange(updatedApplication);
        toast.success(`${username} has been freed.`);
      } else {
        throw new Error("Failed to free the holder.");
      }
    } catch (error) {
      toast.error(`Failed to free ${username}.`);
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
          Holders for {localApplication.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Units Available: {localApplication.unitsAvailable}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Total Holders: {localApplication.holders?.length}
        </Typography>

        <List>
          {localApplication.holders
            ? localApplication.holders.map((username) => (
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
              ))
            : ""}
        </List>
      </StyledModal>
    </Modal>
  );
};

export default HoldersModal;
