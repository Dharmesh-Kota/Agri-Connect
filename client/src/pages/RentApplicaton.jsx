import React, { useState } from "react";
import { Box, MenuItem, FormControl, Select, Chip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const dropdownStyle = {
  margin: "auto",
  width: "80%",
};


const RentApplication = () => {
  const [selectedOption, setSelectedOption] = useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    // Ensure only unique values are added
    setSelectedOption((prev) => {
      const newValues = typeof value === 'string'? value.split(',') : value;
      return [...new Set([...prev, ...newValues])];
    });
  };

  const handleRemove = (deleteOption) => {
    setSelectedOption(selectedOption.filter(option => option !== deleteOption));
  };

  return (
    <>
      <Box style={dropdownStyle}>
        <FormControl fullWidth>
          <Select
            multiple value={selectedOption}
            onChange={handleChange}
            displayEmpty
            renderValue={(selected) => selected.length ?  selected.join(" "): <em>Select Option</em>}
          >
            {/* <MenuItem value="">
              <em>Select Option</em>
            </MenuItem> */}
            <MenuItem value="Compact_Tractors">Compact Tractors</MenuItem>
            <MenuItem value="Plows">Plows</MenuItem>
            <MenuItem value="Seeders">Seeders</MenuItem>
            <MenuItem value="Sprinkler_Systems">Sprinkler Systems</MenuItem>
            <MenuItem value="Combine_Harvester">Combine Harvester</MenuItem>
            <MenuItem value="Sprayers">Sprayers</MenuItem>
            <MenuItem value="Balers">Balers</MenuItem>
          </Select>
        </FormControl>

        {selectedOption.length > 0 && (
          <div>
              <Box display="flex" alignItems="center" mt={2} >
                {selectedOption.map((option) => (
                <Chip
                  label={`Option ${option}`}
                  style= {{margin:"5px"}}
                  onDelete={() => handleRemove(option)}
                  deleteIcon={
                    <IconButton size="small">
                      <CloseIcon />
                    </IconButton>
                  }
                  color="primary"
                />
                ))}
              </Box>
          </div>
        )}
      </Box>
    </>
  );
};

export default RentApplication;
