import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "muiComponents/Tables/DataTable";
import api from "../../axios";
import { toast } from "react-toastify";

const SuperAdminDashboard = () => {
  const [accountData, setAccountData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get("/accounts");
        const accounts = response?.data;
        setAccountData(tableAccountData(accounts));
      } catch (error) {
        toast.error(error.response?.data?.message || error?.message);
      }
    };

    fetchAccounts();
  }, []);

  const tableAccountData = (accounts) => {
    return {
      columns: [
        { Header: "Account Name", accessor: "accountName", align: "left" },
        { Header: "Account Type", accessor: "accountType", align: "center" },
      ],
      rows: accounts.map((account) => ({
        id: account.id,
        accountName: (
          <MDTypography variant="caption" fontWeight="medium">
            {account.accountName}
          </MDTypography>
        ),
        accountType: (
          <MDTypography variant="caption" fontWeight="medium">
            {account.accountType}
          </MDTypography>
        ),
      })),
    };
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
          isSorted={true}
          noEndBorder
          entriesPerPage={false}
          showCheckbox={false}
        />
      </MDBox>
    </Card>
  );
};

export default SuperAdminDashboard;
