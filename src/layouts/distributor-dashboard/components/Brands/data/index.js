import { useState } from "react";
import Switch from "@mui/material/Switch";

import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import { BADGE_COLOR, BRAND_DATA } from "./BrandsData";
import { useNavigate } from "react-router-dom";

const data = () => {
  const Logo = ({ name }) => (
    <MDBox display="flex" alignItems="left" lineHeight={1}>
      <MDAvatar src={name} size="sm" />
    </MDBox>
  );

  const Brand = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="button" fontWeight="medium" lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
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

  // const Payment = ({ name }) => (
  //   <MDBox ml={-1}>
  //     <MDBadge badgeContent={name} color={BADGE_COLOR[name]} variant="gradient" size="sm" />
  //   </MDBox>
  // );

  const Payment = (row) => {
    const navigate = useNavigate();

    return (
      <MDBox ml={-1}>
        <MDButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/payment/${row.data.id}`);
          }}
          variant="contained"
          color="success"
          size="small"
        >
          pay
        </MDButton>
      </MDBox>
    );
  };

  const Health = ({ health }) => {
    const name = health === "healthy" ? "green" : "red";
    return (
      <MDBox ml={-1}>
        <MDBadge badgeContent={health} color={BADGE_COLOR[name]} variant="gradient" size="sm" />
      </MDBox>
    );
  };
  return {
    columns: [
      { Header: "Logo", accessor: "logo", align: "left" },
      { Header: "Brand Name", accessor: "brand", align: "center" },
      { Header: "Contact Name", accessor: "name", align: "center" },
      { Header: "Contact Email", accessor: "email", align: "center" },
      { Header: "Send Payment", accessor: "payment", align: "center" },
      { Header: "Access Toggle", accessor: "toggle", align: "center" },
      { Header: "Health", accessor: "health", align: "center" },
    ],
    rows: BRAND_DATA.map((row) => ({
      id: row.id,
      logo: <Logo name={row.logo} />,
      brand: <Brand name={row.brandName} />,
      name: <Brand name={row.contactName} />,
      email: <Brand name={row.contactEmail} />,
      payment: <Payment data={row} />,
      toggle: <Toggle name={row.access} />,
      health: <Health health={row.health} />,
    })),
  };
};

export default data;
