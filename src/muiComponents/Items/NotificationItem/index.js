import { forwardRef } from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import menuItem from "muiComponents/Items/NotificationItem/styles";

const NotificationItem = forwardRef(({ icon, title, to, onClose, ...rest }, ref) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (to) {
      navigate(to);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)} onClick={handleNavigation}>
      <MDBox component={Link} py={0.5} display="flex" alignItems="center" lineHeight={1}>
        <MDTypography variant="body1" color="secondary" lineHeight={0.75}>
          {icon}
        </MDTypography>
        <MDTypography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
          {title}
        </MDTypography>
      </MDBox>
    </MenuItem>
  );
});

NotificationItem.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClose: PropTypes.func,
};

export default NotificationItem;
