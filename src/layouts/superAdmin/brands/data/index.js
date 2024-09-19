import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

export const tableAccountData = (accounts, handleImpersonate) => {
  const Name = ({ name }) => {
    return (
      <MDTypography variant="caption" fontWeight="medium">
        {name}
      </MDTypography>
    );
  };

  const Impersonate = ({ status, id }) => {
    return (
      <MDButton
        variant="contained"
        color="success"
        size="small"
        sx={{ minWidth: "100px", fontSize: "10px" }}
        disabled={status !== "active"}
        onClick={() => handleImpersonate(id)}
      >
        Impersonate
      </MDButton>
    );
  };

  return {
    columns: [
      { Header: "Brand Name", accessor: "brandName", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "", accessor: "actions", align: "center" },
    ],
    rows: accounts?.map((account) => ({
      id: account?.id,
      brandName: <Name name={account?.accountName} />,
      status: <Name name={account?.status} />,
      actions: <Impersonate status={account?.status} id={account?.id} />,
    })),
  };
};
