import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";

import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "muiComponents/Sidenav/styles/sidenavCollapse";

import { useMaterialUIController } from "context";

function SidenavCollapse({ icon, name, active, ...rest }) {
  const [controller] = useMaterialUIController();
  const { miniSidenav, whiteSidenav, darkMode, sidenavColor } = controller;

  return (
    <ListItem component="li">
      <MDBox
        {...rest}
        sx={(theme) =>
          collapseItem(theme, {
            active,
            whiteSidenav,
            darkMode,
            sidenavColor,
          })
        }
      >
        <ListItemIcon sx={(theme) => collapseIconBox(theme, { whiteSidenav, darkMode, active })}>
          {typeof icon === "string" ? (
            <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
          ) : (
            icon
          )}
        </ListItemIcon>

        <ListItemText
          primary={name}
          sx={(theme) =>
            collapseText(theme, {
              miniSidenav,
              whiteSidenav,
              active,
            })
          }
        />
      </MDBox>
    </ListItem>
  );
}

export default SidenavCollapse;
