import { useState } from "react";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "muiComponents/Tables/DataTable";
import DropdownMenu from "muiComponents/MultiSelectDropdown";
import buyersdata from "layouts/Buyers/components/data";
import MDButton from "components/MDButton";
import api from "../../axios";
import Loader from "components/Loader";
import UploadFile from "./components/UploadFile";
import { Modal } from "@mui/material";
import CsvDownloader from "react-csv-downloader";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const columnss = [
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
    displayName: "CountrySubDivisioCode",
  },
];
const buyerTemplate = "Download Buyer Template Form Here";

const datas = [
  // {
  //   displayName: "Usman",
  //   email: "usman@tomarket.farm",
  //   city: "Silicon Valley",
  //   line1: "Nil",
  //   postalCode: "100000",
  //   countrySubDivisionCode: "CA",
  // },
];

const Buyers = () => {
  const [loading, setLoading] = useState(false);
  const [tableColumns, setTableColumns] = useState(["logo", "displayName", "email", "showOnMap"]);
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
      const response = await api.post("file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error.message);
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <MDBox sx={style}>
          <MDBox
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MDBox
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <MDTypography id="modal-title" variant="h6" component="h2">
                {buyerTemplate}
              </MDTypography>
              <CsvDownloader
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  margin: "10px",
                  padding: 12,
                  border: "2px solid",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                filename="TM-buyer-upload-template"
                extension=".xlsx"
                separator=","
                wrapColumnChar=""
                columns={columnss}
                datas={datas}
                text="DOWNLOAD"
              />
            </MDBox>

            <CloseIcon
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "50%",
                  cursor: "pointer",
                },
              }}
              onClick={handleModalClose}
            />
          </MDBox>

          <UploadFile open={open} onClose={handleClose} />
          <MDBox
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <MDButton onClick={handleSubmit} variant="contained" color="success" sx={{ mt: 2 }}>
              Submit
            </MDButton>
          </MDBox>
        </MDBox>
      </Modal>
    </>
  );
};

export default Buyers;
