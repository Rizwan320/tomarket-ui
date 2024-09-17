import { useState } from "react";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";

import api from "../../../axios";
import Loader from "components/Loader";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import UploadFile from "layouts/Buyers/components/UploadFile";

const UploadProduct = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleClose = (file) => {
    setFile(file);
  };

  const handleSubmit = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await api.post("products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Card>
        <MDBox p={3}>
          <MDTypography variant="h6" gutterBottom>
            Products
          </MDTypography>
        </MDBox>
        <UploadFile
          onClose={handleClose}
          submitButton={true}
          handleSubmit={() => handleSubmit(file)}
        />
      </Card>
    </>
  );
};

export default UploadProduct;
