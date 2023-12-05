/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";

// react-router components
import { Link, useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import NotificationsList from "examples/Items/NotificationsList";

// axios
import axios from "services/authAxios";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import { useMaterialUIController, setMiniSidenav } from "context";
import notificationsData, { markRead } from "./data/notificationsData";
import { markallnoptifReadRoute } from "utils/APIRoutes";

function DashboardNavbar({ absolute, light, isMini, collab }) {
  const [controller, dispatch] = useMaterialUIController();

  const {
    miniSidenav,
    transparentNavbar,
    darkMode,
    changedNotif,
    accountType,
  } = controller;

  const [openMenu, setOpenMenu] = useState(false);
  const [openNotifsMenu, setOpenNotifsMenu] = useState(false);

  const route = useLocation().pathname.split("/").slice(1);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  const NotifsData = notificationsData();

  // Render the main menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={() => setOpenMenu(false)}
      sx={{ mt: 2 }}
    >
      {collab && (
        <Link to="/profile">
          <NotificationItem icon={<Icon>person</Icon>} title="My profile" />
        </Link>
      )}
      <Link to="/logout">
        <NotificationItem icon={<Icon>logout</Icon>} title="logout" />
      </Link>
    </Menu>
  );

  // Render the notifications menu
  const renderNotifications = () =>
    NotifsData.length !== 0 ? (
      <Menu
        anchorEl={openNotifsMenu}
        anchorReference={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(openNotifsMenu)}
        onClose={() => setOpenNotifsMenu(false)}
        sx={{ mt: 2 }}
      >
        <MDBox>
          <MDBox display="flex" justifyContent="flex-end">
            <MDButton
              size="small"
              onClick={async () => {
                await axios.post(markallnoptifReadRoute);
              }}
            >
              Mark All As Read
            </MDButton>
          </MDBox>
          {NotifsData.map((item) => (
            <NotificationsList
              key={item.id}
              icon={item.icon}
              route={item.route}
              label={item.label}
              transmitter={item.transmitter}
              subject={item.subject}
              onClick={() => {
                markRead(item.notifId);
              }}
            />
          ))}
        </MDBox>
      </Menu>
    ) : (
      <Menu
        anchorEl={openNotifsMenu}
        anchorReference={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(openNotifsMenu)}
        onClose={() => setOpenNotifsMenu(false)}
        sx={{ mt: 2 }}
      >
        <MDBox p={0.5}>
          <MDTypography variant="text" color="dark">
            No notifications available !
          </MDTypography>
        </MDBox>
      </Menu>
    );

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={"sticky"}
      color="inherit"
      sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      }
    >
      <Toolbar>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }}>
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={light}
          />
        </MDBox>
        {isMini ? null : (
          <MDBox>
            <MDBox color={light ? "white" : "inherit"}>
              {(accountType === "Societe" || accountType === "Collab") && (
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={(event) => setOpenNotifsMenu(event.currentTarget)}
                >
                  <Icon sx={iconsStyle}>notifications</Icon>
                  {changedNotif > 0 && (
                    <MDBadge
                      badgeContent={changedNotif}
                      color="warning"
                      size="xs"
                      sx={{ position: "absolute", ml: 2, mt: -2.5, zIndex: 2 }}
                    />
                  )}
                </IconButton>
              )}

              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={(event) => setOpenMenu(event.currentTarget)}
              >
                <Icon sx={iconsStyle}>account_circle</Icon>
              </IconButton>

              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              {renderMenu()}
              {renderNotifications()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
  collab: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  collab: PropTypes.bool,
};

export default DashboardNavbar;
