import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import DataTable from "muiComponents/Tables/DataTable";
import MDTypography from "components/MDTypography";

import { useUser } from "context/userContext";
import { tableAccountData } from "./data";

import api from "../../../axios";
import AddBrandAndDistributor from "../addBrandAndDistributor";

const SuperAdminBrands = () => {
  const [brandData, setBrandData] = useState({ columns: [], rows: [] });
  const { AdminData } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await api.get("accounts/brands");
      const accounts = response?.data;
      setBrandData(tableAccountData(accounts, handleImpersonate));
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

  const handleRowClick = (row) => navigate(`/brands/${row?.id}/users`);

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h5" gutterBottom>
            Brands
          </MDTypography>
        </MDBox>
        <MDBox
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <MDBox mr={2}>
            <AddBrandAndDistributor accountType="brand" />
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={brandData}
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

export default SuperAdminBrands;
