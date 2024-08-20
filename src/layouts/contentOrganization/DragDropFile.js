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
import api from "../../axios";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";
import Loader from "components/Loader";

const DragDropFile = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const maxFileLength = 5;

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > maxFileLength) {
      alert(`You can only upload up to ${maxFileLength} files.`);
      return;
    }
    setUploadedFiles(acceptedFiles);
    setOpenDialog(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const folderListItems = ["Product pictures", "Logos", "Sales sheets", "Descriptions"];
  const listItems = ["pictures", "logo"];

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const saveImagesToAwsS3Bucket = async (contentType) => {
    try {
      setLoading(true);
      const {
        user: {
          user: {
            account: { accountType: entityType, id: entityId },
          },
        },
      } = user;

      const formData = new FormData();

      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("contentType", contentType);
      formData.append("entityType", entityType);
      formData.append("entityId", entityId);
      const response = await api.post("content/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const skippedFiles = response?.data?.skippedFiles;
      if (skippedFiles.length > 0) {
        const skippedFilesMessage = `File Already Exists: ${skippedFiles.join(", ")}`;
        toast.warn(skippedFilesMessage);
      }
      if (response?.status === 201 && response?.data?.result.length) {
        toast.success(`${response?.data?.result.length}  Files Uploaded Successfully`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderSelection = (folder) => {
    switch (folder) {
      case folderListItems[0]:
        saveImagesToAwsS3Bucket(listItems[0]);
        break;
      case folderListItems[1]:
        saveImagesToAwsS3Bucket(listItems[1]);
        break;
      case folderListItems[2]:
        break;
      case folderListItems[3]:
        break;
      default:
        break;
    }
    handleCloseDialog();
  };
  return (
    <>
      {loading && <Loader />}
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
                bgcolor: "background.paper",
              }}
            >
              <MDInput {...getInputProps()} />
              <CloudUploadIcon color="success" sx={{ fontSize: "5rem" }} />
              <MDTypography variant="body1">
                Drag and drop files here, or click to select files
              </MDTypography>
              <MDTypography variant="body1">Maximum of {maxFileLength} files</MDTypography>
              <MDButton color="success" variant="contained" sx={{ mt: 2, color: "white" }}>
                Browse Files
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>

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
    </>
  );
};

export default DragDropFile;
