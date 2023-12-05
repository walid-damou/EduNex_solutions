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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// @mui icons
import Icon from "@mui/material/Icon";

//Add companies component
import AddCompanies from "./add";

// Hook
import { useEffect, useState } from "react";

// Data
import coursesTableData from "./data/coursesTableData";
import { useNavigate } from "react-router-dom";

//csv
import Papa from "papaparse";
import CsvUploader from "examples/CsvUploader";
import { getAccessToken } from "utils/accessToken";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

function Courses_am() {
  const navigate = useNavigate();
  useEffect(() => {
    if (getAccessToken() === "") {
      navigate("/login");
    }
  }, []);

  const [controller] = useMaterialUIController();
  const { toastInfos } = controller;

  const [openAddModel, setOpenAddModel] = useState(false);
  const [openCsvUploader, setOpenCsvUploader] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [report, setReport] = useState(false);

  const { columns, rows, confirmation, rawData, notifications, sendEdit } =
    coursesTableData(setOpenAddModel);

  const handleDownload = (title, type) => {
    let data = [];
    let columns = [];
    if (rawData.length > 0) {
      if (type === "export") {
        rawData.map((row) =>
          data.push({
            nom: row.nom,
            provider: row.Provider.nom,
            description: row.description,
            collabs: row.collabs,
            sessions: row.sessions,
            createdAt: row.createdAt,
          })
        );
        columns = [
          "nom",
          "provider",
          "description",
          "collabs",
          "sessions",
          "createdAt",
        ];
      }
    }
    if (type === "template") {
      columns = ["nom", "providerID", "description"];
      let blank = {};
      columns.map((header) => (blank.header = ""));
      data.push(blank);
    }

    const csv = Papa.unparse(data, {
      header: true,
      delimiter: ", ",
      columns: columns,
    });
    const blob = new Blob([csv]);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob, { type: "text/plain" });
    a.download = `${title}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!openCsvUploader && !openAddModel && (
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
                    Courses
                  </MDTypography>
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
                      &nbsp; add Course
                    </MDButton>
                  </MDBox>

                  <MDBox pt={2} pr={4} mt={3} display="flex">
                    <MDBox mr={2}>
                      <MDButton
                        variant="gradient"
                        color="success"
                        size="small"
                        onClick={() => handleDownload("allCourses", "export")}
                        disabled={rawData.length === 0}
                      >
                        <Icon fontSize="big" color="light">
                          download
                        </Icon>
                        &nbsp; Export
                      </MDButton>
                    </MDBox>
                    <MDBox>
                      <MDButton
                        variant="gradient"
                        color="info"
                        size="small"
                        onClick={() => {
                          localStorage.setItem("uploadType", "courses");
                          setOpenCsvUploader(true);
                        }}
                      >
                        <Icon fontSize="big" color="light">
                          upload
                        </Icon>
                        &nbsp; upload csv
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
          </Grid>
        </MDBox>
      )}
      {openAddModel && (
        <AddCompanies
          closeAddModel={setOpenAddModel}
          openSnackBar={setOpenSnackBar}
          sendEdit={sendEdit}
        />
      )}
      {openCsvUploader && (
        <CsvUploader
          closeUploadModel={setOpenCsvUploader}
          DownloadTemplate={handleDownload}
          type={"addCourseTemplate"}
          openSnackBar={setOpenSnackBar}
          report={setReport}
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
          report={report}
        />
      )}
    </DashboardLayout>
  );
}

export default Courses_am;
