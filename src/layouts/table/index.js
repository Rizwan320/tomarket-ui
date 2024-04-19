import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import Brands from "layouts/dashboard/components/Brands";

const TablePage = () => (
  <MDBox py={3}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Brands />
      </Grid>
    </Grid>
  </MDBox>
);

export default TablePage;
