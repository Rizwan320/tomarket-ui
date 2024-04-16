import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "muiComponents/LayoutContainers/DashboardLayout";
import DashboardNavbar from "muiComponents/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import BrandsFolder from "layouts/contentOrganization/BrandsFolder";
import { BRAND_DATA } from "layouts/dashboard/components/Brands/data/BrandsData";

const BrandDetail = () => {
  let { id } = useParams();

  const filteredData = useMemo(() => {
    return BRAND_DATA.find((res) => {
      return res.id == id;
    });
  }, [id]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox varient="gradient" py={3}>
        <BrandsFolder name={filteredData?.brandName} />
      </MDBox>
    </DashboardLayout>
  );
};

export default BrandDetail;
