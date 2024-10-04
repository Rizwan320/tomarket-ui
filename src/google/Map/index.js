import { useState } from "react";

import { Grid, List, ListItem, ListItemText, InputAdornment, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import PlaceIcon from "@mui/icons-material/Place";

import GoogleMaps from "./googleMap";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const Maps = ({ data }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setSelectedBuyer(null);
  };

  const handleBuyerClick = (buyer) => {
    setSelectedBuyer(buyer);
    setSearchValue(buyer?.name);
  };

  const handleResetSearch = () => {
    setSearchValue("");
    setSelectedBuyer(null);
  };

  const filteredData = data?.filter((item) =>
    item?.name?.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <MDBox>
      <Grid container spacing={2}>
        <>
          <Grid item xs={12} md={4}>
            <MDBox display="flex" alignItems="center" position="relative">
              <MDInput
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search Buyers"
                fullWidth
                InputProps={{
                  endAdornment: searchValue && (
                    <InputAdornment position="end">
                      <CancelIcon onClick={handleResetSearch} style={{ cursor: "pointer" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </MDBox>
            <MDBox
              sx={{
                maxHeight: "450px",
                overflowY: "auto",
                marginTop: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              <List>
                {filteredData?.map((buyer) => (
                  <ListItem
                    key={buyer?.id}
                    onClick={() => handleBuyerClick(buyer)}
                    sx={{
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                      px: 2,
                    }}
                  >
                    <ListItemText
                      primary={
                        <MDTypography variant="caption" fontWeight="bold">
                          {buyer?.name}
                        </MDTypography>
                      }
                      secondary={
                        <>
                          {/* <span style={{ fontSize: "12px" }}> */}
                          <PlaceIcon style={{ marginRight: "3px" }} />
                          {buyer?.address}
                          {/* </span> */}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={8}>
            <GoogleMaps
              data={filteredData.map((buyer) => ({
                id: buyer?.id,
                displayName: buyer?.name,
                address: buyer?.address,
                long: buyer?.long,
                lat: buyer?.lat,
              }))}
              selectedBuyer={selectedBuyer}
            />
          </Grid>
        </>
      </Grid>
    </MDBox>
  );
};

export default Maps;
