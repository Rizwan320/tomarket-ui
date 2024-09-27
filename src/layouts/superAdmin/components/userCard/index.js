import { Card } from "@mui/material";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "muiComponents/Tables/DataTable";

const UserCard = ({ userData }) => (
  <Card>
    <MDBox p={3}>
      <MDTypography variant="h5" gutterBottom>
        Users
      </MDTypography>
    </MDBox>
    <MDBox>
      <DataTable
        table={userData}
        showTotalEntries={true}
        isSorted={false}
        noEndBorder
        entriesPerPage={false}
      />
    </MDBox>
  </Card>
);

export default UserCard;
