import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";

import { Grid, Card } from "@mui/material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { tableConnectedBrandData } from "./data";
import DataTable from "muiComponents/Tables/DataTable";

import api from "../../axios";
import ChangePasswordModal from "../Modals/ChangePasswordModal.js";

const DistributorDashboard = () => {
  const [connectionDetails, setConnectionDetails] = useState({ columns: [], rows: [] });
  const {
    user: { isImpersonating },
  } = useUser();

  useEffect(() => {
    fetchConnectionDetails();
  }, []);

  const fetchConnectionDetails = async () => {
    try {
      const { data } = await api.get("connections/distributor");
      setConnectionDetails(tableConnectedBrandData(data));
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <MDBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Card>
            <MDBox display="flex" p={3}>
              <MDTypography variant="h5" gutterBottom>
                Connected Brands
              </MDTypography>
            </MDBox>
            <MDBox>
              <DataTable
                table={connectionDetails}
                showTotalEntries={true}
                isSorted={false}
                noEndBorder
                entriesPerPage={false}
              />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
      {!isImpersonating && <ChangePasswordModal />}
    </MDBox>
  );
};

export default DistributorDashboard;
