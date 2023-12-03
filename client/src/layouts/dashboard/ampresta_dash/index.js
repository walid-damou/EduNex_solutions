// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

//component
import PopularCoursesList from "examples/Lists/PopularCoursesList";

// Data
import authorsTableData from "./data/companiesTableData";
import CompaniesGraph from "./data/reportsBarChartCompaniesData";
import CoursesGraph from "./data/reportsLineChartCoursesData";
import PartnersGraph from "./data/reportsLineChartPartnersData";
import popularCoursesListData from "./data/popularCoursesListData";
import DataTable from "examples/Tables/DataTable";

// Hooks
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Axios
import axios from "services/authAxios";

// Endpoints
import { amCardsRoute } from "utils/APIRoutes";

function Dashboard() {
  const { columns, rows } = authorsTableData();

  const [coursesCount, setCoursesCount] = useState(0);
  const [partnersCount, setPartnersCount] = useState(0);
  const [companiesCount, setCompaniesCount] = useState(0);

  useEffect(() => {
    const fetchCards = async (model) => {
      const { data } = await axios.post(amCardsRoute, { model });
      switch (model) {
        case "cours":
          setCoursesCount(data.count);
          break;

        case "societe":
          setCompaniesCount(data.count);
          break;

        case "provider":
          setPartnersCount(data.count);
          break;

        default:
          break;
      }
    };

    fetchCards("cours").catch(console.error);
    fetchCards("societe").catch(console.error);
    fetchCards("provider").catch(console.error);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="business"
                title="Total Companies"
                count={companiesCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="school"
                title="Total Courses"
                color="success"
                count={coursesCount}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="handshake"
                title="Total Partners"
                count={partnersCount}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Total companies"
                  date="updated minutes ago"
                  chart={CompaniesGraph()}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Total Courses"
                  date="updated 4 min ago"
                  chart={CoursesGraph()}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="primary"
                  title="Total partners"
                  date="just updated"
                  chart={PartnersGraph()}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
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
                  display="flex"
                  justifyContent="space-between"
                >
                  <MDTypography variant="h6" color="white">
                    Companies
                  </MDTypography>
                  <Link to={"/companies"}>
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
            <Grid item xs={12} md={6} lg={4}>
              <PopularCoursesList
                title="Recent courses"
                profiles={popularCoursesListData()}
              />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
