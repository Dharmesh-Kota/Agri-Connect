import React, { useState, useEffect } from "react";
import { Box, MenuItem, FormControl, Select, Chip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Grid, Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const dropdownStyle = {
  margin: "auto",
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "#f0f0f0"
};

const DropdownWithSelectedOptions = ({ selectedOptions, setSelectedOptions }) => {
  const handleChange = (event) => {
      const { value } = event.target;
      setSelectedOptions((prevSelected) => {
          if (!prevSelected.includes(value)) {
              return [...prevSelected, value];
          }
          return prevSelected;
      });
  };

  const handleRemove = (optionToRemove) => {
      setSelectedOptions((prevSelected) => prevSelected.filter(option => option !== optionToRemove));
  };

  return (
      <Box style={dropdownStyle}>
          <FormControl fullWidth>
              <Select
                  value=""
                  onChange={handleChange}
                  displayEmpty
              >
                  <MenuItem value="" disabled>
                      <em>Select Option</em>
                  </MenuItem>
                  <MenuItem value="Harvesting Equipment">Harvesters</MenuItem>
                  <MenuItem value="Tractors">Irrigation Systems</MenuItem>
                  <MenuItem value="Plowing & Tilling Equipment">Plowing & Tilling Equipment</MenuItem>
                  <MenuItem value="Planting & Seeding Equipment">Planting & Seeding Equipment</MenuItem>
                  <MenuItem value="Irrigation Equipment">Irrigation Equipment</MenuItem>
                  <MenuItem value="Crop Protection Equipment">Crop Protection Equipment</MenuItem>
                  <MenuItem value="Hay & Forage Equipment">Hay & Forage Equipment</MenuItem>
                  <MenuItem value="Material Handling & Transport Equipment">Material Handling & Transport Equipment</MenuItem>
              </Select>
          </FormControl>

          <Box mt={2} display="flex" flexWrap="wrap">
              {selectedOptions.map((option) => (
                  <Chip
                      key={option}
                      label={option}
                      onDelete={() => handleRemove(option)}
                      deleteIcon={
                          <IconButton size="small">
                              <CloseIcon />
                          </IconButton>
                      }
                      style={{ margin: "5px" }}
                  />
              ))}
          </Box>
      </Box>
  );
};

export default DropdownWithSelectedOptions;