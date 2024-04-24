import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { SALES_REP } from "./salesRepData";

const salesRepData = () => {
  const Data = ({ payload }) => (
    <MDTypography variant="caption" fontWeight="medium">
      {payload}
    </MDTypography>
  );

  const Name = ({ firstName, lastName }) => (
    <MDTypography variant="caption" fontWeight="medium">
      {`${lastName} ${firstName}`}
    </MDTypography>
  );

  const PercentageIndicator = ({ dataChangePercent }) => {
    return (
      <MDBox ml={-1}>
        <MDTypography
          variant="caption"
          fontWeight="medium"
          color={dataChangePercent.includes("-") ? "error" : "success"}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {dataChangePercent}%
          {dataChangePercent.includes("-") ? (
            <ArrowDownwardIcon sx={{ marginLeft: "4px" }} />
          ) : (
            <ArrowUpwardIcon sx={{ marginLeft: "4px" }} />
          )}
        </MDTypography>
      </MDBox>
    );
  };

  return {
    columns: [
      { Header: "Rep Name", accessor: "repName", align: "left" },
      { Header: "Phone No", accessor: "phoneNo", align: "center" },
      { Header: "Territory", accessor: "territory", align: "center" },
      { Header: "Sales Rep", accessor: "salesRep", align: "center" },
      { Header: "Restaurant Type", accessor: "restaurentType", align: "center" },
      { Header: "Highest Selling Account", accessor: "highestSellingAccount", align: "center" },
      { Header: "Sales Ratio", accessor: "salesRatio", align: "center" },
      { Header: "Average Weekly Sale", accessor: "averageWeeklySale", align: "center" },
      { Header: "Weekly Trend", accessor: "weeklyTrend", align: "center" },
      { Header: "Monthly Trend", accessor: "monthlyTrend", align: "center" },
    ],
    rows: SALES_REP.map((row) => ({
      id: row.id,
      repName: <Name firstName={row.firstName} lastName={row.lastName} />,
      phoneNo: <Data payload={row.phoneNo} />,
      territory: <Data payload={row.territory} />,
      salesRep: <Data payload={row.salesRep} />,
      restaurentType: <Data payload={row.restaurentType} />,
      highestSellingAccount: <Data payload={row.highestSellingAccount} />,
      salesRatio: <Data payload={row.salesRatio} />,
      averageWeeklySale: <Data payload={row.averageWeeklySale} />,
      weeklyTrend: <Data payload={row.weeklyTrend} />,
      monthlyTrend: <PercentageIndicator dataChangePercent={row.monthlyTrend} />,
    })),
  };
};

export default salesRepData;
