import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

const SuperAdminConnections = () => {
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h5" gutterBottom>
            Connections
          </MDTypography>
        </MDBox>
        <MDBox
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <MDBox mr={2}>
            <MDButton variant="contained" color="success">
              Create Connection
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
};

export default SuperAdminConnections;
