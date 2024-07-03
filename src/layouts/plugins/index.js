import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import StoreIcon from "@mui/icons-material/Store";
import WordpressIcon from "@mui/icons-material/Keyboard";
import ShopifyIcon from "@mui/icons-material/ShoppingCart";
import SquarespaceIcon from "@mui/icons-material/Square";
import WixIcon from "@mui/icons-material/Web";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axios";
import { toast } from "react-toastify";

const mapPlugin = ["WIX Store", "Shopify Store", "WordPress Store", "Squarespace Store"];
const erpPlugins = ["Quickbooks Login", "XERO Login"];

const Plugins = () => {
  const navigate = useNavigate();
  const handleClicked = (e, name) => {
    e.preventDefault();
    if (name === "Shopify Store") {
      window.open("https://admin.shopify.com/store/quickstart-26de50cb/apps/map-app-6", "_blank");
    } else if (name === "Quickbooks Login") {
      handleQuickbooksLogin();
    }
    // alert(`Open ${name}`);
  };

  const sendQuickbooksToken = async (payload) => {
    try {
      const tokenResponse = await api.patch("quickbooks/save-quickbooks-token", { payload });
      if (tokenResponse) {
        toast.success("Quickbooiks Login Successfull");
        await api.post("buyers");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleQuickbooksLogin = () => {
    try {
      window.open(process.env.REACT_APP_BASE_URL + "quickbooks/auth", "_blank");
      window.addEventListener("message", (event) => {
        // if (event.origin !== "http://localhost:3001") {
        //   console.error("Invalid origin:", event.origin);
        //   return; // Do not process messages from untrusted origins
        // }
        if (event.data.access_token) {
          sendQuickbooksToken(event.data);
        } else {
          console.log("Received unexpected message format:", event.data);
        }
      });
    } catch (error) {
      console.log("Error fetching auth URI:", error);
    }
  };

  return (
    <Card
    // sx={{ minHeight: "25vh" }}
    >
      <MDBox mx={2} my={2}>
        <MDTypography>ERP Plugins</MDTypography>
      </MDBox>
      <Grid
        container
        spacing={1}
        justifyContent="start"
        alignItems="center"
        // sx={{ minHeight: "inherit" }}
        mx={2}
        my={2}
      >
        {erpPlugins?.map((erp, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
              <MDButton
                type="button"
                onClick={(e) => handleClicked(e, erp)}
                color="success"
                variant="contained"
                startIcon={<WixIcon />}
              >
                {erp}
              </MDButton>
            </Grid>
          );
        })}
      </Grid>
      <MDBox mx={2} my={2}>
        <MDTypography>Map Plugins</MDTypography>
      </MDBox>
      <Grid
        container
        spacing={1}
        justifyContent="start"
        alignItems="center"
        // sx={{ minHeight: "inherit" }}
        mx={2}
        my={2}
      >
        {mapPlugin?.map((map, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4} my={1}>
              <MDButton
                type="button"
                onClick={(e) => handleClicked(e, map)}
                color="success"
                variant="contained"
                startIcon={<WixIcon />}
              >
                {map}
              </MDButton>
            </Grid>
          );
        })}
        {/* <Link
          target="_blank"
          to="https://admin.shopify.com/store/quickstart-26de50cb/apps/map-app-6"
        >
          Shopify Link
        </Link> */}
      </Grid>
    </Card>
  );
};

export default Plugins;
