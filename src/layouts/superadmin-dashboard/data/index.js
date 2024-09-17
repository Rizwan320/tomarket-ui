import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

export const tableAccountData = (accounts, handleImpersonate) => {
  return {
    columns: [
      { Header: "Account Name", accessor: "accountName", align: "left" },
      { Header: "Account Type", accessor: "accountType", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "", accessor: "actions", align: "center" },
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
      status: (
        <MDTypography variant="caption" fontWeight="medium">
          {account.status}
        </MDTypography>
      ),
      actions: (
        <MDButton
          variant="contained"
          color="success"
          size="small"
          sx={{ minWidth: "100px", fontSize: "10px" }}
          disabled={account.status !== "active"}
          onClick={() => handleImpersonate(account.id)}
        >
          Impersonate
        </MDButton>
      ),
    })),
  };
};
