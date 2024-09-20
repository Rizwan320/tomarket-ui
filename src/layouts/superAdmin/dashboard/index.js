import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import InfoCard from "muiComponents/Cards/InfoCards/InfoCard";

import api from "../../../axios";
import ChangePasswordModal from "../../Modals/ChangePasswordModal.js";

const SuperAdminDashboard = () => {
  const [totalDistributors, setTotalDistributors] = useState(0);
  const [totalBrands, setTotalBrands] = useState(0);

  useEffect(() => {
    fetchBrands();
    fetchDistributors();
  }, []);

  const fetchBrands = async () => {
    try {
      const brandsResponse = await api.get("brands");
      setTotalBrands(brandsResponse?.data?.length);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchDistributors = async () => {
    try {
      const distributorsResponse = await api.get("distributors");
      setTotalDistributors(distributorsResponse?.data?.length);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const dashCardData = [
    {
      title: "Total Brands",
      value: `${totalBrands}`,
    },
    {
      title: "Total Distributors",
      value: `${totalDistributors}`,
    },
  ];

  return (
    <MDBox py={3}>
      <Grid container spacing={3}>
        {dashCardData?.map((data, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <InfoCard {...data} />
          </Grid>
        ))}
      </Grid>
      <ChangePasswordModal />
    </MDBox>
  );
};

export default SuperAdminDashboard;
