/* eslint-disable react-hooks/exhaustive-deps */
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
import DashboardNavbar from "./DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import PieChart from "examples/Charts/PieChart";

// Icons
import Icon from "@mui/material/Icon";

// Data
import sessionsDetailsTableData from "./data/sessionsDetailsTableData";

//  React
import { useState, useEffect } from "react";

// axios
import axios from "services/authAxios";
import {
  SessionGraph,
  baseURL,
  asignVoucherSessionRoute,
} from "utils/APIRoutes";

import {
  useMaterialUIController,
  setOpenProofModel,
  setOpenSelectCollabs,
} from "context";

import ChooseCollabs from "./ChooseCollabs";
import ProofPreview from "components/ProofPreview";
import NotifyEmail from "./notify";

import { useParams } from "react-router-dom";

function Partners() {
  const { columns, rows, notifications } = sessionsDetailsTableData();

  const [controller, dispatch] = useMaterialUIController();
  const {
    collabProofModel,
    fileProofModel,
    openProofModel,
    openSelectCollabs,
    updater,
    toastInfos,
  } = controller;

  const [graph, setGraph] = useState([]);
  const [openNotify, setOpenNotify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    const getGraph = async () => {
      const { data } = await axios.post(SessionGraph, { sess: id });
      setGraph(data);
      setLoading(true);
    };
    getGraph();
  }, [updater]);

  const data = {
    labels: ["Cerified", "Finished Course", "Not completed"],
    datasets: {
      data: [
        loading ? graph.session.certifs_count : 0,
        loading
          ? graph.session.fincourse_count - graph.session.certifs_count
          : 0,

        loading
          ? graph.session.collab_count - graph.session.fincourse_count
          : 0,
      ],
    },
  };

  const assignAll = async () => {
    await axios.post(asignVoucherSessionRoute, { id });
  };

  return (
    <DashboardLayout>
      {loading && <DashboardNavbar titleio={graph.session.nom} />}
      <MDBox pt={6} pb={1}>
        <Grid container spacing={2} rowSpacing={2}>
          {!openNotify && !openSelectCollabs && !openProofModel && (
            <Grid item xs={12} md={7} lg={9}>
              <Card>
                {loading && (
                  <MDBox sx={{ zIndex: 999, ml: 4, pt: 1 }}>
                    <img
                      src={
                        loading
                          ? `${baseURL}/${graph.session.Cour.image}`
                          : null
                      }
                      alt={graph.session.nom}
                      width="110px"
                      style={{
                        borderRadius: "3px",
                        border: "2px solid #227be9",
                      }}
                    ></img>
                  </MDBox>
                )}
                <MDBox
                  mx={2}
                  mt={-6}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white" ml={15}>
                    {loading && graph.session.nom}
                  </MDTypography>
                </MDBox>

                <Grid
                  container
                  spacing={3}
                  display="flex"
                  justifyContent="space-between"
                >
                  <MDBox ml={3} pt={2} px={2} mt={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={() =>
                        setOpenSelectCollabs(dispatch, !openSelectCollabs)
                      }
                    >
                      <Icon fontSize="big">add</Icon>
                      &nbsp; add to session
                    </MDButton>
                  </MDBox>

                  <MDBox pt={2} mt={3} display="flex">
                    <MDBox mr={1}>
                      <MDButton
                        variant="gradient"
                        color="success"
                        size="small"
                        onClick={() => setOpenNotify(!openNotify)}
                      >
                        <Icon fontSize="big" color="light">
                          send
                        </Icon>
                        &nbsp; Notify All
                      </MDButton>
                    </MDBox>

                    <MDBox mr={1}>
                      <MDButton
                        variant="gradient"
                        color="success"
                        size="small"
                        onClick={() => assignAll()}
                      >
                        <Icon fontSize="big" color="light">
                          done
                        </Icon>
                        &nbsp; Assign All
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </Grid>

                <MDBox>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    canSearch
                  />
                </MDBox>
              </Card>
            </Grid>
          )}

          {openSelectCollabs && (
            <Grid item xs={12} md={7} lg={9}>
              <ChooseCollabs session={id} />
            </Grid>
          )}

          {openNotify && (
            <Grid item xs={12} md={7} lg={9}>
              <NotifyEmail
                closeNotify={setOpenNotify}
                openSnackBar={setOpenSnackBar}
              />
            </Grid>
          )}

          {openProofModel && (
            <Grid item xs={12} md={7} lg={9}>
              <ProofPreview
                collab={openProofModel && collabProofModel}
                file={openProofModel && fileProofModel}
                closeProofModel={() =>
                  setOpenProofModel(dispatch, !openProofModel)
                }
              />
            </Grid>
          )}

          <Grid item xs={12} md={5} lg={3}>
            <MDBox>
              <Card>
                <PieChart
                  icon={{ color: "info", component: "pie_chart" }}
                  title="Session Stats"
                  date="just updated"
                  chart={data}
                />
                <MDBox
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <MDBox
                    color="white"
                    bgColor="success"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    p={1}
                    sx={{ height: 5, fontSize: 10, lineHeight: 0 }}
                  >
                    Certified
                  </MDBox>
                  &nbsp;
                  <MDBox
                    color="white"
                    bgColor="primary"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    p={1}
                    sx={{ height: 5, fontSize: 10, lineHeight: 0 }}
                  >
                    Finished
                  </MDBox>
                  &nbsp;
                  <MDBox
                    color="white"
                    bgColor="dark"
                    variant="gradient"
                    borderRadius="lg"
                    shadow="lg"
                    p={1}
                    sx={{ height: 5, fontSize: 10, lineHeight: 0 }}
                  >
                    Not completed
                  </MDBox>
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
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

export default Partners;
