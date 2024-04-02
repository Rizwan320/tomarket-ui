import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Footer from "layouts/authentication/components/Footer";
import PageLayout from "muiComponents/LayoutContainers/PageLayout";

const BasicLayout = ({ image, children }) => {
  return (
    <PageLayout>
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MDBox px={1} width="100%" sx={{ minHeight: "100vh" }}>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "inherit" }}
        >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer light /> */}
    </PageLayout>
  );
};

export default BasicLayout;
