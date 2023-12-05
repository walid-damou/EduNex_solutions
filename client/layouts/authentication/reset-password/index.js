import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import FormHelperText from "@mui/material/FormHelperText";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

//Password Tester Component
import PasswordTest from "components/PasswordTest";
import { ChangePasswordRoute } from "utils/APIRoutes";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import axios from "services/authAxios";

import { useNavigate } from "react-router-dom";
import {
  useMaterialUIController,
  setChangedPassword,
  setToastInfos,
} from "context";
import MySnackBar from "components/MySnackBar";

function PasswordReset() {
  useEffect(() => {}, []);
  const [controller, dispatch] = useMaterialUIController();
  const { toastInfos } = controller;

  const [openSnackBar, setOpenSnackBar] = useState(false);

  let navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [showStrength, setShowStrength] = useState(false);
  const [formErrors, setFormErrors] = useState({
    password: "",
    c_password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrors(validate(newPassword));
    const { data } = await axios.post(ChangePasswordRoute, {
      password: newPassword.password,
    });
    if (data.status) {
      setChangedPassword(dispatch, true);
      navigate("/dashboard");
      setToastInfos(dispatch, {
        color: "success",
        message: "Password Changed Successfully",
      });
      setOpenSnackBar(true);
    } else {

      setToastInfos(dispatch, { color: "warning", message: data.msg });
      setOpenSnackBar(true);
    }
  };

  const handleChange = (event) => {
    setShowStrength(true);
    setNewPassword((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "Password is required !";
    }
    if (!values.c_password) {
      errors.c_password = "Password Confirmation is required !";
    } else if (values.password !== values.c_password) {
      errors.c_password = "Passwords don't match !";
    }
    return errors;
  };

  return (
    <BasicLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={5}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" px={3}>
            Reset Password
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox
            component="form"
            role="form"
            onSubmit={(event) => handleSubmit(event)}
          >
            <MDBox mb={4}>
              <MDInput
                type="password"
                onChange={(e) => handleChange(e)}
                label="Password"
                name="password"
                variant="standard"
                fullWidth
                error={formErrors.password}
              />
              {showStrength && <PasswordTest password={newPassword.password} />}
              <FormHelperText error>{formErrors.password}</FormHelperText>
            </MDBox>
            <MDBox mb={4}>
              <MDInput
                type="password"
                onChange={(e) => handleChange(e)}
                label="Confirm Password"
                name="c_password"
                variant="standard"
                fullWidth
                error={formErrors.c_password}
              />
              <FormHelperText error>{formErrors.c_password}</FormHelperText>
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                reset
              </MDButton>
            </MDBox>
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

export default PasswordReset;
