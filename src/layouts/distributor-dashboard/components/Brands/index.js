import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "muiComponents/Tables/DataTable";
import MDButton from "components/MDButton";

import data from "layouts/dashboard/components/Brands/data";

const Brands = () => {
  const { columns, rows } = data();
  let navigate = useNavigate();

  const handleRowClick = (row) => navigate(`/brand-detail/${row?.id}`);

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Vendors
          </MDTypography>
        </MDBox>
        <MDBox color="text" px={2}>
          <MDButton variant="gradient" color="success" size="small">
            Invite Vendors
          </MDButton>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={true}
          isSorted={true}
          noEndBorder
          entriesPerPage={false}
          onRowClick={handleRowClick}
        />
      </MDBox>
    </Card>
  );
};

export default Brands;
