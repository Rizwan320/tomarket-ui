import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { ListItemText } from "@mui/material";

import MDBox from "components/MDBox";
// import SalesChart from "muiComponents/Charts/ApexChart";
// import MapsVector from "muiComponents/Maps";
import Notifications from "layouts/notifications";
import DashBoardInfoCard from "muiComponents/Cards/InfoCards/DashboardInfoCard";
import DropdownMenu from "muiComponents/MultiSelectDropdown";
import PaymentDialog from "layouts/billing/components/PaymentDialog";
import AddPaymnetAlert from "./components/AddPaymnetAlert";
import VerifyPaymnetAlert from "./components/VerifyPaymentAlert";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
import { useUser } from "context/userContext";
import Maps from "../../google/Map";

import api from "../../axios";
import ChangePasswordModal from "../Modals/ChangePasswordModal.js";

const cardData = [
  { title: "Total Weekly Sales", value: "$10,000", trend: "up", previousSale: "6" },
  { title: "Total Monthly Sales", value: "$40,000", trend: "down", previousSale: "10" },
  // { title: "Top Selling Sales rep", value: "Matthew Thompson" },
  { title: "Top Buyer", name: "Red Wagon Farm", value: "$3149" },
  { title: "No of Buyers", value: "112", trend: "up", previousSale: "7" },
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

const Dashboard = () => {
  const navigate = useNavigate();
  const { updateUser, user } = useUser();
  const [open, setOpen] = useState(false);
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);
  const [showVerifyPaymentAlert, setVerifyShowPaymentAlert] = useState(false);
  const [updatedMarker, setUpdatedMarker] = useState([]);
  const [tableColumns, setTableColumns] = useState(["Total Sales", "Top Buyer", "No of Buyers"]);
  const [sales, setSales] = useState({
    totalSales: 0,
    noOfBuyers: 0,
    topBuyer: "",
  });

  useEffect(() => {
    setShowPaymentAlert(
      !Boolean(user?.user?.blueCustomerId) && !Boolean(user?.user?.paymentMethodId)
    );
  }, [user?.user?.blueCustomerId, user?.user?.paymentMethodId]);

  useEffect(() => {
    setVerifyShowPaymentAlert(!user?.user?.paymentVerified);
  }, [user?.user?.paymentVerified]);

  const handleOnSubmit = async (values) => {
    try {
      const { data: response } = await api.post("payment", values);
      toast.success(response?.message);
      updateUser(response?.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    fetchSales();
    fetchbuyerslocation();
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

  const fetchSales = async () => {
    try {
      const res = await api.get("sales/records");
      const { totalSales, topBuyer, numberOfBuyers } = res.data;
      setSales({
        totalSales: totalSales,
        topBuyer: topBuyer,
        noOfBuyers: numberOfBuyers,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchbuyerslocation = async () => {
    try {
      const res = await api.get("buyers/locations");
      setUpdatedMarker(res?.data);
    } catch (error) {
      console.error(error?.response?.data?.message || error?.message);
    }
  };

  const dashCardData = [
    {
      title: "Total Sales",
      value: `$${sales.totalSales}`,
      // trend: sales.weeklySales > 0 ? "up" : "down",
    },
    {
      title: "Top Buyer",
      // name: sales.topBuyer || "No top buyer",
      value: `${sales.topBuyer}`, // Assuming the value for the top buyer should also display sales
    },
    {
      title: "No of Buyers",
      value: sales.noOfBuyers,
      // trend: sales.noOfBuyers > 0 ? "up" : "down",
    },
  ];

  return (
    <>
      {showPaymentAlert ? (
        <>
          <AddPaymnetAlert
            onClick={() => setOpen(true)}
            trialStartDate={user?.user?.trialStartDate}
          />
          <PaymentDialog
            title={
              <ListItemText
                sx={{ textAlign: "center" }}
                primary="Please add payment details to start a free trial."
                secondary="Free for 1 month, then $25 + charges per month after."
              />
            }
            open={open}
            onSubmit={handleOnSubmit}
            onClose={() => setOpen(false)}
          />
        </>
      ) : (
        showVerifyPaymentAlert && <VerifyPaymnetAlert onClick={() => navigate("/profile")} />
      )}
      <MDBox py={3}>
        <MDBox sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
          <DropdownMenu
            tableColumns={tableColumns}
            columns={cardData}
            setTableColumns={setTableColumns}
          />
        </MDBox>
        <Grid container spacing={3}>
          {dashCardData?.map(
            (data, index) =>
              tableColumns.includes(data?.title) && (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <DashBoardInfoCard {...data} />
                </Grid>
              )
          )}
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <MDBox p={2}>
                  <Maps data={updatedMarker} />
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Notifications />
            </Grid>
          </Grid>
        </MDBox>
        {!user?.isImpersonating && <ChangePasswordModal />}
      </MDBox>
    </>
  );
};

export default Dashboard;
