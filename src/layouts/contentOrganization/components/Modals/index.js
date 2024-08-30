import React from "react";
import { Card, CardContent, Modal, IconButton } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  p: 6,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
};

const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Card sx={modalStyle}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "primary",
            zIndex: 10,
          }}
        >
          <ClearOutlinedIcon />
        </IconButton>
        <CardContent>
          <MDBox sx={{ mb: 5, mt: 3 }}>
            <MDTypography variant="h6" sx={{ fontSize: "20px" }}>
              Are you sure you want to delete this file?
            </MDTypography>
          </MDBox>
          <MDBox sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <MDButton
              onClick={onConfirm}
              color="success"
              variant="contained"
              sx={{
                fontSize: "14px",
                px: 4,
                py: 2,
                mr: 2,
              }}
            >
              Yes
            </MDButton>
            <MDButton
              onClick={onClose}
              color="error"
              variant="contained"
              sx={{
                fontSize: "14px",
                px: 4,
                py: 2,
              }}
            >
              No
            </MDButton>
          </MDBox>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ConfirmationDialog;
