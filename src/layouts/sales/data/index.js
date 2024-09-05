import MDTypography from "components/MDTypography";

export const SALES_DATA = [];
const data = () => {
  const Amount = ({ amount }) => (
    <MDTypography variant="caption" fontWeight="medium">
      {amount}
    </MDTypography>
  );

  return {
    columns: [
      { Header: "Product Name", accessor: "productName", align: "left" },
      { Header: "Buyer Name", accessor: "buyerName", align: "left" },
      { Header: "Quantity", accessor: "quantity", align: "center" },
      { Header: "Price", accessor: "price", align: "center" },
      { Header: "Invoice Date", accessor: "invoiceDate", align: "center" },
    ],
    rows: SALES_DATA.map((row) => ({
      productName: <Amount amount={row.productName} />,
      buyerName: <Amount amount={row.buyerName} />,
      quantity: <Amount amount={row.quantity} />,
      price: <Amount amount={row.price} />,
      invoiceDate: <Amount amount={row.invoiceDate} />,
    })),
  };
};

export default data;
