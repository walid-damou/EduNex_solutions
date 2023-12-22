import { useEffect } from "react";
import Loading from "examples/Loading";
import { imageRoute, refreshRoute, baseURL } from "utils/APIRoutes";
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SpecialRoute from "routes/SpecialRoute";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";

import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import GlobalStyles from "@mui/material/GlobalStyles";
// Logo
import AmpLogo from "assets/images/EduNex.png";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import Routing from "routes";
// Material Dashboard 2 React contexts
import {
  useMaterialUIController,
  setDarkMode,
  setAccountType,
  setChangedPassword,
  setTypeLoading,
  setUserId,
} from "context";
import axios from "services/authAxios";

import { setAccessToken } from "utils/accessToken";
import React, { useState } from "react";
import { Suspense } from "react";

function App() {
  const [controller, dispatch] = useMaterialUIController();

  const { layout, accountType, loadingType, sidenavColor, darkMode } =
    controller;

  const { pathname } = useLocation();

  // const [type, setType] = useState("");
  const [image, setImage] = useState("");

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    setTypeLoading(dispatch, true);
    const getRefreshToken = async () => {
      const { data } = await axios.get(refreshRoute);
      if (data && data.accesstoken) {
        setTypeLoading(dispatch, false);
        setAccessToken(data.accesstoken);
        setAccountType(dispatch, data.type);
        setUserId(dispatch, data.id);
        if (data.changedpass !== "") {
          setChangedPassword(dispatch, data.changedpass);
        } else {
          setChangedPassword(dispatch, true);
        }
        setImage(data.img);
      } else if (data && !data.status) {
        setTypeLoading(dispatch, false);
      }
    };
    getRefreshToken();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      const { data } = await axios.get(imageRoute);
      if (data.status) {
        setImage(data.img);
      }
    };
    getImage();
  }, [accountType]);

  useEffect(() => {}, [darkMode]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={<SpecialRoute>{route.component}</SpecialRoute>}
            key={route.key}
          />
        );
      }

      return null;
    });

  const darkModeToggle = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="6.8rem"
      width="1.8rem"
      bgColor={darkMode ? "white" : "info"}
      shadow="sm"
      borderRadius="15px"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={999}
      color={darkMode ? "dark" : "white"}
      sx={{ cursor: "pointer" }}
      lineHeight={1}
    >
      <Icon fontSize="small">light_mode</Icon>
      <Switch
        checked={darkMode}
        onChange={() => setDarkMode(dispatch, !darkMode)}
        sx={{ transform: "rotate(90deg)", m: "8px" }}
      />
      <Icon fontSize="small">dark_mode</Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <GlobalStyles styles={{ "@font-face ": { "font-display": "swap" } }} />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={image ? `${baseURL}/${image}` : AmpLogo}
            routes={accountType ? Routing(accountType) : Routing("")}
          />
          {darkModeToggle}
        </>
      )}
      <Suspense fallback={<Loading />}>
        <Routes>
          {accountType && getRoutes(Routing(accountType))}
          {!accountType && getRoutes(Routing(""))}

          {!accountType && loadingType !== true && (
            <Route
              path="*"
              element={<Navigate to="/login" state={{ prevPath: pathname }} />}
            />
          )}
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}
export default React.memo(App);
