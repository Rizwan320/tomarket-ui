import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "muiComponents/Tables/DataTable";
import data from "layouts/Buyers/components/data";

const Buyers = () => {
  const { columns, rows } = data();

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Buyers
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={true}
          isSorted={true}
          noEndBorder
          showCheckbox={false}
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
};

export default Buyers;
