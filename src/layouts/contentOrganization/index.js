import MDBox from "components/MDBox";
import React from "react";

import BrandsFolder from "./BrandsFolder";
import DragDropFile from "./DragDropFile";

const ContentOrganization = () => (
  <>
    <MDBox py={3}>
      <DragDropFile />
    </MDBox>
    <MDBox varient="gradient" py={3}>
      <BrandsFolder />
    </MDBox>
  </>
);

export default ContentOrganization;
