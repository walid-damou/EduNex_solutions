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
import nonAddedCollabToSession from "./data/NonAddedCollabsToSession";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setOpenSelectCollabs } from "context";

//Add companies component
import AddCollab from "./add";
import MySnackBar from "components/MySnackBar";

function ChooseCollabs({ session }) {
  const [controller, dispatch] = useMaterialUIController();
  const { openSelectCollabs, toastInfos } = controller;

  const [openAddModel, setOpenAddModel] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { columns, rows, SubmitButton, isChecked, notifications } =
    nonAddedCollabToSession(session);

  return (
    <>
      {!openAddModel && (
        <MDBox pb={1}>
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
                  mt={3}
                  mb={1}
                >
                  <MDTypography variant="h6" color="white">
                    Select Collaborators
                  </MDTypography>

                  <MDButton
                    variant="gradient"
                    color="dark"
                    size="small"
                    onClick={() =>
                      setOpenSelectCollabs(dispatch, !openSelectCollabs)
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
                      onClick={() => setOpenAddModel(!openAddModel)}
                    >
                      <Icon fontSize="big">add</Icon>
                      add collabs
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
                        setOpenSelectCollabs(dispatch, !openSelectCollabs);
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
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      )}
      {openAddModel && (
        <AddCollab
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

export default ChooseCollabs;
