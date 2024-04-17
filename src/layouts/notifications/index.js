import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";

const Notifications = () => {
  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      {name}
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
            <MDBox mb={2} pt={2} px={2} style={{ maxHeight: "1027px", overflow: "auto" }}>
              <MDAlert color="success" dismissible>
                {alertContent(
                  "Matthew Thompson has sold an extra case of Slabbed cut Bacon to Bacon Social House Centennial"
                )}
              </MDAlert>
              <MDAlert color="success" dismissible>
                {alertContent("Snooze Broomfield did NOT reorder Slabbed cut Bacon this week")}
              </MDAlert>
              <MDAlert color="success" dismissible>
                {alertContent("Snooze Arvada order is up 200% this week")}
              </MDAlert>
              <MDAlert color="success" dismissible>
                {alertContent(
                  "_____ At WhatChefsWant has pushed through payment for your delivery"
                )}
              </MDAlert>
              <MDAlert color="success" dismissible>
                {alertContent("Paul Dominguez has a question about: Bacon Ends")}
              </MDAlert>
              <MDAlert color="success" dismissible>
                {alertContent("Sean Beattie is requesting Samples of Maple Smoked Bacon")}
              </MDAlert>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Notifications;
