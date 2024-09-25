import { Grid } from "@mui/material";

import MDBox from "components/MDBox";
import Brands from "layouts/dashboard/components/Brands";
import { useUser } from "context/userContext";

import ChangePasswordModal from "../Modals/ChangePasswordModal.js";

const DistributorDashboard = () => {
  const {
    user: { isImpersonating },
  } = useUser();

  return (
    <MDBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Brands />
        </Grid>
      </Grid>
      {!isImpersonating && <ChangePasswordModal />}
    </MDBox>
  );
};

export default DistributorDashboard;
