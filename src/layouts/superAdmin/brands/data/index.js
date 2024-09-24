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
      { Header: "# of Connected Distributors", accessor: "connectionCount", align: "center" },
      { Header: "Total Products", accessor: "productCount", align: "center" },
      { Header: "Contact Name", accessor: "userName", align: "left" },
      { Header: "Contact Email", accessor: "email", align: "left" },
    ],
    rows: accounts?.map((account) => ({
      id: account?.accountid,
      brandName: <Name name={account?.brandname || "N/A"} />,
      connectionCount: <Name name={account?.connectioncount || 0} />,
      productCount: <Name name={account?.productcount || 0} />,
      userName: <Name name={account?.username || "N/A"} />,
      email: <Name name={account?.email || "N/A"} />,
    })),
  };
};
