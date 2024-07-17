import { useState } from "react";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";

const FileUploadButton = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log("Selected file:", event.target.files[0]);
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <MDBox mr={2}>
      <MDInput
        accept="image/*,.pdf,.xlsx,.xls"
        style={{ display: "none" }}
        id="file-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <MDButton variant="contained" color="success" component="span">
          Upload File
        </MDButton>
      </label>
      {selectedFile && (
        <MDButton
          type="button"
          color="success"
          variant="gradient"
          sx={{ mr: 2 }}
          name="Refetch Buyers"
          onClick={handleUploadClick}
          style={{ marginLeft: "10px" }}
        >
          Upload
        </MDButton>
      )}
    </MDBox>
  );
};

export default FileUploadButton;
