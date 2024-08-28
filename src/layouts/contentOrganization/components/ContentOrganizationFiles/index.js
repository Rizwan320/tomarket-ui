import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useUser } from "context/userContext";
import { toast } from "react-toastify";
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

  const [fileUrls, setfileUrls] = useState([]);

  useEffect(() => {
    if (!id) {
      console.error("Account ID is missing.");
      return;
    }

    const fetchFiles = async () => {
      try {
        const response = await api.get(`${endpoint}/${id}`);
        setfileUrls(response.data || []);
      } catch (error) {
        console.error(`Error fetching ${title.toLowerCase()}:`, error);
        toast.error(error?.response?.data?.message || `Error fetching ${title.toLowerCase()}`);
      }
    };

    fetchFiles();
  }, [id, endpoint, title]);

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
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        {title}
      </Typography>
      {fileUrls.length === 0 ? (
        <Typography variant="body1">No {title.toLowerCase()} available</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="flex-start">
          {fileUrls.map((url, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <FileCard fileUrl={url} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ContentOrganizationFiles;
