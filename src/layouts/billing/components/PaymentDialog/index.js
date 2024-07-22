import { ListItemText, Stack } from "@mui/material";

import MDDialog from "components/MDDialog";
import PaymentForm from "./PaymentForm";

const PaymentDialog = ({ open, onClose, onSubmit }) => {
  return (
    <MDDialog title="PAYMENT DETAILS" open={open} onClose={onClose}>
      <Stack direction="column" spacing={2}>
        <ListItemText
          sx={{ textAlign: "center" }}
          primary="Please add payment details to start a free trail."
          secondary="Free for 1 month, then $11.99 per month after."
        />
        <PaymentForm onSubmit={onSubmit} />
      </Stack>
    </MDDialog>
  );
};

export default PaymentDialog;
