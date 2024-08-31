import { Grid } from "@mui/material";

import MDBox from "components/MDBox";

const Sales = () => {
  return (
    <MDBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          {/* <ProductTable /> */}
          Sales Work!
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Sales;
