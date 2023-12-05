/* eslint-disable array-callback-return */
import React, { useState } from "react";
import Papa from "papaparse";
import axios from "services/authAxios";
import {
  addCoursesRoute,
  addPartnersRoute,
  registerRoute,
  addCollabsRoute,
} from "utils/APIRoutes";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import LoadingButton from "@mui/lab/LoadingButton";

// @mui icons
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DropFileInput from "components/DropFileInput/DropFileInput";

// Material Dashboard 2 React contexts
import { setToastInfos, useMaterialUIController, setUpdater } from "context";
import { addVouchersAdminRoute } from "utils/APIRoutes";
import { addManyCollabsRoute } from "utils/APIRoutes";
import { baseURL } from "utils/APIRoutes";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

function CsvUploader({
  report,
  openSnackBar,
  closeUploadModel,
  DownloadTemplate,
  type,
  uploadType,
}) {
  const [error, setError] = useState("");

  const [file, setFile] = useState("");

  const [charging, setCharging] = useState(false);

  const [controller, dispatch] = useMaterialUIController();

  const { updater } = controller;

  const upload = (data) => {
    switch (uploadType) {
      case "courses":
        addCourses(data);
        break;

      case "providers":
        addProvider(data);
        break;

      case "companies":
        addCompany(data);
        break;

      case "collabs":
        addCollabs(data);
        break;

      case "session":
        addCollabstoSession(data);
        break;

      case "vouchers":
        addVouchers(data);
        break;

      default:
        break;
    }
  };

  const addCourses = (DATA) => {
    DATA.map(async (course) => {
      const { data } = await axios.post(addCoursesRoute, {
        nom: course.nom,
        provider: course[" providerID"],
        description: course[" description"],
      });

      if (data.status) {
        closeUploadModel(false);
        setUpdater(dispatch, !updater);
        setToastInfos(dispatch, {
          color: "success",
          message: "Courses Added Successfully",
        });
        openSnackBar(true);
      } else {

        report(data.report);
        setToastInfos(dispatch, { color: "warning", message: data.msg });
        openSnackBar(true);
      }
    });
  };

  const addProvider = (DATA) => {
    DATA.map(async (provider) => {
      const { data } = await axios.post(addPartnersRoute, provider);

      if (data.status) {
        closeUploadModel(false);
        setUpdater(dispatch, !updater);
        setToastInfos(dispatch, {
          color: "success",
          message: "Providers Added Successfully",
        });
        openSnackBar(true);
      } else {
        report(data.report);
        setToastInfos(dispatch, { color: "warning", message: data.msg });
        openSnackBar(true);
      }
    });
  };

  const addCompany = (DATA) => {
    DATA.map(async (company) => {
      const { data } = await axios.post(registerRoute, {
        username: company.username,
        nom: company[" first_name"],
        prenom: company[" last_name"],
        societe: company[" company_name"],
        email: company[" email"],
      });
      if (data.status) {
        closeUploadModel(false);
        setUpdater(dispatch, !updater);
        setToastInfos(dispatch, {
          color: "success",
          message: "Companies Added Successfully",
        });
        openSnackBar(true);
      } else {
        report(data.report);
        setToastInfos(dispatch, { color: "warning", message: data.msg });
        openSnackBar(true);
      }
    });
  };

  const addCollabs = async (DATA) => {
    const requestDATA = { societe: DATA.societe, collabs: [] };
    DATA.map((collab) => {
      requestDATA.collabs.push({
        nom: collab.nom,
        prenom: collab[" prenom"],
        username: collab[" username"],
        email: collab[" email"],
      });
    });
    const { data } = await axios.post(addManyCollabsRoute, requestDATA);
    if (data.status) {
      closeUploadModel(false);
      setUpdater(dispatch, !updater);
      setToastInfos(dispatch, {
        color: "success",
        message: "Collaborators Added Successfully",
      });
      openSnackBar(true);
    } else {

      report(data.report);
      setToastInfos(dispatch, { color: "warning", message: data.msg });
      openSnackBar(true);
    }
  };

  const addVouchers = async (DATA) => {
    const requestDATA = { vouchers: [] };
    DATA.map((voucher) => {
      requestDATA.vouchers.push({
        societe: voucher.societe,
        code: voucher[" code"],
        provider: voucher[" provider"],
      });
    });
    const { data } = await axios.post(addVouchersAdminRoute, requestDATA);

    if (data.status) {
      closeUploadModel(false);
      setUpdater(dispatch, !updater);
      setToastInfos(dispatch, {
        color: "success",
        message: "Vouchers Added Successfully",
      });
      openSnackBar(true);
    } else {
      report(data.report);
      setToastInfos(dispatch, { color: "warning", message: data.msg });
      openSnackBar(true);
    }
  };

  const addCollabstoSession = async () => {};

  const handleFileChange = (files) => {
    setError("");

    if (files.length) {
      const inputFile = files[0];

      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      setFile(inputFile);
    }
  };

  const handleParse = () => {
    if (!file) return setError("Enter a valid file");

    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      parsedData.splice(-1);
      upload(parsedData);
    };
    reader.readAsText(file);
  };

  return (
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
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <MDTypography variant="h6" color="white">
                Upload CSV
              </MDTypography>
              <MDButton
                variant="gradient"
                color="dark"
                size="small"
                iconOnly
                onClick={() => closeUploadModel(false)}
              >
                <Icon fontSize="small">close</Icon>
              </MDButton>
            </MDBox>

            <MDBox ml={1} pt={2} px={2} mt={1}>
              <MDButton
                variant="gradient"
                color="info"
                size="small"
                onClick={() => DownloadTemplate(type, "template")}
              >
                <Icon fontSize="big" color="light">
                  download
                </Icon>
                &nbsp; Download Template
              </MDButton>
            </MDBox>

            <MDBox p={3} mt={1}>
              <DropFileInput
                title="Drag & Drop your CSV file here"
                onFileChange={handleFileChange}
                accept=".csv"
              />
            </MDBox>

            <MDBox px={3} pb={2}>
              <LoadingButton
                onClick={() => {
                  handleParse();
                  setCharging(true);
                }}
                loading={charging}
                loadingPosition="center"
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "#227be9",
                  color: "#ffff",
                }}
                disabled={error !== "" || file === "" ? true : false}
              >
                Submit
              </LoadingButton>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default CsvUploader;
