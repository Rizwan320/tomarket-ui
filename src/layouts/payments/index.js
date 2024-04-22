import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "muiComponents/Tables/DataTable";
import data from "layouts/payments/components/data";

const Payments = () => {
  const { columns, rows } = data();
  let navigate = useNavigate();

  const handleRowClick = (row) => navigate(`/payment-detail/${row?.invoiceNumber}`);

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Payments
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={true}
          isSorted={true}
          canSearch={true}
          noEndBorder
          entriesPerPage={false}
          onRowClick={handleRowClick}
        />
      </MDBox>
    </Card>
  );
};

export default Payments;
