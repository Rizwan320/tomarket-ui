import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "muiComponents/Tables/DataTable";
import { useNavigate } from "react-router-dom";
import salesRepData from "./sales-rep-data";

const SalesRep = () => {
  const { columns, rows } = salesRepData();
  let navigate = useNavigate();

  const handleRowClick = (row) => {
    // navigate(`/payment-detail/${row?.invoiceNumber}`);
    console.log(row);
  };
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Sales Rep
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={true}
          isSorted={true}
          canSearch={false}
          noEndBorder
          entriesPerPage={false}
          onRowClick={handleRowClick}
        />
      </MDBox>
    </Card>
  );
};

export default SalesRep;
