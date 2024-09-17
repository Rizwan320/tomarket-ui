import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "muiComponents/Tables/DataTable";
import api from "../../axios";
import { toast } from "react-toastify";
import { tableAccountData } from "./data";

const SuperAdminDashboard = () => {
  const [accountData, setAccountData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get("/accounts");
        const accounts = response?.data;
        setAccountData(tableAccountData(accounts, handleImpersonate));
      } catch (error) {
        toast.error(error.response?.data?.message || error?.message);
      }
    };

    fetchAccounts();
  }, []);

  const handleImpersonate = (accountId) => {};

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Accounts
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={accountData}
          showTotalEntries={true}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
};

export default SuperAdminDashboard;
