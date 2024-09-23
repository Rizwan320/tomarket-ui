import MDTypography from "components/MDTypography";

export const tableAccountData = (accounts) => {
  const Name = ({ name }) => (
    <MDTypography variant="caption" fontWeight="medium">
      {name}
    </MDTypography>
  );
  return {
    columns: [
      { Header: "Distributor Name", accessor: "distributorName", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
    ],
    rows: accounts?.map((account) => ({
      id: account?.id,
      distributorName: <Name name={account?.accountName} />,
      status: <Name name={account?.status} />,
    })),
  };
};
