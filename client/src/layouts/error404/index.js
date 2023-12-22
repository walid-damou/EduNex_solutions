// @mui material components
import Grid from "@mui/material/Grid";

import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Error image import
import ErrorImage from "../../assets/images/Error404.png";

// @mui icons
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";

function Error404() {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid
        container
        rowSpacing={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        pt={7}
      >
        <Grid item xs={12} md={9} lg={5}>
          <MDBox pt={2} mt={3}>
            <MDBox sx={{ width: "105%" }}>
              <img src={ErrorImage} alt="" width="100%"></img>
            </MDBox>
          </MDBox>
        </Grid>

        <Grid item xs={12} md={9} lg={7}>
          <MDBox textAlign="center" px={5}>
            <MDTypography
              sx={{
                fontSize: 200,
                fontWeight: 500,
                lineHeight: 1,
              }}
              color="dark"
            >
              404
            </MDTypography>
            <MDTypography
              color="info"
              sx={{ fontSize: 50, fontWeight: 300, lineHeight: 1 }}
            >
              Page not found
            </MDTypography>
            <MDTypography
              mt={2}
              mb={3}
              sx={{
                fontSize: 18,
                fontWeight: 300,
                lineHeight: 1.5,
              }}
            >
              The page you are looking for does not exist. How you got here is a
              mystery. But you can click the button below to go back to the
              dashboard page.
            </MDTypography>
            <MDButton
              variant="gradient"
              color="info"
              size="small"
              onClick={() => navigate("/dashboard")}
            >
              <Icon>dashboard</Icon>
              &nbsp; Dashboard
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Error404;
