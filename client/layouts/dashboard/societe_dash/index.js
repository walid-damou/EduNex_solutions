// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

//component
import DataTable from "examples/Tables/DataTable";
import PolarChart from "examples/Charts/PolarChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";

// Data
import quotaGraph from "./data/quotaGraph";
import collabGraph from "./data/collabGraph";
import authorsTableData from "./data/companiesTableData";
import popularCoursesListData from "./data/popularCoursesListData";

// Hooks
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Axios
import axios from "services/authAxios";

// Endpoints
import { SocCardsRoute } from "utils/APIRoutes";

function Dashboard() {
  const { columns, rows } = authorsTableData();
  const { columns: quotacolumns, rows: quotarows } = popularCoursesListData();

  const [sessionsCount, setSessionsCount] = useState(0);
  const [collaboratorsCount, setCollabsCount] = useState(0);

  useEffect(() => {
    const fetchCards = async (model) => {
      const { data } = await axios.post(SocCardsRoute, { model });
      switch (model) {
        case "session":
          setSessionsCount(data.count);
          break;

        case "collab":
          setCollabsCount(data.count);
          break;

        default:
          break;
      }
    };

    fetchCards("session").catch(console.error);
    fetchCards("challenge").catch(console.error);
    fetchCards("collab").catch(console.error);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3}>
        <Grid container spacing={2} rowSpacing={3}>
          <Grid item xs={12} md={12} lg={4}>
            <PolarChart
              icon={{ color: "success", component: "pie_chart" }}
              title="My Quota"
              chart={quotaGraph()}
            />
          </Grid>
          <Grid container item columnSpacing={2} rowSpacing={2} xs={12} lg={8}>
            <Grid item xs={12} md={12} lg={6}>
              <MDBox mb={1}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="business"
                  title="Total Sessions"
                  count={sessionsCount}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <MDBox mb={1}>
                <ComplexStatisticsCard
                  icon="groups"
                  title="Total Collaborators"
                  color="info"
                  count={collaboratorsCount}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={12} lg={8}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-1}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="primary"
                  borderRadius="lg"
                  coloredShadow="primary"
                  display="flex"
                  justifyContent="space-between"
                >
                  <MDTypography variant="h6" color="white">
                    Best Collaborators
                  </MDTypography>
                  <Link to={"/collaborators"}>
                    <MDTypography
                      sx={{ textDecoration: "underline" }}
                      fontSize={14}
                      fontWeight={"bold"}
                      color="light"
                    >
                      Show All
                    </MDTypography>
                  </Link>
                </MDBox>
                <MDBox pt={2}>
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

            <Grid item xs={12} md={12} lg={4}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-1}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="warning"
                  borderRadius="lg"
                  coloredShadow="primary"
                  display="flex"
                  justifyContent="space-between"
                >
                  <MDTypography variant="h6" color="white">
                    Quotas
                  </MDTypography>
                </MDBox>
                <MDBox pt={2}>
                  <DataTable
                    table={{
                      columns: quotacolumns,
                      rows: quotarows.slice(0, 3),
                    }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-1}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Collaborators
                </MDTypography>
              </MDBox>
              <DefaultLineChart chart={collabGraph()}></DefaultLineChart>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
