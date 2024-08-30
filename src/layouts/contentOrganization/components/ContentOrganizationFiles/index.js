import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { useUser } from "context/userContext";
import { toast } from "react-toastify";
import MDTypography from "components/MDTypography";
import api from "../../../../axios";
import FileCard from "../FileCard";
import { useLocation } from "react-router-dom";

const ContentOrganizationFiles = () => {
  const location = useLocation();
  const { title, endpoint } = location.state || {};

  const {
    user: {
      user: {
        account: { id },
      },
    },
  } = useUser();

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!id) {
      console.error("Account ID is missing.");
      return;
    }

    const fetchFiles = async () => {
      try {
        const response = await api.get(`${endpoint}/${id}`);
        setFiles(response.data || []);
      } catch (error) {
        console.error(`Error fetching ${title.toLowerCase()}:`, error);
        toast.error(error?.response?.data?.message || `Error fetching ${title.toLowerCase()}`);
      }
    };

    fetchFiles();
  }, [id, endpoint, title]);

  const handleDelete = (fileId) => {
    setFiles(files.filter((file) => file.id !== fileId));
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        mt: 4,
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        p: 2,
      }}
    >
      <></>
      <MDTypography variant="h6" gutterBottom sx={{ mb: 2 }}>
        {title}
      </MDTypography>
      {files.length === 0 ? (
        <MDTypography variant="body1">No {title.toLowerCase()} available</MDTypography>
      ) : (
        <Grid container spacing={3} justifyContent="flex-start">
          {files.map((file) => (
            <Grid item key={file.id} xs={12} sm={6} md={4} lg={3}>
              <FileCard fileUrl={file.s3Link} fileId={file.id} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ContentOrganizationFiles;
