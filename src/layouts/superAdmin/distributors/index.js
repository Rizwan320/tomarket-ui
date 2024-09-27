import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "muiComponents/Tables/DataTable";

import { tableAccountData } from "./data";
import { useUser } from "context/userContext";

import api from "../../../axios";
import AddBrandAndDistributor from "../addBrandAndDistributor";

const SuperAdminDistributors = () => {
  const [distributorData, setDistributorData] = useState({ columns: [], rows: [] });
  const { impersonate } = useUser();
  const navigate = useNavigate();

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
      impersonate(response?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handleRowClick = (row) => navigate(`/distributors/${row?.id}/users`);

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
            <MDBox mr={2}>
              <AddBrandAndDistributor accountType="distributor" />
            </MDBox>
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
          onRowClick={handleRowClick}
        />
      </MDBox>
    </Card>
  );
};

export default SuperAdminDistributors;
