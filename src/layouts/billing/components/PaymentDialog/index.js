import { ListItemText, Stack } from "@mui/material";

import MDDialog from "components/MDDialog";
import PaymentForm from "./PaymentForm";

const PaymentDialog = ({ title, open, onClose, onSubmit }) => {
  return (
    <MDDialog title="PAYMENT DETAILS" open={open} onClose={onClose}>
      <Stack direction="column" spacing={2}>
        {title}
        <PaymentForm onSubmit={onSubmit} />
      </Stack>
    </MDDialog>
  );
};

export default PaymentDialog;
