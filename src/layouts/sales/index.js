import { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "muiComponents/Tables/DataTable";
import UploadFileModal from "layouts/Buyers/components/Modals/UploadFileModal";
import data from "./data";
import { toast } from "react-toastify";
import api from "../../axios";

const Sales = () => {
  const { columns, rows } = data();
  const [open, setOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);

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

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Sales
          </MDTypography>
        </MDBox>
        <MDBox>
          <MDButton variant="contained" color="success" onClick={handleOpen}>
            Upload File
          </MDButton>
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
          showCheckbox={false}
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
