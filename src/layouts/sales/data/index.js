import MDTypography from "components/MDTypography";
import Dropdown from "../../../components/Dropdown";

import { SALES_DUMMY_DATA } from "./salesData";

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
    rows: SALES_DUMMY_DATA?.map((row) => {
      return {
        id: row?.id,
        products: (
          <Dropdown
            options={row?.products?.map((product) => ({
              id: product?.productName,
              productName: product?.productName,
            }))}
            onChange={(value) => console.log(value)}
            placeholder="Select Product"
          />
        ),
        buisnessName: <Name name={row?.buisnessName} />,
        distributor: <Name name={row.distributor} />,
        quantity: <Name name={calculateTotalQuantity(row?.products)} />,
        invoiceDate: <Name name={row?.invoiceDate} />,
      };
    }),
  };
};

export default data;
