// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

// Data
import sessionsTableData from "./data/requestsTableData";

function Requests() {
  const [controller] = useMaterialUIController();
  const { openRequestModel } = controller;

  const { columns, rows, confirmation, sessions, notifications } =
    sessionsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!openRequestModel && (
        <MDBox pt={6} pb={1}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Requests List
                  </MDTypography>
                </MDBox>

                <MDBox>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    canSearch
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      )}

      {confirmation}
      {openRequestModel && sessions}
      {notifications}
    </DashboardLayout>
  );
}

export default Requests;
