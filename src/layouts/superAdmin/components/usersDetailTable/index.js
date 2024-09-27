import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

export const usersDetailTable = (users, handleImpersonate) => {
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
    rows: users?.map((user) => ({
      id: user?.id,
      userName: <Name name={user?.userName} />,
      email: <Name name={user?.email} />,
      actions: <Impersonate id={user?.id} />,
    })),
  };
};
