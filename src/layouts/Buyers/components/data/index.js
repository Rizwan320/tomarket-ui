import React from "react";
import { IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import { BUYER_DATA } from "./BuyerData";

const data = () => {
  const Logo = ({ name }) => (
    <MDBox display="flex" alignItems="left" lineHeight={1}>
      <MDAvatar src={name} size="sm" />
    </MDBox>
  );

  const Brand = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="caption" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  );

  const TrendBadge = ({ trend }) => {
    const trends = trend.split(" ");
    const arrow = trends[0];
    const previousSale = trends[1];
    return (
      <MDBox display="flex" alignItems="center">
        <MDTypography
          variant="h6"
          component="h4"
          fontWeight="small"
          color={arrow === "Down" ? "error" : "success"}
        >
          {arrow === "Down" ? "-" + previousSale : "+" + previousSale}
        </MDTypography>
        {arrow === "Down" ? (
          <IconButton sx={{ padding: 0 }}>
            <ArrowDownwardIcon sx={{ height: "20px" }} color="error" />
          </IconButton>
        ) : (
          <IconButton sx={{ padding: 0 }}>
            <ArrowUpwardIcon sx={{ height: "20px" }} color="success" />
          </IconButton>
        )}
      </MDBox>
    );
  };

  return {
    columns: [
      { Header: "Logo", accessor: "logo", align: "left" },
      { Header: "Business Name", accessor: "businessName", align: "center" },
      { Header: "Distributor", accessor: "distributor", align: "center" },
      { Header: "Sales Rep", accessor: "salesRep", align: "center" },
      { Header: "Restaurant Type", accessor: "restaurantType", align: "center" },
      { Header: "SKU Purchased", accessor: "skuPurchased", align: "center" },
      { Header: "Average Quantity", accessor: "averageQuantity", align: "center" },
      { Header: "Average Weekly Sales", accessor: "averageWeeklySales", align: "center" },
      { Header: "Weekly Trend", accessor: "weeklyTrend", align: "center" },
      { Header: "Monthly Trend", accessor: "monthlyTrend", align: "center" },
      { Header: "Units Sold Last Week", accessor: "unitsSoldLastWeek", align: "center" },
    ],
    rows: BUYER_DATA.map((row) => ({
      logo: <Logo name={row.logo} />,
      businessName: <Brand name={row.businessName} />,
      distributor: <Brand name={row.distributor} />,
      salesRep: <Brand name={row.salesRep} />,
      restaurantType: <Brand name={row.restaurantType} />,
      skuPurchased: <Brand name={row.skusPurchased[0]} />,
      averageQuantity: <Brand name={row.averageQuantity} />,
      averageWeeklySales: <Brand name={row.averageWeeklySales} />,
      weeklyTrend: <TrendBadge trend={row.weeklyTrend} />,
      monthlyTrend: <TrendBadge trend={row.monthlyTrend} />,
      unitsSoldLastWeek: <TrendBadge trend={row.unitsSoldLastWeek} />,
    })),
  };
};

export default data;
