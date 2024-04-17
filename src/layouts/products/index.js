import { Grid } from "@mui/material";

import MDBox from "components/MDBox";
import ProductTable from "./ProductTable";
import DashboardLayout from "muiComponents/LayoutContainers/DashboardLayout";
import DashboardNavbar from "muiComponents/Navbars/DashboardNavbar";

const Products = () => (
  <DashboardLayout>
    <DashboardNavbar />
    <MDBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <ProductTable />
        </Grid>
      </Grid>
    </MDBox>
  </DashboardLayout>
);

export default Products;
