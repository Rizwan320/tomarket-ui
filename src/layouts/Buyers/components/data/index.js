import React from "react";
import { IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import { BUYER_DATA } from "./BuyerData";

const data = (tableColumns) => {
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

  const allColumns = {
    logo: { Header: "Logo", accessor: "logo", align: "left" },
    businessName: {
      Header: "Business Name",
      accessor: "businessName",
      align: "center",
    },
    distributor: { Header: "Distributor", accessor: "distributor", align: "center" },
    salesRep: { Header: "Sales Rep", accessor: "salesRep", align: "center" },
    restaurantType: {
      Header: "Restaurant Type",
      accessor: "restaurantType",
      align: "center",
    },
    skuPurchased: {
      Header: "SKU Purchased",
      accessor: "skuPurchased",
      align: "center",
    },
    averageQuantity: {
      Header: "Average Quantity",
      accessor: "averageQuantity",
      align: "center",
    },
    averageWeeklySales: {
      Header: "Average Weekly Sales",
      accessor: "averageWeeklySales",
      align: "center",
    },
    weeklyTrend: {
      Header: "Weekly Trend",
      accessor: "weeklyTrend",
      align: "center",
    },
    monthlyTrend: {
      Header: "Monthly Trend",
      accessor: "monthlyTrend",
      align: "center",
    },
    unitsSoldLastWeek: {
      Header: "Units Sold Last Week",
      accessor: "unitsSoldLastWeek",
      align: "center",
    },
  };

  const filteredColumns = Object.values(allColumns).filter((column) =>
    tableColumns.includes(column.accessor)
  );

  return {
    columns: filteredColumns,
    rows: BUYER_DATA.map((row) => ({
      ...(tableColumns.includes("logo") && { logo: <Logo name={row.logo} /> }),
      ...(tableColumns.includes("businessName") && {
        businessName: <Brand name={row.businessName} />,
      }),
      ...(tableColumns.includes("distributor") && {
        distributor: <Brand name={row.distributor} />,
      }),
      ...(tableColumns.includes("salesRep") && {
        salesRep: <Brand name={row.salesRep} />,
      }),
      ...(tableColumns.includes("restaurantType") && {
        restaurantType: <Brand name={row.restaurantType} />,
      }),
      ...(tableColumns.includes("skuPurchased") && {
        skuPurchased: <Brand name={row.skusPurchased[0]} />,
      }),
      ...(tableColumns.includes("averageQuantity") && {
        averageQuantity: <Brand name={row.averageQuantity} />,
      }),
      ...(tableColumns.includes("averageWeeklySales") && {
        averageWeeklySales: <Brand name={row.averageWeeklySales} />,
      }),
      ...(tableColumns.includes("weeklyTrend") && {
        weeklyTrend: <TrendBadge trend={row.weeklyTrend} />,
      }),
      ...(tableColumns.includes("monthlyTrend") && {
        monthlyTrend: <TrendBadge trend={row.monthlyTrend} />,
      }),
      ...(tableColumns.includes("unitsSoldLastWeek") && {
        unitsSoldLastWeek: <TrendBadge trend={row.unitsSoldLastWeek} />,
      }),
    })),
  };
};

export default data;
