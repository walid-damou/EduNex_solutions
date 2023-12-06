import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// react-router components
import { Link } from "react-router-dom";

// @mui material components
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// custom styles for the NotificationList
import menuItem from "examples/Items/NotificationsList/styles";

const NotificationList = forwardRef(
  ({ icon, label, route, transmitter, subject, onClick, ...rest }, ref) => (
    <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
      <MDBox
        component={Link}
        py={0.5}
        display="flex"
        alignItems="center"
        lineHeight={1}
        to={route}
        onClick={onClick}
      >
        <MDTypography variant="body1" color="secondary" lineHeight={0.75}>
          {icon}
        </MDTypography>
        <MDTypography variant="button" fontWeight="bold" sx={{ ml: 1 }}>
          {transmitter}
        </MDTypography>
        <MDTypography variant="button" fontWeight="regular" sx={{ ml: 0.5 }}>
          {label}
        </MDTypography>
        <MDTypography variant="button" fontWeight="bold" sx={{ ml: 1 }}>
          {subject}
        </MDTypography>
      </MDBox>
    </MenuItem>
  )
);

// Typechecking props for the NotificationList
NotificationList.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  route: PropTypes.string,
  transmitter: PropTypes.string,
  subject: PropTypes.string,
};

export default NotificationList;
