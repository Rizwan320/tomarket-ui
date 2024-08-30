import { useState } from "react";
import { toast } from "react-toastify";
import { Card, CardMedia, Tooltip, IconButton } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import { saveAs } from "file-saver";
import { FileIcon, defaultStyles } from "react-file-icon";

import api from "../../../../axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ConfirmationDialog from "../Modals";

const getFileType = (fileUrl) => {
  const extension = fileUrl.split(".").pop().toLowerCase();
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "webp":
    case "png":
      return null;
    default:
      return extension;
  }
};

const getFileName = (fileUrl) => {
  return decodeURIComponent(new URL(fileUrl).pathname.split("/").pop());
};

const FileCard = ({ fileUrl, fileId, onDelete }) => {
  const fileType = getFileType(fileUrl);
  const fileName = getFileName(fileUrl);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = () => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownloadClick = async (event) => {
    event.stopPropagation();
    try {
      const response = await fetch(fileUrl, { headers: { "Cache-Control": "no-cache" } });
      if (!response?.ok) {
        throw new Error("Failed to fetch Files");
      }

      const pathSegments = decodeURIComponent(new URL(fileUrl).pathname).split("/");
      const fileName = pathSegments[pathSegments.length - 1];
      const blob = await response.blob();
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error downloading the file:", error);
      toast.error("Error downloading the file");
    }
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDialogOpen(false);
    try {
      await api.delete(`/content/${fileId}`);
      onDelete(fileId);
      toast.success("File deleted successfully");
    } catch (error) {
      console.error("Error deleting the file:", error);
      toast.error("Error deleting the file");
    }
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: 3,
          p: 1,
          margin: 0,
          cursor: "pointer",
        }}
        onClick={handleCardClick}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {fileType ? (
            <MDBox
              variant="contained"
              bgColor="transparent"
              color="dark"
              sx={{
                height: "100%",
                display: "flex-start",
                alignItems: "center",
                justifyContent: "center",
                p: 9,
                zIndex: 1,
              }}
            >
              <FileIcon extension={fileType} {...defaultStyles[fileType]} />
            </MDBox>
          ) : (
            <CardMedia
              component="img"
              image={fileUrl}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                margin: 0,
                zIndex: 1,
              }}
            />
          )}
        </div>
        <MDBox
          variant="contained"
          bgColor="grey-400"
          color="white"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            display: "flex",
            width: "100%",
            height: "30px",
            padding: { xs: "0 4px", sm: "0 8px" },
            borderRadius: "4px",
            whiteSpace: "nowrap",
            zIndex: 2,
          }}
        >
          <MDTypography
            variant="body2"
            sx={{
              width: "100%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {fileName}
          </MDTypography>
        </MDBox>
        <Tooltip title="Download">
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              zIndex: 3,
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "#A9A9A9",
              },
              p: 1,
            }}
            onClick={handleDownloadClick}
          >
            <CloudDownloadIcon sx={{ color: "#D3D3D3" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 3,
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "#A9A9A9",
              },
              p: 1,
            }}
            onClick={handleDeleteClick}
          >
            <DeleteIcon sx={{ color: "#D3D3D3" }} />
          </IconButton>
        </Tooltip>
      </Card>

      <ConfirmationDialog
        isOpen={dialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default FileCard;
