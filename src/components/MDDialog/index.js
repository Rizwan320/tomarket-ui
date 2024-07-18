import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import MDBox from "components/MDBox";

const MDDialog = ({ open, onClose, isDismissOnClick, title, actions, children, ...props }) => {
  return (
    <Dialog open={open} onClose={isDismissOnClick ? onClose : undefined} {...props}>
      <MDBox display="flex" justifyContent="space-between" px={2}>
        <DialogTitle component={"h3"}>{title}</DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </MDBox>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default MDDialog;
