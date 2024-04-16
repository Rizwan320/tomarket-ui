import { useEffect } from "react";

import { useLocation, NavLink } from "react-router-dom";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useUser } from "context/userContext";

import SidenavCollapse from "muiComponents/Sidenav/SidenavCollapse";

import SidenavRoot from "muiComponents/Sidenav/SidenavRoot";
import sidenavLogoLabel from "muiComponents/Sidenav/styles/sidenav";

import { useMaterialUIController, setMiniSidenav, setWhiteSidenav } from "context";

const EXCLUDE_SIDE_BAR_KEYS = ["sign-in", "sign-up"];

const Sidenav = ({ color, brand, brandName, routes, ...rest }) => {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
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
  };

  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, href, route }) => {
    if (EXCLUDE_SIDE_BAR_KEYS.includes(key)) return null;

    let returnValue;
    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink key={key} to={route}>
          <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
        </NavLink>
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
  });

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
          {brand && <MDBox component="img" src={brand} alt="Brand" width="2rem" />}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider light={false} />
      <List>
        {renderRoutes}
        <ListItem onClick={handleLogout} sx={{ mt: "190%" }} disablePadding>
          <ListItemButton onClick={() => {}}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <MDTypography sx={{ color: textColor, fontSize: "18px" }}>Logout</MDTypography>
          </ListItemButton>
        </ListItem>
      </List>
    </SidenavRoot>
  );
};

export default Sidenav;
