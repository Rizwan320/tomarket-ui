import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "muiComponents/Tables/DataTable";

import api from "../../../axios";
import { tableAccountData } from "./data";
import { useUser } from "context/userContext";

const SuperAdminDistributors = () => {
  const [distributorData, setDistributorData] = useState({ columns: [], rows: [] });
  const { AdminData } = useUser();
  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      const response = await api.get("accounts/distributors");
      const accounts = response?.data;
      setDistributorData(tableAccountData(accounts, handleImpersonate));
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleImpersonate = async (id) => {
    try {
      const response = await api.get("/admin/user", {
        params: { id },
      });
      AdminData(response?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h5" gutterBottom>
            Distributors
          </MDTypography>
        </MDBox>
        <MDBox
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <MDBox mr={2}>
            <MDButton variant="contained" color="success">
              Add Distributor
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={distributorData}
          showTotalEntries={true}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
};

export default SuperAdminDistributors;
