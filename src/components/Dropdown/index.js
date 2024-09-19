import { useState } from "react";

import { MenuItem, Select } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import MDTypography from "components/MDTypography";

const Dropdown = ({ options, onChange, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]?.id || "");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      fullWidth
      displayEmpty
      IconComponent={ArrowDropDownIcon}
      variant="filled"
      disableUnderline
      renderValue={(selected) => (
        <MDTypography variant="caption" fontWeight="medium">
          {options?.find((option) => option?.id === selected)?.productName || placeholder}
          <ArrowDropDownIcon style={{ verticalAlign: "middle", marginLeft: 8 }} />
        </MDTypography>
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {options?.map((option) => (
        <MenuItem key={option?.id} value={option?.id}>
          <MDTypography variant="caption" fontWeight="medium">
            {option?.productName}
          </MDTypography>
        </MenuItem>
      ))}
    </Select>
  );
};

export default Dropdown;
