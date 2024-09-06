import { useParams } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { SALES_DUMMY_DATA } from "../data/salesData";

const SaleDetail = () => {
  const { id } = useParams();
  console.log(id);
  const sale = SALES_DUMMY_DATA.find((sale) => sale.id === parseInt(id));

  if (!sale) {
    return <MDTypography variant="h6">Sale not found</MDTypography>;
  }

  return (
    <Card>
      <CardContent>
        <MDTypography variant="h4" gutterBottom mb={10}>
          Sale Details
        </MDTypography>
        <MDBox mb={2}>
          <MDTypography variant="h6">Product Name:</MDTypography>
          <MDTypography variant="body2">{sale.productName}</MDTypography>
        </MDBox>
        <MDBox mb={2}>
          <MDTypography variant="h6">Buyer Name:</MDTypography>
          <MDTypography variant="body2">{sale.buyerName}</MDTypography>
        </MDBox>
        <MDBox mb={2}>
          <MDTypography variant="h6">Distributor:</MDTypography>
          <MDTypography variant="body2">{sale.distributor}</MDTypography>
        </MDBox>
        <MDBox mb={2}>
          <MDTypography variant="h6">Invoice Date:</MDTypography>
          <MDTypography variant="body2">{sale.invoiceDate}</MDTypography>
        </MDBox>
        <MDBox mb={2}>
          <MDTypography variant="h6">Sales Amount:</MDTypography>
          <MDTypography variant="body2">{sale.sales}</MDTypography>
        </MDBox>
      </CardContent>
    </Card>
  );
};

export default SaleDetail;
