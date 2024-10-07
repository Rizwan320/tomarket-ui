import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import InfoCard from "muiComponents/Cards/InfoCards/InfoCard";

import api from "../../../axios";
import ChangePasswordModal from "../../Modals/ChangePasswordModal.js";
import Maps from "google/Map";

const SuperAdminDashboard = () => {
  const [totalDistributors, setTotalDistributors] = useState(0);
  const [totalBrands, setTotalBrands] = useState(0);
  const [updatedMarker, setUpdatedMarker] = useState([]);

  useEffect(() => {
    fetchBrands();
    fetchDistributors();
    fetchBuyersLocation();
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
  const fetchBuyersLocation = async () => {
    try {
      const res = await api.get("admin/locations");
      setUpdatedMarker(res?.data);
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
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <MDBox p={2}>
                <Maps data={updatedMarker} />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <ChangePasswordModal />
    </MDBox>
  );
};

export default SuperAdminDashboard;
