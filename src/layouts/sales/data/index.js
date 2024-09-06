import MDTypography from "components/MDTypography";

import { SALES_DUMMY_DATA } from "./salesData";

const data = () => {
  const Name = ({ name }) => (
    <MDTypography variant="caption" fontWeight="medium">
      {name}
    </MDTypography>
  );

  return {
    columns: [
      { Header: "Product Name", accessor: "productName", align: "left" },
      { Header: "Buyer Name", accessor: "buyerName", align: "left" },
      { Header: "Distributor", accessor: "distributor", align: "center" },
      { Header: "Sales", accessor: "sales", align: "center" },
      { Header: "Invoice Date", accessor: "invoiceDate", align: "center" },
    ],
    rows: SALES_DUMMY_DATA.map((row) => ({
      id: row.id,
      productName: <Name name={row.productName} />,
      buyerName: <Name name={row.buyerName} />,
      distributor: <Name name={row.distributor} />,
      invoiceDate: <Name name={row.invoiceDate} />,
      sales: <Name name={row.sales} />,
    })),
  };
};

export default data;
