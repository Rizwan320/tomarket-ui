import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "muiComponents/Tables/DataTable";
import DropdownMenu from "muiComponents/MultiSelectDropdown";
import buyersdata from "layouts/Buyers/components/data";
import MDButton from "components/MDButton";
import api from "../../axios";
import Loader from "components/Loader";
import UploadFileModal from "layouts/Buyers/components/Modals/UploadFileModal";

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

const BUYER_FILE_HEADERS = [
  {
    id: "displayName",
    displayName: "DisplayName",
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
];

const Buyers = () => {
  const [loading, setLoading] = useState(false);
  const [tableColumns, setTableColumns] = useState([
    "id",
    "logo",
    "displayName",
    "email",
    "showOnMap",
  ]);
  const [refresh, setRefresh] = useState(false);
  const { columns, rows } = buyersdata(tableColumns, refresh);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);

  const handleModalClose = () => setOpen(false);

  const handleClose = (fileData) => setFile(fileData);

  const handleBuyer = (row) => navigate(`/editBuyer/${row?.id}`);

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
      console.log(error?.message);
      toast.error(error?.message);
    } finally {
      setOpen(false);
    }
  };

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

  const handleRowClicked = (row) => {
    console.log(row);
    navigate("dashboard");
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
            <MDBox mr={2}>
              <MDButton variant="contained" color="success" onClick={handleOpen}>
                Upload File
              </MDButton>
            </MDBox>

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
