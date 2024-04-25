import { useState } from "react";
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import SalesChart from "muiComponents/Charts/ApexChart";
import MapsVector from "muiComponents/Maps";
import Notifications from "layouts/notifications";
import DashBoardInfoCard from "muiComponents/Cards/InfoCards/DashboardInfoCard";
import DropdownMenu from "muiComponents/MultiSelectDropdown";

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

const Dashboard = () => {
  const [tableColumns, setTableColumns] = useState([
    "Total Weekly Sales",
    "Total Monthly Sales",
    "Top Selling Sales rep",
    "Top Buyer",
    "No of New Buyers",
    "Top Selling Product",
  ]);

  return (
    <>
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
    </>
  );
};

export default Dashboard;
