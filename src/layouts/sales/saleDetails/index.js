import { useParams } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { SALES_DUMMY_DATA } from "../data/salesData";

const SaleDetail = () => {
  const { id } = useParams();
  const sale = SALES_DUMMY_DATA?.find((sale) => sale?.id === parseInt(id));

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
          <MDTypography variant="h6">Product - Quantity</MDTypography>
          {sale?.products?.map((product, index) => (
            <MDTypography key={index} variant="body2">
              {product.productName} - {product.quantity}
            </MDTypography>
          ))}
        </MDBox>
        <MDBox mb={2}>
          <MDTypography variant="h6">Business Name:</MDTypography>
          <MDTypography variant="body2">{sale?.buisnessName}</MDTypography>
        </MDBox>
        <MDBox mb={2}>
          <MDTypography variant="h6">Distributor:</MDTypography>
          <MDTypography variant="body2">{sale?.distributor}</MDTypography>
        </MDBox>
        <MDBox mb={2}>
          <MDTypography variant="h6">Invoice Date:</MDTypography>
          <MDTypography variant="body2">{sale?.invoiceDate}</MDTypography>
        </MDBox>
        <MDBox mb={2}>
          <MDTypography variant="h6">Total Quantity:</MDTypography>
          <MDTypography variant="body2">
            {sale?.products?.reduce((total, product) => total + product.quantity, 0)}
          </MDTypography>
        </MDBox>
      </CardContent>
    </Card>
  );
};

export default SaleDetail;
