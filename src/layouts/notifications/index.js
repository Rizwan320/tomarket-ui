import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";

function Notifications() {
  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      A simple {name} alert with{" "}
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </MDTypography>
      . Give it a click if you like.
    </MDTypography>
  );

  return (
    <MDBox mb={3}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={12}>
          <Card>
            <MDBox p={2}>
              <MDTypography variant="h5">Notifications</MDTypography>
            </MDBox>
            <MDBox pt={2} px={2} style={{ maxHeight: "1027px", overflow: "auto" }}>
              <MDAlert color="success" dismissible>
                {alertContent("notification for to market")}
              </MDAlert>
              <MDAlert color="success" dismissible>
                {alertContent("second notification")}
              </MDAlert>
              <MDAlert color="success" dismissible>
                {alertContent("third notification")}
              </MDAlert>
              <MDAlert color="success" dismissible>
                {alertContent("fourth notification")}
              </MDAlert>
              <MDAlert color="success" dismissible>
                {alertContent("fifth notification")}
              </MDAlert>
              <MDAlert color="success" dismissible>
                {alertContent("sixth notification")}
              </MDAlert>
              <MDAlert color="success" dismissible>
                {alertContent("seventh notification")}
              </MDAlert>
              <MDAlert color="success" dismissible>
                {alertContent("eighth notification")}
              </MDAlert>
              <MDAlert color="success" dismissible>
                {alertContent("eighth notification")}
              </MDAlert>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Notifications;
