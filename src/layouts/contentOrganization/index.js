import MDBox from "components/MDBox";
import React from "react";

import BrandsFolder from "./BrandsFolder";
import DragDropFile from "./DragDropFile";
import DashboardLayout from "muiComponents/LayoutContainers/DashboardLayout";
import DashboardNavbar from "muiComponents/Navbars/DashboardNavbar";

const ContentOrganization = () => (
  <DashboardLayout>
    <DashboardNavbar />
    <MDBox py={3}>
      <DragDropFile />
    </MDBox>
    <MDBox varient="gradient" py={3}>
      <BrandsFolder />
    </MDBox>
  </DashboardLayout>
);

export default ContentOrganization;
