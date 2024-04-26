import React, { useState } from "react";
import { Button, Menu, MenuItem, ListItemText, Checkbox } from "@mui/material";
import { Select } from "@mui/material";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";

function DropdownMenu({ setTableColumns, tableColumns, columns = [] }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selected, setSelected] = useState(tableColumns);

  const options = columns.map((column) => ({
    label: column?.Header || column?.title,
    value: column?.accessor || column?.title,
    alignment: column?.align,
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelected(typeof value === "string" ? value.split(",") : value);
    setTableColumns(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <MDBox sx={{ cursor: "pointer" }} onClick={handleClick}>
        <Icon fontSize="default">menu</Icon>
      </MDBox>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <Select
          multiple
          value={selected}
          onChange={handleSelect}
          renderValue={() => null}
          MenuProps={{
            anchorEl: anchorEl,
            open: open,
            onClose: handleClose,
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            PaperProps: {
              style: {
                maxHeight: "400px",
                overflow: "auto",
              },
            },
          }}
          style={{ padding: "10px 0" }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value} style={{ margin: "5px 0" }}>
              <Checkbox checked={selected.includes(option.value)} />
              <ListItemText
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "14px",
                  },
                }}
                primary={option.label}
              />
            </MenuItem>
          ))}
        </Select>
      </Menu>
    </div>
  );
}

export default DropdownMenu;
