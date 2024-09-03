import { useEffect } from "react";

import { useLocation, NavLink, useNavigate } from "react-router-dom";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useUser } from "context/userContext";

import SidenavCollapse from "muiComponents/Sidenav/SidenavCollapse";

import SidenavRoot from "muiComponents/Sidenav/SidenavRoot";
import HrefLink from "./HrefLink";

import { useMaterialUIController, setMiniSidenav, setWhiteSidenav } from "context";

import toMarketLogo from "../../assets/images/tomarket-green-logo.png";
import { Tooltip } from "@mui/material";

const EXCLUDE_SIDE_BAR_KEYS = ["sign-in", "sign-up"];

const Sidenav = ({ color, brand, CompanyName, routes, ...rest }) => {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useUser();
  const collapseName = location.pathname.replace("/", "");

  let textColor = "dark";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "dark";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? true : whiteSidenav);
    }
    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();

    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  const handleLogout = () => {
    logout();
    navigate("/authentication/sign-in");
  };

  const treeRoute = routes.find((route) => route.key === "profile");

  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, href, route, children, disabled }) => {
      console.log(key);
      if (EXCLUDE_SIDE_BAR_KEYS.includes(key)) return null;

      let returnValue;
      if (type === "collapse") {
        returnValue = href ? (
          <HrefLink key={key} name={name} icon={icon} childRoutes={children} />
        ) : (
          <Tooltip title={disabled ? "Coming Soon" : ""} placement="right">
            <NavLink
              style={{ textDecoration: "none" }}
              disabled={disabled}
              key={key}
              to={disabled ? "#" : route}
            >
              <ListItem disabled={disabled} disableGutters>
                <SidenavCollapse
                  disabled={disabled}
                  name={name}
                  icon={icon}
                  active={key === collapseName}
                />
              </ListItem>
            </NavLink>
          </Tooltip>
        );
      } else if (type === "title") {
        returnValue = (
          <MDTypography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </MDTypography>
        );
      } else if (type === "divider") {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }
      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="success">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <MDBox component="img" src={toMarketLogo} alt="Brand" width="10rem" />}
          {/* <MDBox
            width={!CompanyName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {CompanyName}
            </MDTypography>
          </MDBox> */}
        </MDBox>
      </MDBox>
      <Divider light={false} />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <List sx={{ flexGrow: 1, overflow: "auto" }}>{renderRoutes}</List>
        <ListItem onClick={handleLogout} disablePadding sx={{ mt: "auto" }}>
          <ListItemButton>
            <ListItemIcon sx={{ ml: "12px" }}>
              <LogoutIcon />
            </ListItemIcon>
            <MDTypography sx={{ color: "textColor", fontSize: "18px", ml: -3 }}>
              Logout
            </MDTypography>
          </ListItemButton>
        </ListItem>
      </Box>
    </SidenavRoot>
  );
};

export default Sidenav;
