import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Container, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

const UploadFile = ({ open, onClose }) => {
  const [uploadedFiles, setUploadedFiles] = useState();

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles(acceptedFiles);
    readFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const readFile = async (file) => {
    onClose(file);
  };

  return (
    <Container maxWidth="lg">
      <Grid container mt={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={9} lg={9}>
          {uploadedFiles && <MDTypography>{uploadedFiles[0]?.path}</MDTypography>}
          <MDBox
            {...getRootProps({ className: "dropzone" })}
            sx={{
              border: "2px dashed #aaaaaa",
              borderRadius: 1,
              p: 6,
              mb: 3,
              textAlign: "center",
              bgcolor: "background.paper",
            }}
          >
            <MDInput {...getInputProps()} />
            <CloudUploadIcon color="success" sx={{ fontSize: "5rem" }} />
            <MDTypography variant="body1">
              Drag and drop files here, or click to select files
            </MDTypography>
            <MDButton color="success" variant="contained" sx={{ mt: 2, color: "white" }}>
              Browse Files
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UploadFile;
