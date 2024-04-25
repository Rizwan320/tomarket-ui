import { useState } from "react";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "muiComponents/Tables/DataTable";
import DropdownMenu from "muiComponents/MultiSelectDropdown";
import data from "layouts/Buyers/components/data";

const COLUMNS = [
  { Header: "Logo", accessor: "logo", align: "left" },
  { Header: "Business Name", accessor: "businessName", align: "center" },
  { Header: "Distributor", accessor: "distributor", align: "center" },
  { Header: "Sales Rep", accessor: "salesRep", align: "center" },
  { Header: "Restaurant Type", accessor: "restaurantType", align: "center" },
  { Header: "SKU Purchased", accessor: "skuPurchased", align: "center" },
  { Header: "Average Quantity", accessor: "averageQuantity", align: "center" },
  { Header: "Average Weekly Sales", accessor: "averageWeeklySales", align: "center" },
  { Header: "Weekly Trend", accessor: "weeklyTrend", align: "center" },
  { Header: "Monthly Trend", accessor: "monthlyTrend", align: "center" },
  { Header: "Units Sold Last Week", accessor: "unitsSoldLastWeek", align: "center" },
];

const Buyers = () => {
  const [tableColumns, setTableColumns] = useState([
    "logo",
    "businessName",
    "distributor",
    "salesRep",
  ]);
  const { columns, rows } = data(tableColumns);

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Buyers
          </MDTypography>
        </MDBox>
        <DropdownMenu
          tableColumns={tableColumns}
          columns={COLUMNS}
          setTableColumns={setTableColumns}
        />
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
