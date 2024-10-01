import { useState } from "react";
import { Switch } from "@mui/material";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";

export const tableConnectedBrandData = (brandDetails) => {
  const BADGE_COLOR = {
    red: "error",
    yellow: "warning",
    green: "success",
  };

  const Name = ({ name }) => (
    <MDTypography variant="caption" fontWeight="medium">
      {name}
    </MDTypography>
  );

  const Toggle = ({ name }) => {
    const [rememberMe, setRememberMe] = useState(name);
    const handleSetRememberMe = () => setRememberMe((pre) => !pre);

    return (
      <MDBox display="flex" alignItems="center" ml={-1}>
        <Switch checked={rememberMe} onChange={handleSetRememberMe} />
      </MDBox>
    );
  };

  const Connected = ({ status }) => {
    const displayStatus = status === "confirmed" ? "Yes" : "No";
    const color = status === "confirmed" ? "green" : "red";

    return (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={displayStatus}
          color={BADGE_COLOR[color]}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    );
  };

  return {
    columns: [
      { Header: "Brand Name", accessor: "brandName", align: "left" },
      { Header: "Contact Name", accessor: "userName", align: "left" },
      { Header: "Contact Email", accessor: "email", align: "left" },
      { Header: "Connected", accessor: "connected", align: "left" },
      { Header: "Access", accessor: "toggle", align: "left" },
    ],
    rows: brandDetails?.map((connection) => {
      const { brand } = connection;
      const firstUser = brand?.account?.users?.[0];

      return {
        id: brand?.id,
        brandName: <Name name={brand?.name || "N/A"} />,
        userName: <Name name={firstUser?.userName || "N/A"} />,
        email: <Name name={firstUser?.email || "N/A"} />,
        connected: <Connected status={connection?.state} />,
        toggle: <Toggle name={connection?.toggle} />,
      };
    }),
  };
};
