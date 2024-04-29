import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";

import {
  collapseItem,
  collapseIconBox,
  collapseText,
} from "muiComponents/Sidenav/styles/sidenavCollapse";
import SidenavCollapse from "muiComponents/Sidenav/SidenavCollapse";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";

function Sidebar({ name, icon, childRoutes }) {
  const [open, setOpen] = useState(false);
  const [controller] = useMaterialUIController();
  const { miniSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <MDBox
        sx={(theme) =>
          collapseItem(theme, {
            whiteSidenav,
            darkMode,
            sidenavColor,
          })
        }
        style={{ width: "86%" }}
      >
        <ListItem onClick={handleClick}>
          <ListItemIcon sx={(theme) => collapseIconBox(theme, { whiteSidenav, darkMode })}>
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={name}
            sx={(theme) =>
              collapseText(theme, {
                miniSidenav,
                whiteSidenav,
              })
            }
          />
          <ListItemIcon
            style={{ marginRight: "16px" }}
            sx={(theme) => collapseIconBox(theme, { whiteSidenav, darkMode })}
          >
            {open ? (
              <Icon fontSize="small">expand_less</Icon>
            ) : (
              <Icon fontSize="small">expand_more</Icon>
            )}
          </ListItemIcon>
        </ListItem>
      </MDBox>
      <Collapse sx={{ pl: "24px" }} in={open} timeout="auto" unmountOnExit>
        {childRoutes.map((childRoute) => {
          return (
            <NavLink key={childRoute.key} to={childRoute.route}>
              <SidenavCollapse
                name={childRoute.name}
                icon={childRoute.icon}
                active={childRoute.key === collapseName}
              />
            </NavLink>
          );
        })}
      </Collapse>
    </>
  );
}

export default Sidebar;
