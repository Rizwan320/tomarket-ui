import { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";

import api from "../../../axios";
import Loader from "components/Loader";
import { Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const UploadProduct = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleFileBrowse = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
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
        <Grid container mt={3} padding={10} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <MDBox
              {...getRootProps({ className: "dropzone" })}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{
                border: "2px dashed #aaaaaa",
                borderRadius: 1,
                p: 8,
                mb: 3,
                textAlign: "center",
                bgcolor: "background.paper",
              }}
            >
              <MDInput {...getInputProps()} />
              {fileName && <MDTypography variant="body1">{fileName}</MDTypography>}

              <CloudUploadIcon color="success" sx={{ fontSize: "5rem" }} />
              <MDTypography variant="body1">
                Drag and drop files here, or click to select files
              </MDTypography>
              <MDInput
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <MDButton
                color="success"
                variant="contained"
                onClick={handleFileBrowse}
                sx={{ mt: 2, color: "white" }}
              >
                Browse Files
              </MDButton>
            </MDBox>
            <MDBox display="flex" justifyContent="center" mt={3}>
              <MDButton onClick={handleSubmit} variant="contained" color="success">
                Submit
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default UploadProduct;
