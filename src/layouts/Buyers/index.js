import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "muiComponents/Tables/DataTable";
import DropdownMenu from "muiComponents/MultiSelectDropdown";
import buyersdata from "layouts/buyers/components/data";
import MDButton from "components/MDButton";
import api from "../../axios";
import Loader from "components/Loader";
import UploadFileModal from "layouts/buyers/components/Modals/UploadFileModal";

const COLUMNS = [
  { Header: "Logo", accessor: "logo", align: "left" },
  { Header: "Buyer Bussiness Name", accessor: "displayName", align: "center" },
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
  { Header: "Total Sales", accessor: "totalSales", align: "center" },
  { Header: "Recently Ordered Product", accessor: "recentlyOrderedProduct", align: "center" },
  { Header: "SKU", accessor: "sku", align: "center" },
  { Header: "Quantity", accessor: "quantity", align: "center" },
  { Header: "Distributor Name", accessor: "distributorName", align: "center" },
  { Header: "Units Sold Last Week", accessor: "unitsSoldLastWeek", align: "center" },
  { Header: "Units Sold Last Month", accessor: "unitsSoldLastMonth", align: "center" },
];

const BUYER_FILE_HEADERS = [
  {
    id: "displayName",
    displayName: "Bussiness Name",
  },
  {
    id: "email",
    displayName: "Email",
  },
  {
    id: "city",
    displayName: "City",
  },
  {
    id: "line1",
    displayName: "Address",
  },
  {
    id: "postalCode",
    displayName: "PostalCode",
  },
  {
    id: "countrySubDivisionCode",
    displayName: "CountrySubDivisionCode",
  },
  {
    id: "country",
    displayName: "Country",
  },
  {
    id: "totalSales",
    displayName: "Total Sales",
  },
  {
    id: "recentlyOrderedProduct",
    displayName: "recently ordered Product",
  },
  {
    id: "sku",
    displayName: "SKU",
  },
  {
    id: "quantity",
    displayName: "Quantity",
  },
  {
    id: "distributorName",
    displayName: "Distributor Name",
  },
  {
    id: "unitsSoldLastWeek",
    displayName: "Units Sold Last Week",
  },
  {
    id: "unitsSoldLastMonth",
    displayName: "Units Sold Last Month",
  },
];

const Buyers = () => {
  const [loading, setLoading] = useState(false);
  const [tableColumns, setTableColumns] = useState([
    "id",
    // "logo",
    "displayName",
    "recentlyOrderedProduct",
    "sku",
    "quantity",
    "distributorName",
    "unitsSoldLastWeek",
    "unitsSoldLastMonth",
    "totalSales",
    // "email",
    // "showOnMap",
  ]);
  const [refresh, setRefresh] = useState(false);
  const { columns, rows } = buyersdata(tableColumns, refresh);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);

  const handleModalClose = () => setOpen(false);

  const handleClose = (fileData) => setFile(fileData);

  const handleBuyer = (row) => navigate(`/buyer/${row?.id}`);

  const addBuyer = () => navigate("/buyer/add");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await api.post("buyers/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setOpen(false);
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
            {/* <MDBox mr={2}>
              <MDButton variant="contained" color="success" onClick={handleOpen}>
                Upload File
              </MDButton>
            </MDBox> */}

            {/* <MDButton
              onClick={() => addBuyer()}
              type="button"
              color="success"
              variant="gradient"
              sx={{ mr: 2 }}
              name="Add Buyer"
            >
              Add Buyer
            </MDButton> */}
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
            onRowClick={handleBuyer}
          />
        </MDBox>
      </Card>
      {open && (
        <UploadFileModal
          open={open}
          fileName="TM-buyer-upload-template"
          handleClose={handleClose}
          handleModalClose={handleModalClose}
          handleSubmit={handleSubmit}
          columns={BUYER_FILE_HEADERS}
          heading="Download Buyer Template From Here"
        />
      )}
    </>
  );
};

export default Buyers;
