import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

export const generateUsersDetailTable = (accounts, handleImpersonate) => {
  const Name = ({ name = "" }) => (
    <MDTypography variant="caption" fontWeight="medium">
      {name}
    </MDTypography>
  );

  const Impersonate = ({ id }) => (
    <MDButton
      variant="contained"
      color="success"
      size="small"
      sx={{ minWidth: "100px", fontSize: "10px" }}
      onClick={() => handleImpersonate(id)}
    >
      Impersonate
    </MDButton>
  );

  return {
    columns: [
      { Header: "User Name", accessor: "userName", align: "left" },
      { Header: "Email", accessor: "email", align: "center" },
      { Header: "", accessor: "actions", align: "center" },
    ],
    rows: accounts?.map((account) => ({
      id: account?.id,
      userName: <Name name={account?.userName} />,
      email: <Name name={account?.email} />,
      actions: <Impersonate id={account?.id} />,
    })),
  };
};
