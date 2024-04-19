import { Grid } from "@mui/material";

import MDBox from "components/MDBox";
import ProductTable from "./ProductTable";

const Products = () => (
  <MDBox py={3}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <ProductTable />
      </Grid>
    </Grid>
  </MDBox>
);

export default Products;
