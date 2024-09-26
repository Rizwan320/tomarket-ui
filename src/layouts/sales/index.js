import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "muiComponents/Tables/DataTable";
import UploadFileModal from "layouts/buyers/components/Modals/UploadFileModal";
import data from "./data";
import { toast } from "react-toastify";
import api from "../../axios";
import { useUser } from "context/userContext";

const AccountType = Object.freeze({
  BRAND: "brand",
  DISTRIBUTOR: "distributor",
});
const Sales = () => {
  const { columns, rows } = data();
  const [open, setOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const navigate = useNavigate();
  const {
    user: {
      user: {
        account: { accountType },
      },
    },
  } = useUser();

  const handleOpen = (file) => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleClose = (file) => {
    setUploadFile(file);
  };

  const handleSubmit = async () => {
    if (uploadFile) {
      const formData = new FormData();
      formData.append("file", uploadFile);
      try {
        const response = await api.post("sales/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setOpen(false);
      }
    }
  };
  const handleRowClick = (data) => navigate(`/sales/${data.id}`);

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Sales
          </MDTypography>
        </MDBox>
        {accountType === AccountType.DISTRIBUTOR && (
          <MDBox>
            <MDButton variant="contained" color="success" onClick={handleOpen}>
              Upload File
            </MDButton>
          </MDBox>
        )}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={true}
          isSorted={true}
          noEndBorder
          entriesPerPage={false}
          showCheckbox={false}
          onRowClick={handleRowClick}
        />
      </MDBox>
      {open && (
        <UploadFileModal
          open={open}
          fileName="TM-sales-upload-template"
          handleClose={handleClose}
          handleModalClose={handleModalClose}
          handleSubmit={handleSubmit}
          heading="Download Sales Template From Here"
        />
      )}
    </Card>
  );
};

export default Sales;
