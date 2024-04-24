import { useState } from "react";
import { Card, CardContent, Grid, Modal } from "@mui/material";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  "::-webkit-scrollbar": {
    width: "0.4em",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  "::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(0,0,0,0.1) white",
};

const BrandDetailModal = ({ data: brandData, sendData }) => {
  const [data, setData] = useState(brandData);
  const [open, setOpen] = useState(true);
  const [isEditable, setIsEditable] = useState(true);

  const handleClose = () => {
    setOpen(false);
    sendData();
  };
  const handleSubmit = () => {
    setOpen(false);
    sendData(data);
  };

  const handleInputChange = () => {};

  return (
    <Modal open={open} onClose={handleClose}>
      <Card sx={modalStyle}>
        <CardContent>
          <MDBox component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MDBox
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <MDTypography variant="h6" gutterBottom>
                    Persons
                  </MDTypography>
                </MDBox>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <MDInput
                      margin="normal"
                      fullWidth
                      label="Email"
                      name="email"
                      autoComplete="email"
                      variant="outlined"
                      value={data?.person?.email}
                      onChange={(e) => {
                        // setData((pre) => {
                        //   return {
                        //     ...pre,
                        //     person: {
                        //       ...pre,
                        //       email: e.target.value,
                        //     },
                        //   };
                        // });
                      }}
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MDInput
                      margin="normal"
                      fullWidth
                      label="Address"
                      name="address"
                      autoComplete="address"
                      variant="outlined"
                      value={data?.person?.address}
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MDInput
                      margin="normal"
                      fullWidth
                      label="Phone No"
                      name="phone"
                      autoComplete="phone"
                      variant="outlined"
                      value={data?.person?.phoneNo}
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MDInput
                      margin="normal"
                      fullWidth
                      label="Role"
                      name="role"
                      autoComplete="role"
                      variant="outlined"
                      value={data?.person?.role}
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <MDTypography variant="h6" gutterBottom>
                  Business
                </MDTypography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <MDInput
                      margin="normal"
                      fullWidth
                      label="Brand category"
                      name="brand_category"
                      autoComplete="brand_category"
                      variant="outlined"
                      value={data?.business?.brandCategory}
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MDInput
                      margin="normal"
                      fullWidth
                      label="Name & DBA"
                      name="name_dba"
                      autoComplete="name_dba"
                      variant="outlined"
                      value={data?.business?.nameDBA}
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <MDTypography variant="h6" gutterBottom>
                  URL
                </MDTypography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MDInput
                      margin="normal"
                      fullWidth
                      label="URL"
                      name="url"
                      autoComplete="url"
                      variant="outlined"
                      value={data?.url}
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <MDTypography variant="h6" gutterBottom>
                  Account Health
                </MDTypography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MDInput
                      margin="normal"
                      fullWidth
                      label="Account Health"
                      name="account_health"
                      autoComplete="account_health"
                      variant="outlined"
                      value={data?.accountHealth}
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <MDTypography variant="h6" gutterBottom>
                  Logo
                </MDTypography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <MDInput
                      margin="normal"
                      fullWidth
                      label="Logo"
                      name="logo"
                      autoComplete="logo"
                      variant="outlined"
                      value={data?.logo}
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <MDTypography variant="h6" gutterBottom>
                  Social Media Links
                </MDTypography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <MDInput
                      margin="normal"
                      fullWidth
                      label="Instagram"
                      name="instagram"
                      autoComplete="instagram"
                      variant="outlined"
                      value={data?.socialMediaLinks?.instagram}
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MDInput
                      margin="normal"
                      fullWidth
                      label="X/Twitter"
                      name="x/twitter"
                      autoComplete="x/twitter"
                      variant="outlined"
                      value={data?.socialMediaLinks?.twitter}
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MDInput
                      margin="normal"
                      fullWidth
                      label="LinkedIn"
                      name="linkedin"
                      autoComplete="linkedin"
                      variant="outlined"
                      value={data?.socialMediaLinks?.linkedin}
                      onChange={handleInputChange}
                      disabled={!isEditable}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <MDBox sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <MDButton type="submit" color="success" variant="gradient" sx={{ mt: 3, mb: 2 }}>
                Save Product
              </MDButton>
              <MDButton
                onClick={handleClose}
                type="button"
                color="success"
                variant="gradient"
                sx={{ mt: 3, mb: 2, mx: 2 }}
              >
                Cancel
              </MDButton>
            </MDBox>
          </MDBox>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default BrandDetailModal;
