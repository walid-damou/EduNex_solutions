// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { baseURL } from "utils/APIRoutes";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MySnackBar({ report, title, color, open, close }) {
  return (
    <Stack spacing={2}>
      <Snackbar
        open={open}
        TransitionComponent={Fade}
        autoHideDuration={30000}
        onClose={close}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MDBox
          minWidth="20rem"
          shadow="xs"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Alert onClose={close} severity={color}>
            {title}
            {report && (
              <MDBox component="a" href={`${baseURL}${report}`} ml={0.5}>
                <MDTypography variant="text" color="dark" fontWeight="bold">
                  The Report&nbsp;
                  <Icon>flag</Icon>
                </MDTypography>
              </MDBox>
            )}
          </Alert>
        </MDBox>
      </Snackbar>
    </Stack>
  );
}

// Setting default values for the props of MDSnackbar
MySnackBar.defaultProps = {
  open: false,
  color: "info",
};

// Typechecking props for MDSnackbar
MySnackBar.propTypes = {
  color: PropTypes.oneOf(["info", "success", "warning", "error"]),
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  open: PropTypes.bool,
};
