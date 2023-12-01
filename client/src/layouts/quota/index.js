// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MySnackBar from "components/MySnackBar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AddQuota from "./edit";

// import CardComponent
import DefaultProjectCard from "./components/DefaultProjectCard";

// Hook
import { useEffect, useState } from "react";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

// import Oracle from "assets/images/oracle-logo.jpg";
import axios from "services/authAxios";

import { AllQuotaSocRoute } from "utils/APIRoutes";

function Overview() {
  const [controller] = useMaterialUIController();
  const { updater, toastInfos } = controller;

  const [openAddModel, setOpenAddModel] = useState(false);
  const [allCompanies, setAllCompanies] = useState([]);
  const [companyID, setCompanyID] = useState(-1);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    const getAllCompanies = async () => {
      const { data } = await axios.get(AllQuotaSocRoute);
      console.log(data);
      setAllCompanies((prev) => data.msg);
      return;
    };

    getAllCompanies();
  }, [updater]);

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
                    Campanies' Quota
                  </MDTypography>
                </MDBox>

                <MDBox p={3}>
                  <Grid container spacing={2}>
                    {allCompanies.map((company) => (
                      <Grid item xs={12} md={6} xl={3} key={company.id}>
                        <DefaultProjectCard
                          setCompanyID={setCompanyID}
                          companyID={company.id}
                          image={company.image}
                          title={company.name}
                          openAddModel={setOpenAddModel}
                          quota={company.Quota}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      )}
      {openAddModel && (
        <AddQuota
          openAddModel={setOpenAddModel}
          companyID={companyID}
          openSnackBar={setOpenSnackBar}
        />
      )}
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

export default Overview;
