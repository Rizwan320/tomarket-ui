import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import FolderIcon from "@mui/icons-material/Folder";

function DragDropFile() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    // Perform some operation with the accepted files
    setUploadedFiles(acceptedFiles);

    // Open the folder selection dialog
    setOpenDialog(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Dummy folder list items
  const folderListItems = ["Product pictures", "Logos", "Sales sheets", "Descriptions"];

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFolderSelection = (folder) => {
    // Handle file saving logic here using the selected folder and uploadedFiles state
    console.log("Selected folder:", folder);
    console.log("Uploaded files:", uploadedFiles);

    setSelectedFolder(folder);
    handleCloseDialog();
  };

  return (
    <Container maxWidth="md">
      <MDTypography variant="h4" gutterBottom>
        Product upload and organization
      </MDTypography>
      <Grid container mt={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={7} lg={7}>
          <MDBox
            {...getRootProps({ className: "dropzone" })}
            sx={{
              border: "2px dashed #aaaaaa",
              borderRadius: 1,
              p: 6,
              mb: 3,
              textAlign: "center",
              bgcolor: "background.paper", // Add background color to the dropzone
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

      {/* Modal Dialog for Folder Selection */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{ "& .MuiDialog-paper": { maxWidth: "650px", width: "80%", maxHeight: "90vh" } }}
      >
        <DialogTitle>Select a folder to save the file</DialogTitle>
        <DialogContent>
          <List>
            {folderListItems.map((folder) => (
              <ListItem
                sx={{
                  ":hover": {
                    bgcolor: "#F1F1F1",
                    cursor: "pointer",
                  },
                }}
                key={folder}
                onClick={() => handleFolderSelection(folder)}
              >
                <MDBox mx={2}>
                  <FolderIcon />
                </MDBox>
                <ListItemText px={2} primary={folder} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <Divider variant="contained" />
        <DialogActions>
          <MDButton color="success" variant="contained" onClick={handleCloseDialog}>
            Cancel
          </MDButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default DragDropFile;
