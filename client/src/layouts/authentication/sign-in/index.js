import { useEffect, useRef, useState } from "react";

// react-router-dom components
import { Link, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MySnackBar from "components/MySnackBar";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import authService from "services/auth.service";
import { getAccessToken } from "utils/accessToken";

import {
  useMaterialUIController,
  setAccountType,
  setChangedPassword,
  setToastInfos,
} from "context";

// reCaptcha
import ReCAPTCHA from "react-google-recaptcha";

function Basic(props) {
  const [controller, dispatch] = useMaterialUIController();
  const { loadingType, toastInfos } = controller;

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const recaptchaRef = useRef();

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (getAccessToken() !== "") {
      if (
        state &&
        state.prevPath &&
        state.prevPath !== "/" &&
        state.prevPath !== "/login" &&
        state.prev !== ""
      ) {
        navigate(state.prevPath);
      } else navigate("/dashboard");
    }
  }, [loadingType]);

  const [rememberMe, setRememberMe] = useState(false);
  const [formDetails, setFromDetail] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    const { username, password } = formDetails;
    const captcha = recaptchaRef.current.getValue();
    event.preventDefault();
    const data = await authService.login(username, password, captcha);
    if (data.status) {
      setAccountType(dispatch, data.type);
      setChangedPassword(dispatch, data.changedpass);
      navigate("/dashboard");
      setToastInfos(dispatch, {
        color: "success",
        message: "Logged In Successfully",
      });
      setOpenSnackBar(true);
    } else {
      setToastInfos(dispatch, { color: "warning", message: data.msg });
      setOpenSnackBar(true);
      if (captcha) {
        window.grecaptcha.reset();
      }

    }
  };

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setFromDetail((prev) => ({ ...prev, [key]: value }));
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const { SITE_KEY } = require("utils/config");

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          pb={4}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox
            component="form"
            role="form"
            onSubmit={(event) => handleSubmit(event)}
          >
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="username"
                fullWidth
                name="username"
                variant="standard"
                onChange={(event) => handleChange(event)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                name="password"
                variant="standard"
                onChange={(event) => handleChange(event)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don't have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Contact Ampresta
                </MDTypography>
              </MDTypography>
            </MDBox>
            <ReCAPTCHA ref={recaptchaRef} sitekey={SITE_KEY} />
          </MDBox>
        </MDBox>
      </Card>
      {openSnackBar && (
        <MySnackBar
          color={toastInfos.color}
          title={toastInfos.message}
          open={openSnackBar}
          close={() => setOpenSnackBar(!openSnackBar)}
        />
      )}
    </BasicLayout>
  );
}

export default Basic;
