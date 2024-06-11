import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "layouts/authentication/components/Footer";
import PageLayout from "muiComponents/LayoutContainers/PageLayout";

const BasicLayout = ({ image, children, formType }) => {
  const gridSizes =
    formType === "signup"
      ? { xs: 11, sm: 9, md: 5, lg: 4, xl: 5 }
      : { xs: 11, sm: 9, md: 5, lg: 4, xl: 3 };

  return (
    <PageLayout background="transparent">
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      >
        <MDBox px={1} sx={{ minHeight: "100vh", overflow: "hidden" }}>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "inherit" }}
          >
            <Grid item {...gridSizes}>
              {children}
            </Grid>
          </Grid>
        </MDBox>
        <MDBox
          position="absolute"
          bottom={16}
          right={16}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "8px 12px",
            borderRadius: "4px",
            boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
          }}
        >
          <MDTypography component="span" variant="caption" color="white">
            Powered By&nbsp;
          </MDTypography>
          <MDTypography component="span" variant="caption" fontWeight="medium" color="success">
            ToMarket
          </MDTypography>
        </MDBox>
      </MDBox>
    </PageLayout>
  );
};

export default BasicLayout;
