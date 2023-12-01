// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater, setToastInfos } from "context";

import Ratings from "components/Ratings";

import axiosAuth from "services/authAxios";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import {
  sendRequestRoute,
  CoursesDetailsRoute,
  baseURL,
} from "utils/APIRoutes";
import MySnackBar from "components/MySnackBar";

function Partners() {
  const [controller, dispatch] = useMaterialUIController();
  const { updater, toastInfos } = controller;

  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    const getDetail = async () => {
      const { data } = await axiosAuth.post(CoursesDetailsRoute, {
        id,
      });
      if (data.status) {
        setDetails(data.cours);
        setLoading(false);
      }
    };
    getDetail();
  }, [updater]);

  const Enroll = async () => {
    const { data } = await axiosAuth.post(sendRequestRoute, {
      cours: id,
    });
    if (data.status) {
      setUpdater(dispatch, updater);
      setEnrolled(true);
      setToastInfos(dispatch, {
        color: "success",
        message: "Request Sent Successfully",
      });
      setOpenSnackBar(true);
    } else {
      setToastInfos(dispatch, {
        color: "warning",
        message: data.msg,
      });
      setOpenSnackBar(true);
    }
  };

  const renderButton = () => {
    if (!loading && (details.request > 0 || enrolled)) {
      return (
        <MDButton disabled="true" variant="gradient" color="warning">
          Pending ...
        </MDButton>
      );
    }
    if (!loading && details.enroll > 0) {
      return (
        <MDButton
          variant="gradient"
          onClick={() => {
            Enroll();
          }}
          color="info"
        >
          Enroll Now
        </MDButton>
      );
    } else {
      return (
        <MDButton disabled="true" variant="gradient" color="secondary">
          Enroll Now
        </MDButton>
      );
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar collab />
      <MDBox pt={6} pb={1}>
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
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <MDTypography variant="h6" color="white">
              {loading === false && details.nom}
            </MDTypography>
          </MDBox>
          <Grid container rowSpacing={1}>
            <Grid item xs={12} lg={8}>
              <MDBox p={2} pt={3}>
                <img
                  src={!loading && `${baseURL}/${details.image}`}
                  alt=""
                  width="100%"
                  height="auto"
                  style={{
                    borderRadius: "12px",
                    border: "3px solid #39393f",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} lg={4}>
              <MDBox py={3}>
                <MDTypography
                  component="h4"
                  variant="h4"
                  color="dark"
                  sx={{
                    pt: 3,
                    pl: 2,
                    lineHeight: 1.2,
                    textAlign: "justify",
                  }}
                >
                  {!loading && details.nom}
                </MDTypography>
                <MDTypography
                  component="p"
                  variant="caption"
                  color="dark"
                  sx={{
                    p: 2,
                    pr: 3,
                    pb: 1,
                    lineHeight: 1.6,
                    fontSize: "13px",
                    textAlign: "justify",
                  }}
                >
                  {!loading && details.description}
                </MDTypography>
                <MDBox px={1}>
                  <Ratings rating={5} fontSize="medium" color="warning" />
                </MDBox>
                <MDBox p={2} display="flex" alignItems="center">
                  {renderButton()}
                  <MDTypography
                    variant="caption"
                    color="dark"
                    sx={{ fontSize: "14px" }}
                    ml={3}
                  >
                    Enrolled By{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {!loading && details.collabs}
                    </span>
                  </MDTypography>
                </MDBox>
                <MDBox
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  pt={3}
                >
                  <MDTypography variant="h6" color="dark" mr={2}>
                    Offered By
                  </MDTypography>
                  <img
                    src={!loading && `${baseURL}/${details.Provider.image}`}
                    alt=""
                    width="25%"
                    height="auto"
                    style={{
                      borderRadius: "16px",
                    }}
                  />
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </Card>
      </MDBox>

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
