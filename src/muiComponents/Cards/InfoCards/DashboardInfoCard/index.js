import { Card, CardContent, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const DashBoardInfoCard = ({ title, value, trend: arrow, name, previousSale }) => {
  const handleTrendUp = () => {
    console.log(`arrow up clicked for ${title}`);
  };

  const handleTrendDown = () => {
    console.log(`arrow down clicked for ${title}`);
  };

  return (
    <Card
      sx={{
        height: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          {title && <MDTypography gutterBottom>{title}</MDTypography>}
          {arrow && (
            <MDBox>
              <IconButton onClick={handleTrendUp}>
                <ArrowUpwardIcon color="disabled" />
              </IconButton>
              <IconButton onClick={handleTrendDown}>
                <ArrowDownwardIcon color="disabled" />
              </IconButton>
            </MDBox>
          )}
        </MDBox>
        {name && (
          <MDTypography variant="h5" component="h2">
            {name}
          </MDTypography>
        )}
        {value && (
          <MDTypography variant="h7" component="h5">
            {value}
          </MDTypography>
        )}
        {arrow && (
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="lightgray"
          >
            <MDBox>
              {title === "Total Monthly Sales" ? (
                <MDTypography fontWeight="regular">Previous Month:</MDTypography>
              ) : (
                <MDTypography fontWeight="regular">Previous Week:</MDTypography>
              )}
            </MDBox>
            <MDBox display="flex" alignItems="center">
              <MDTypography
                variant="h5"
                component="h2"
                fontWeight="medium"
                color={arrow === "down" ? "error" : "success"}
              >
                {arrow === "down" ? previousSale + "%" : "+" + previousSale + "%"}
              </MDTypography>
              {arrow === "down" ? (
                <IconButton sx={{ padding: 0 }}>
                  <ArrowDownwardIcon color="error" />
                </IconButton>
              ) : (
                <IconButton sx={{ padding: 0 }}>
                  <ArrowUpwardIcon color="success" />
                </IconButton>
              )}
            </MDBox>
          </MDBox>
        )}
      </CardContent>
    </Card>
  );
};

export default DashBoardInfoCard;
