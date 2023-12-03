import { useState } from "react";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import FormHelperText from "@mui/material/FormHelperText";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "services/authAxios";
import { ChangePasswordRoute } from "utils/APIRoutes";
import { validatepasswordRoute } from "utils/APIRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setToastInfos } from "context";

function ChangePassword({ shadow, setOpenSnackBar }) {
  const [, dispatch] = useMaterialUIController();

  const [formErrors, setFormErrors] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [details, setDetails] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleSubmit = async (event) => {
    const { new_password } = details;
    event.preventDefault();
    setFormErrors(validate(details));
    const { data } = await axios.post(ChangePasswordRoute, {
      password: new_password,
    });

    if (data.status) {
      setToastInfos(dispatch, {
        color: "success",
        message: "Password Updated Successfully",
      });
      setOpenSnackBar(true);
    } else {
      setToastInfos(dispatch, { color: "warning", message: data.msg });
      setOpenSnackBar(true);
    }
  };

  const handleChange = (event) => {
    setDetails((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const validate = (values) => {
    const errors = {};
    validate_current_password(values.current_password).then((status) => {
      console.log(status);
      if (!status) {
        errors.current_password = "Current Password is not correct!";
      }
    });

    if (!values.current_password) {
      errors.current_password = "Current Password is required !";
    }

    if (!values.new_password) {
      errors.new_password = "New Password is required !";
    }
    if (!values.confirm_password) {
      errors.confirm_password = "Confirm Password is required !";
    }
    if (values.confirm_password !== values.new_password) {
      errors.confirm_password = "Password don't match";
    }

    return errors;
  };

  const validate_current_password = async (password) => {
    const { data } = await axios.post(validatepasswordRoute, { password });
    return data.status;
  };

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox pt={2} px={2}>
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
          py={2}
        >
          change password
        </MDTypography>

        <MDBox
          component="form"
          role="form"
          onSubmit={(event) => handleSubmit(event)}
        >
          <MDBox mb={2}>
            <MDInput
              type="password"
              label="Current Password"
              name="current_password"
              onChange={(e) => handleChange(e)}
              fullWidth
              error={formErrors.current_password}
            ></MDInput>
            <FormHelperText error>{formErrors.current_password}</FormHelperText>
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="password"
              label="New Password"
              name="new_password"
              onChange={(e) => handleChange(e)}
              fullWidth
              error={formErrors.new_password}
            ></MDInput>
            <FormHelperText error>{formErrors.new_password}</FormHelperText>
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="password"
              label="Confirm Password"
              name="confirm_password"
              onChange={(e) => handleChange(e)}
              fullWidth
              error={formErrors.confirm_password}
            ></MDInput>
            <FormHelperText error>{formErrors.confirm_password}</FormHelperText>
          </MDBox>
          <MDButton
            type="submit"
            variant="outlined"
            color="info"
            sx={{ width: "25%", mt: 1 }}
          >
            Save
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ChangePassword.propTypes = {
  shadow: PropTypes.bool,
};

export default ChangePassword;
