import { useMemo } from "react";
import { useParams } from "react-router-dom";

import MDBox from "components/MDBox";
import BrandsFolder from "layouts/contentOrganization/BrandsFolder";
import { BRAND_DATA } from "layouts/dashboard/components/Brands/data/BrandsData";
import BrandDetailsData from "layouts/distributor-dashboard/components/brand-details";

const BrandDetail = () => {
  let { id } = useParams();

  const filteredData = useMemo(() => {
    return BRAND_DATA.find((res) => {
      return res.id == id;
    });
  }, [id]);
  return (
    <>
      <MDBox varient="gradient" py={3}>
        <BrandDetailsData name={filteredData?.brandName} />
      </MDBox>
      <MDBox varient="gradient" py={3}>
        <BrandsFolder name={filteredData?.brandName} />
      </MDBox>
    </>
  );
};

export default BrandDetail;
