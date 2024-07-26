import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";

import MDBox from "components/MDBox";
import SalesChart from "muiComponents/Charts/ApexChart";
import MapsVector from "muiComponents/Maps";
import Notifications from "layouts/notifications";
import DashBoardInfoCard from "muiComponents/Cards/InfoCards/DashboardInfoCard";
import DropdownMenu from "muiComponents/MultiSelectDropdown";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
import api from "../../axios";
import PaymentDialog from "layouts/billing/components/PaymentDialog";
import { useUser } from "context/userContext";
import AddPaymnetAlert from "./components/AddPaymnetAlert";
import VerifyPaymnetAlert from "./components/VerifyPaymentAlert";

const cardData = [
  { title: "Total Weekly Sales", value: "$10,000", trend: "up", previousSale: "6" },
  { title: "Total Monthly Sales", value: "$40,000", trend: "down", previousSale: "10" },
  { title: "Top Selling Sales rep", value: "Matthew Thompson" },
  { title: "Top Buyer", name: "Red Wagon Farm", value: "$3149" },
  { title: "No of New Buyers", value: "112", trend: "up", previousSale: "7" },
  { title: "Top Selling Product", name: "Organic Tomatos" },
  { title: "Total Weekly Sales Units", value: "$10,000", trend: "up", previousSale: "6" },
  { title: "Monthly Sales Units", value: "$40,000", trend: "down", previousSale: "10" },
  { title: "Product Mix", name: "Red Wagon Farm", value: "$3149" },
  { title: "Largest Buyer", value: "112", trend: "up", previousSale: "7" },
  { title: "Best Sales Rep", name: "Organic Tomatos" },
  { title: "Best Market", value: "$10,000", trend: "up", previousSale: "6" },
  { title: "Highest Sales Day", value: "$40,000", trend: "down", previousSale: "10" },
  { title: "Highest Sales Month", value: "Matthew Thompson" },
  { title: "Growth", name: "Red Wagon Farm", value: "$3149" },
  { title: "Groups", name: "Red Wagon Farm", value: "$3149" },
];

const salesVolumeData = [3000, 2000, 1700, 1000, 30, 900, 999, 670, 490, 450];

const Dashboard = () => {
  const { updateUser, user } = useUser();
  const [open, setOpen] = useState(false);
  const [showPaymentAlert, setShowPaymentAlert] = useState(true);
  const [isMap, setIsMap] = useState(false);
  const [updatedMarker, setUpdatedMarker] = useState([]);
  const [tableColumns, setTableColumns] = useState([
    "Total Weekly Sales",
    "Total Monthly Sales",
    "Top Selling Sales rep",
    "Top Buyer",
    "No of New Buyers",
    "Top Selling Product",
  ]);

  useEffect(() => {
    setShowPaymentAlert(
      !Boolean(user?.user?.blueCustomerId) && !Boolean(user?.user?.paymentMethodId)
    );
  }, [user?.user?.blueCustomerId, user?.user?.paymentMethodId]);

  const handleOnSubmit = async (values) => {
    try {
      const { data: response } = await api.post("payment", values);
      if (response.success) {
        toast.success(response.message);
        updateUser(response.data);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  // const sendQuickbooksToken = async (payload) => {
  //   try {
  //     const tokenResponse = await api.patch("quickbooks/save-quickbooks-token", { payload });
  //     if (tokenResponse.status === 200) {
  //       const buyersResponse = await api.post("buyers");
  //       console.log(buyersResponse);
  //     }
  //     setIsMap(true);
  //     fetchBuyers();
  //   } catch (error) {
  //     setIsMap(false);
  //     console.log(error.message);
  //   }
  // };

  // const handleQuickbooksLogin = () => {
  //   try {
  //     window.open(process.env.REACT_APP_BASE_URL + "quickbooks/auth", "_blank");
  //     window.addEventListener("message", (event) => {
  //       // if (event.origin !== "http://localhost:3001") {
  //       //   console.error("Invalid origin:", event.origin);
  //       //   return; // Do not process messages from untrusted origins
  //       // }
  //       console.log(event.data);

  //       if (event.data.access_token) {
  //         sendQuickbooksToken(event.data);
  //       } else {
  //         console.log("Received unexpected message format:", event.data);
  //       }
  //     });
  //   } catch (error) {
  //     console.log("Error fetching auth URI:", error);
  //   }
  // };

  const fetchBuyers = async () => {
    try {
      const res = await api.get("buyers");
      if (res?.data?.status === 401 || res?.status === 401) {
        setIsMap(false);
      } else if (res?.data?.data) {
        const filteredData = res?.data?.data?.filter((buyer) => {
          return (
            buyer?.showOnMap &&
            buyer?.location?.lat !== "INVALID" &&
            buyer?.location?.long !== "INVALID"
          );
        });
        const updatedData = filteredData?.map((element) => ({
          ...element,
          salesVolume: 1001 || salesVolumeData[Math.floor(Math.random() * salesVolumeData.length)],
        }));
        setUpdatedMarker(updatedData);
        setIsMap(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {showPaymentAlert && (
        <>
          <AddPaymnetAlert
            onClick={() => setOpen(true)}
            trialStartDate={user?.user?.trialStartDate}
          />
          <PaymentDialog open={open} onSubmit={handleOnSubmit} onClose={() => setOpen(false)} />
        </>
      )}
      {!user?.user?.paymentVerified && !showPaymentAlert && <VerifyPaymnetAlert />}
      <MDBox py={3}>
        <MDBox
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "16px",
            marginBottom: "16px",
          }}
        >
          <DropdownMenu
            tableColumns={tableColumns}
            columns={cardData}
            setTableColumns={setTableColumns}
          />
        </MDBox>
        <Grid container spacing={3}>
          {cardData?.map(
            (data, index) =>
              tableColumns.includes(data.title) && (
                <Grid item xs={12} sm={6} md={6} lg={4} key={index} style={{ display: "flex" }}>
                  <DashBoardInfoCard {...data} />
                </Grid>
              )
          )}
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              {isMap && <MapsVector data={updatedMarker} />}
              {/* {!isMap && (
                <MDBox>
                  <MDTypography>Click to login Quickbooks to get Map Data</MDTypography>
                  <MDButton
                    onClick={() => {
                      handleQuickbooksLogin();
                    }}
                    type="button"
                    color="success"
                    variant="gradient"
                    sx={{ mt: 3, mb: 2, mx: 2 }}
                  >
                    Quickbooks Login
                  </MDButton>
                </MDBox>
              )} */}
              <MDBox mt={3} mb={3}>
                <SalesChart
                  chartSeries={[
                    {
                      name: "This year",
                      data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                    },
                    {
                      name: "Last year",
                      data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                    },
                  ]}
                  sx={{ height: "100%" }}
                />
              </MDBox>
            </Grid>
            <Grid alignItems={"left"} item xs={12} md={6} lg={4}>
              <Notifications />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </>
  );
};

export default Dashboard;
