import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import MetaTags from "react-meta-tags";

import Vector from "./VectorMaps";

const MapsVector = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Grid spacing={3}>
          <Grid item lg={12} sm={12}>
            <Card>
              <CardContent>
                <Typography sx={{ marginBottom: "16px" }} variant="h5" component="div">
                  USA Map
                </Typography>
                <Box id="usa" className="vector-map-height">
                  <Vector value="us_aea" width="500" color="rgb(221, 221, 221)" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default MapsVector;
