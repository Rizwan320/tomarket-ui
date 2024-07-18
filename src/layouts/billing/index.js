import { useState } from "react";
import { Grid, Card } from "@mui/material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import PaymentDialog from "./components/PaymentDialog";

const Billing = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <MDBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Card>
            <MDBox display="flex" justifyContent="space-between" p={3} pb={0}>
              <MDTypography variant="h6" gutterBottom>
                Billing
              </MDTypography>
            </MDBox>
            <MDBox p={3}>
              <MDButton variant="contained" onClick={handleOpen}>
                Open dialog
              </MDButton>
              <PaymentDialog open={open} onClose={handleClose} />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Billing;
