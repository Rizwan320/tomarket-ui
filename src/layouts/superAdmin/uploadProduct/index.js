import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";

import api from "../../../axios";
import Loader from "components/Loader";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import UploadFile from "layouts/Buyers/components/UploadFile";
import Dropdown from "components/Dropdown";

const UploadProduct = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [distributors, setDistributors] = useState([]);
  const [selectedDistributor, setSelectedDistributor] = useState(null);

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      const response = await api.get("/distributors");
      setDistributors(response?.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClose = (file) => {
    setFile(file);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please upload a file");
      return;
    }
    if (!selectedDistributor || !selectedDistributor.id) {
      toast.error("Please select a distributor");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("distributorId", selectedDistributor.id);

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
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDTypography variant="h5" gutterBottom>
            Products
          </MDTypography>
          <MDBox width="200px">
            <Dropdown
              options={distributors?.map((dist) => ({
                id: dist?.id,
                productName: dist?.name,
              }))}
              onChange={(id) => {
                setSelectedDistributor(distributors?.find((dist) => dist?.id === id));
              }}
              placeholder="Select Distributor"
            />
          </MDBox>
        </MDBox>
        <MDBox p={3}>
          <UploadFile onClose={handleClose} submitButton={true} handleSubmit={handleSubmit} />
        </MDBox>
      </Card>
    </>
  );
};

export default UploadProduct;
