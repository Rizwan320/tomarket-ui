import { useState } from "react";
import { Card, CardContent, Divider, Grid, Link } from "@mui/material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import MDButton from "components/MDButton";
import BrandDetailModal from "../Modals/BrandDetailsModal";

const BrandDetailsData = () => {
  const [data, setData] = useState({
    person: {
      email: "usmana@tomarket.farm",
      address: "US",
      phoneNo: "+1234567890",
      role: "distributor",
    },
    business: {
      brandCategory: "Vegatables",
      nameDBA: "To Market",
    },
    url: "https://www.whatchefswant.com/",
    accountHealth: "90%",
    logo: "https://picsum.photos/200/300",
    socialMediaLinks: {
      instagram: "https://www.instagram.com/whatchefswant/",
      twitter: "https://twitter.com/whatchefswant",
      linkedin: "https://www.linkedin.com/in/whatchefswant/",
    },
  });

  const [openModal, setOpenModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const handleUpdatedData = (updatedData) => {
    setOpenModal(false);
    setIsEditable(false);
  };

  return (
    <>
      <Card>
        <CardContent>
          <MDBox
            mt={2}
            mr={2}
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <img
              src={data.logo}
              alt="Logo"
              style={{ width: "80px", height: "80px", borderRadius: "50%" }}
            />
            <MDTypography varient="h5" gutterBottom>
              Add Contact
              <IconButton
                onClick={() => {
                  console.log("Add icon clicked");
                  setOpenModal(true);
                }}
                sx={{ cursor: "pointer" }}
              >
                <AddCircleIcon color="success" />
              </IconButton>
            </MDTypography>
          </MDBox>
          <MDTypography mt={2} color="success" variant="h5" gutterBottom>
            Personal Information
          </MDTypography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="body2">Email: {data?.person?.email}</MDTypography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="body2">Address: {data?.person?.address}</MDTypography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="body2">Phone Number: {data?.person?.phoneNo}</MDTypography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="body2">Role: {data?.person?.role}</MDTypography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <MDTypography color="success" variant="h5" gutterBottom>
            Business Information
          </MDTypography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="body2">
                Brand Category: {data?.business?.brandCategory}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="body2">Name & DBA: {data?.business?.nameDBA}</MDTypography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <MDTypography color="success" variant="h5" gutterBottom>
            Additional Information
          </MDTypography>
          <MDTypography variant="body2">
            URL: <Link href={data.url}>{data?.url}</Link>
          </MDTypography>
          <MDTypography variant="body2">Account Health: {data?.accountHealth}</MDTypography>
          <MDTypography variant="body2">
            Instagram:
            <Link href={data.socialMediaLinks.instagram}>{data?.socialMediaLinks?.instagram}</Link>
          </MDTypography>
          <MDTypography variant="body2">
            Twitter:{" "}
            <Link href={data.socialMediaLinks.twitter}>{data?.socialMediaLinks?.twitter}</Link>
          </MDTypography>
          <MDTypography variant="body2">
            LinkedIn:
            <Link href={data.socialMediaLinks.linkedin}>{data?.socialMediaLinks?.linkedin}</Link>
          </MDTypography>
          <MDBox sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <MDButton
              onClick={() => {
                setIsEditable(true);
                setOpenModal(true);
              }}
              type="button"
              color="success"
              variant="gradient"
              sx={{ mt: 3, mb: 2, mx: 2 }}
            >
              Edit Contact
            </MDButton>
          </MDBox>
        </CardContent>
      </Card>
      {openModal && <BrandDetailModal data={isEditable ? data : ""} sendData={handleUpdatedData} />}
    </>
  );
};

export default BrandDetailsData;
