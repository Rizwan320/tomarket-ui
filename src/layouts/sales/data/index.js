import MDTypography from "components/MDTypography";

import { SALES_DUMMY_DATA } from "./salesData";
import ProductDropdown from "../components/Dropdown";

const data = () => {
  const Name = ({ name = "" }) => (
    <MDTypography variant="caption" fontWeight="medium">
      {name}
    </MDTypography>
  );

  const calculateTotalQuantity = (products) =>
    products?.reduce((total, product) => total + (product?.quantity || 0), 0);

  return {
    columns: [
      { Header: "Products Name", accessor: "products", align: "left" },
      { Header: "Business Name", accessor: "buisnessName", align: "left" },
      { Header: "Distributor", accessor: "distributor", align: "center" },
      { Header: "Quantity", accessor: "quantity", align: "center" },
      { Header: "Invoice Date", accessor: "invoiceDate", align: "center" },
    ],
    rows: SALES_DUMMY_DATA?.map((row) => ({
      id: row.id,
      products: <ProductDropdown products={row?.products} />,
      buisnessName: <Name name={row?.buisnessName} />,
      distributor: <Name name={row.distributor} />,
      quantity: <Name name={calculateTotalQuantity(row?.products)} />, // Show total quantity
      invoiceDate: <Name name={row?.invoiceDate} />,
    })),
  };
};

export default data;
