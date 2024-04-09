import { Card, CardContent, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const DashBoardInfoCard = ({ title, value, trend: arrow, name }) => {
  // Handlers to change the trend
  const handleTrendUp = () => {
    console.log(`arrow up clicked for ${title}`);
  };

  const handleTrendDown = () => {
    console.log(`arrow down clicked for ${title}`);
  };

  return (
    <Card sx={{ height: "130px" }}>
      <CardContent>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          {title && (
            <MDTypography color="textSecondary" gutterBottom>
              {title}
            </MDTypography>
          )}
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
      </CardContent>
    </Card>
  );
};

export default DashBoardInfoCard;
