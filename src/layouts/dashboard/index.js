import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

import DashboardLayout from "muiComponents/LayoutContainers/DashboardLayout";
import DashboardNavbar from "muiComponents/Navbars/DashboardNavbar";
import SalesChart from "muiComponents/Charts/ApexChart";
import MapsVector from "muiComponents/Maps";
import Notifications from "layouts/notifications";
import DashBoardInfoCard from "muiComponents/Cards/InfoCards/DashboardInfoCard";

const cardData = [
  { title: "Total Weekly Sales", value: "$10,000", trend: "up", previousSale: "6" },
  { title: "Total Monthly Sales", value: "$40,000", trend: "down", previousSale: "10" },
  { title: "Top Selling Sales rep", value: "Matthew Thompson" },
  { title: "Top Buyer", name: "Red Wagon Farm", value: "$3149" },
  { title: "No of New Buyers", value: "112", trend: "up", previousSale: "7" },
  { title: "Top Selling Product", name: "Organic Tomatos" },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {cardData?.map((data, index) => (
            <Grid item xs={12} sm={12} md={4} lg={4} key={index}>
              <DashBoardInfoCard {...data} />
            </Grid>
          ))}
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <MapsVector />
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
    </DashboardLayout>
  );
};

export default Dashboard;
