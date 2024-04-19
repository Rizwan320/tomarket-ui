import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import MetaTags from "react-meta-tags";

import Vector from "./VectorMaps";

const MapsVector = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} lg={12} sm={12}>
      <Card>
        <CardContent>
          <Typography sx={{ marginBottom: "16px" }} variant="h5" component="div">
            USA Map
          </Typography>
          <Box id="usa" className="vector-map-height">
            <Vector value="us_aea" width="100%" color="rgb(221, 221, 221)" />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default MapsVector;
