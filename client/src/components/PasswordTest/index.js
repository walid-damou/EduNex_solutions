// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";

// PasswordTester Package import
// import zxcvbn from "zxcvbn";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import { useState } from "react";

const PasswordTest = ({ password }) => {
  const [barColor, setBarColor] = useState("primary");
  const [caption, setCaption] = useState("Weak");
  const [num, setNum] = useState(0);
  import("zxcvbn").then((zxcvbn) => {
    const testResult = zxcvbn.default(password);
    setNum((testResult.score * 100) / 4);
    const num2 = (testResult.score * 100) / 4;
    let caption2 = "";
    let barColor2 = "";
    if (num2 === 50) {
      caption2 = "Good";
      barColor2 = "info";
    } else if (num2 > 70) {
      caption2 = "Strong";
      barColor2 = "success";
    } else {
      caption2 = "Weak";
      barColor2 = "primary";
    }
    setCaption(caption2);
    setBarColor(barColor2);
  });
  return (
    <MDBox display="flex" alignItems="center" mt={0.2}>
      <MDTypography variant="caption" color="text">
        {caption}
      </MDTypography>
      <MDBox ml={1} width="100%">
        <MDProgress variant="gradient" color={barColor} value={num} />
      </MDBox>
    </MDBox>
  );
};

// Setting default props for the ProfilesList
PasswordTest.defaultProps = {
  password: "",
};

// Typechecking props for the ProfilesList
PasswordTest.propTypes = {
  password: PropTypes.string,
};

export default PasswordTest;
