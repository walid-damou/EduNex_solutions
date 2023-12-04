// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MySnackBar from "components/MySnackBar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

//import UseState
import { useState } from "react";

// @mui icons
import Icon from "@mui/material/Icon";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

// Data
import sessionsTableData from "./data/sessionsTableData";

//Add companies component
import AddSession from "./add";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

function Sessions() {
  const [controller] = useMaterialUIController();
  const { toastInfos } = controller;

  const [openAddModel, setOpenAddModel] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { columns, rows, confirmation, ProvidersFilter, notifications } =
    sessionsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!openAddModel && (
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
                    Sessions List
                  </MDTypography>
                </MDBox>

                <Grid container spacing={2} display="flex" alignItems="center">
                  <MDBox ml={3} pt={2} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={setOpenAddModel}
                    >
                      <Icon fontSize="big">add</Icon>
                      &nbsp; add Session
                    </MDButton>
                  </MDBox>

                  <MDBox pt={2} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={() => setOpenFilter(!openFilter)}
                      iconOnly
                    >
                      <FilterAltIcon />
                    </MDButton>
                  </MDBox>
                </Grid>

                {openFilter && ProvidersFilter}

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
      {openAddModel && (
        <AddSession
          closeAddModel={setOpenAddModel}
          openSnackBar={setOpenSnackBar}
        />
      )}
      {confirmation}
      {notifications}
      {openSnackBar && (
        <MySnackBar
          color={toastInfos.color}
          title={toastInfos.message}
          open={openSnackBar}
          close={() => setOpenSnackBar(!openSnackBar)}
        />
      )}
    </DashboardLayout>
  );
}

export default Sessions;
