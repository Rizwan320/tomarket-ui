import React from "react";
import ApexChart from "react-apexcharts";
import { styled } from "@mui/material/styles";

const StyledApexChart = styled(ApexChart)({});

const Chart = (props) => {
  return <ApexChart {...props} />;
};

export default Chart;
