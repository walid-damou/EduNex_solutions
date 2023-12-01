// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// @mui icons
import FilterAltIcon from "@mui/icons-material/FilterAlt";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

//import UseState
import { useState } from "react";

// Data
import sessionsTableData from "./data/sessionsTableData";

//Add companies component
import AddProof from "./addProof";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

function Sessions() {
  const [controller] = useMaterialUIController();
  const { openProofModel } = controller;

  const [openFilter, setOpenFilter] = useState(false);
  const [sessionId, setSessionId] = useState(0);

  const { columns, rows, ProvidersFilter, ShowMyProof } =
    sessionsTableData(setSessionId);

  console.log("9abla", sessionId);

  return (
    <DashboardLayout collab>
      <DashboardNavbar />
      {!openProofModel && (
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

                <MDBox ml={1} px={2} mt={3}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    size="small"
                    onClick={() => setOpenFilter(!openFilter)}
                  >
                    <FilterAltIcon />
                    &nbsp; Filter By Provider
                  </MDButton>
                </MDBox>

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

      {openProofModel && <AddProof sessionId={sessionId} />}
      {ShowMyProof}
    </DashboardLayout>
  );
}

export default Sessions;
