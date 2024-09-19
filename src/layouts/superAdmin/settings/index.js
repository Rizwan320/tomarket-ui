import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const SuperAdminSettings = () => {
  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h5" gutterBottom>
          Settings
        </MDTypography>
      </MDBox>
    </Card>
  );
};

export default SuperAdminSettings;
