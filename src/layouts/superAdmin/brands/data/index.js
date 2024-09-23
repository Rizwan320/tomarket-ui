import MDTypography from "components/MDTypography";

export const tableAccountData = (accounts) => {
  const Name = ({ name }) => (
    <MDTypography variant="caption" fontWeight="medium">
      {name}
    </MDTypography>
  );

  return {
    columns: [
      { Header: "Brand Name", accessor: "brandName", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
    ],
    rows: accounts?.map((account) => ({
      id: account?.id,
      brandName: <Name name={account?.accountName} />,
      status: <Name name={account?.status} />,
    })),
  };
};
