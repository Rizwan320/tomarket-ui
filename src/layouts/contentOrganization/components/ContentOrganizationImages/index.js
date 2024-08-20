import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useUser } from "context/userContext";
import { toast } from "react-toastify";
import api from "../../../../axios";
import ImageCard from "../ImageCard";
import { useLocation } from "react-router-dom";

const ContentOrganizationImages = () => {
  const location = useLocation();
  const { title, endpoint } = location.state || {};

  const user = useUser();
  const accountId = user?.user?.user?.account?.id;

  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (!accountId) {
      console.error("Account ID is missing.");
      return;
    }

    const fetchImages = async () => {
      try {
        const response = await api.get(`${endpoint}/${accountId}`);
        setImageUrls(response.data || []);
      } catch (error) {
        console.error(`Error fetching ${title.toLowerCase()}:`, error);
        toast.error(error?.response?.data?.message || `Error fetching ${title.toLowerCase()}`);
      }
    };

    fetchImages();
  }, [accountId, endpoint, title]);

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
      {imageUrls.length === 0 ? (
        <Typography variant="body1">No {title.toLowerCase()} available</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="flex-start">
          {imageUrls.map((url, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <ImageCard imageUrl={url} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ContentOrganizationImages;
