import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "muiComponents/Tables/DataTable";
import api from "../../axios";
import { toast } from "react-toastify";
import { tableAccountData } from "./data";
import { useUser } from "context/userContext";

const SuperAdminDashboard = () => {
  const [accountData, setAccountData] = useState({ columns: [], rows: [] });
  const { AdminData } = useUser();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await api.get("/accounts");
      const accounts = response?.data;
      setAccountData(tableAccountData(accounts, handleImpersonate));
    } catch (error) {
      toast.error(error.response?.data?.message || error?.message);
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
