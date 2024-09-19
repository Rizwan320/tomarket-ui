import { Card, CardContent } from "@mui/material";

import MDTypography from "components/MDTypography";

const InfoCard = ({ title, value, ...rest }) => {
  return (
    <Card
      sx={{
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        minWidth: "100%",
      }}
    >
      <CardContent style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {title && (
          <MDTypography variant="h5" component="h2">
            {title}
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

export default InfoCard;
