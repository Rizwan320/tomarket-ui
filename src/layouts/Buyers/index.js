import { useState } from "react";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "muiComponents/Tables/DataTable";
import DropdownMenu from "muiComponents/MultiSelectDropdown";
import buyersdata from "layouts/Buyers/components/data";
import MDButton from "components/MDButton";
import api from "../../axios";
import Loader from "components/Loader";
import FileUploadButton from "./components/UploadFileButton";

const COLUMNS = [
  { Header: "Logo", accessor: "logo", align: "left" },
  { Header: "Display Name", accessor: "displayName", align: "center" },
  { Header: "Email", accessor: "email", align: "center" },
  { Header: "Show on Map", accessor: "showOnMap", align: "center" },
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
  const [loading, setLoading] = useState(false);
  const [tableColumns, setTableColumns] = useState(["logo", "displayName", "email", "showOnMap"]);
  const [refresh, setRefresh] = useState(false);
  const { columns, rows } = buyersdata(tableColumns, refresh);

  const refetchBuyers = async () => {
    try {
      setLoading(true);
      const res = await api.get("buyers/refetch-buyer");
      if (res.data) {
        setRefresh(!refresh);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Card>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Buyers
            </MDTypography>
          </MDBox>
          <MDBox
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "space-between",
            }}
          >
            {/* <FileUploadButton /> */}
            <MDButton
              onClick={() => refetchBuyers()}
              type="button"
              color="success"
              variant="gradient"
              sx={{ mr: 2 }}
              name="Refetch Buyers"
            >
              Refetch Buyers
            </MDButton>
            <DropdownMenu
              tableColumns={tableColumns}
              columns={COLUMNS}
              setTableColumns={setTableColumns}
            />
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
    </>
  );
};

export default Buyers;
