import React from "react";
import { Card, CardMedia, Tooltip, IconButton } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { saveAs } from "file-saver";

const ImageCard = ({ imageUrl }) => {
  const handleCardClick = () => {
    window.open(imageUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownloadClick = async (event) => {
    event.stopPropagation();
    try {
      const response = await fetch(imageUrl, { headers: { "Cache-Control": "no-cache" } });
      if (!response?.ok) {
        throw new Error("Failed to fetch image");
      }

      const pathSegments = decodeURIComponent(new URL(imageUrl).pathname).split("/");
      const fileName = pathSegments[pathSegments.length - 1];
      const blob = await response.blob();
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <Card
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflow: "hidden",
        boxShadow: 3,
        p: 1,
        margin: 0,
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        image={imageUrl}
        alt="Image"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          margin: 0,
        }}
      />
      <Tooltip title="Download">
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            zIndex: 1,
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
    </Card>
  );
};

export default ImageCard;
