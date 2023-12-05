// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DataTable from "examples/Tables/DataTable";

//import UseState
import { useState } from "react";

// @mui icons
import Icon from "@mui/material/Icon";

// Data
import sessionsTableData from "./data/sessionsTableData";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setOpenRequestModel } from "context";

//Add companies component
import AddSession from "./add";
import MySnackBar from "components/MySnackBar";

function Sessions({ request,cours, collab }) {
  const [controller, dispatch] = useMaterialUIController();
  const { openRequestModel, toastInfos } = controller;

  const [openAddModel, setOpenAddModel] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { columns, rows, SubmitButton, isChecked, notifications } =
    sessionsTableData(request,cours, collab);

  return (
    <>
      {!openAddModel && (
        <MDBox pt={6} pb={1}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  p={3}
                  mx={2}
                  mt={-3}
                  mb={1}
                >
                  <MDTypography variant="h6" color="white">
                    Choose a Session
                  </MDTypography>

                  <MDButton
                    variant="gradient"
                    color="dark"
                    size="small"
                    onClick={() =>
                      setOpenRequestModel(dispatch, !openRequestModel)
                    }
                  >
                    <Icon fontSize="small">arrow_back</Icon>
                    &nbsp;&nbsp; Back
                  </MDButton>
                </MDBox>

                <Grid
                  container
                  spacing={2}
                  display="flex"
                  justifyContent="space-between"
                >
                  <MDBox ml={3} pt={2} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={setOpenAddModel}
                    >
                      <Icon fontSize="big">add</Icon>
                      add Session
                    </MDButton>
                  </MDBox>

                  <MDBox pt={2} px={5} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="success"
                      size="small"
                      sx={{ width: 100 }}
                      onClick={() => {
                        SubmitButton();
                        setOpenRequestModel(dispatch, !openRequestModel);
                      }}
                      disabled={!isChecked}
                    >
                      Submit
                    </MDButton>
                  </MDBox>
                </Grid>

                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
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
      {notifications}
      {openSnackBar && (
        <MySnackBar
          color={toastInfos.color}
          title={toastInfos.message}
          open={openSnackBar}
          close={() => setOpenSnackBar(!openSnackBar)}
        />
      )}
    </>
  );
}

export default Sessions;
