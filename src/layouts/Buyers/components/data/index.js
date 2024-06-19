import React, { useEffect, useState } from "react";
import { IconButton, Switch } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { BUYER_DATA } from "./BuyerData";
import api from "../../../../axios";
import { toast } from "react-toastify";

const buyersdata = (tableColumns) => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await api.get("buyers");
        if (response.data.data) {
          const buyer = response?.data?.data?.map((row) => ({
            ...row,
            displayName: row.displayName,
            email: row.email || "",
            showOnMap: row.showOnMap,
          }));
          setTableData(buyer);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBuyers();
  }, []);
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

  const SkuDropdown = ({ row, onChange }) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
      setOpen(!open);
    };
    const handleSelect = (event) => {
      const selectedIndex = event.target.value;
      const selectedSku = row.skusPurchased[selectedIndex];
      const selectedAverageQuantity = row.averageQuantity[selectedIndex] || 0;
      onChange(row.id, selectedSku, selectedAverageQuantity);
    };

    return (
      <div onClick={handleToggle} style={{ display: "inline-block", position: "relative" }}>
        <ArrowDropDownIcon
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: 0,
            cursor: "pointer",
          }}
        />
        <Select
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={row.skusPurchased.indexOf(row.selectedSku) || 0}
          onChange={handleSelect}
          fullWidth
        >
          {row.skusPurchased.map((sku, index) => (
            <MenuItem key={sku} value={index}>
              {sku}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  };

  const updateSkuAndQuantity = (rowId, newSku, newAverageQuantity = 0) => {
    const newData = tableData?.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          selectedSku: newSku,
          selectedAverageQuantity: newAverageQuantity,
        };
      }
      return row;
    });

    setTableData(newData);
  };

  const ToggleSwitch = ({ row, onChange }) => {
    const handleChange = (event) => {
      onChange(row.id, event.target.checked);
    };

    return <Switch checked={row.showOnMap} onChange={handleChange} color="primary" />;
  };

  const updateShowOnMap = async (rowId, value) => {
    try {
      const res = await api.patch(`buyers/${rowId}`, { showOnMap: value });
      if (res.status == 200) {
        setTableData((prevData) =>
          prevData.map((row) => (row.id === rowId ? { ...row, showOnMap: value } : row))
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
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
    displayName: {
      Header: "Display Name",
      accessor: "displayName",
      align: "center",
    },
    email: {
      Header: "Email",
      accessor: "email",
      align: "center",
    },
    showOnMap: {
      Header: "Show on Map",
      accessor: "showOnMap",
      align: "center",
    },
  };

  const filteredColumns = Object.values(allColumns).filter((column) =>
    tableColumns.includes(column.accessor)
  );

  const renderBuyersComponent = (column, row) => {
    const componentsMap = {
      logo: () => <Logo name={"https://via.placeholder.com/40"} />,
      businessName: () => <Brand name={row?.businessName} />,
      displayName: () => <Brand name={row?.displayName} />,
      email: () => <Brand name={row?.email} />,
      distributor: () => <Brand name={row?.distributor} />,
      salesRep: () => <Brand name={row?.salesRep} />,
      restaurantType: () => <Brand name={row?.restaurantType} />,
      skuPurchased: () => <SkuDropdown row={row} onChange={updateSkuAndQuantity} />,
      averageQuantity: () => <Brand name={row?.selectedAverageQuantity || 0} />,
      averageWeeklySales: () => <Brand name={row?.averageWeeklySales} />,
      weeklyTrend: () => <TrendBadge trend={row?.weeklyTrend} />,
      monthlyTrend: () => <TrendBadge trend={row?.monthlyTrend} />,
      unitsSoldLastWeek: () => <TrendBadge trend={row?.unitsSoldLastWeek} />,
      showOnMap: () => <ToggleSwitch row={row} onChange={updateShowOnMap} />,
    };

    return componentsMap[column] ? componentsMap[column]() : null;
  };
  return {
    columns: filteredColumns,
    rows: tableData.map((row) => {
      return tableColumns.reduce((acc, column) => {
        acc[column] = renderBuyersComponent(column, row);
        return acc;
      }, {});
    }),
  };
};

export default buyersdata;
