// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FormHelperText from "@mui/material/FormHelperText";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//import UseState Hook
import { useState, useEffect } from "react";

// Axios
import axios from "services/authAxios";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater, setToastInfos } from "context";

import {
  allCoursesRoute,
  addSessionsAdminRoute,
  allCompaniesRoute,
} from "utils/APIRoutes";

function AddSession({ closeAddModel, openSnackBar }) {
  const [formErrors, setFormErrors] = useState({
    nom: "",
    course: "",
    dateDepart: "",
    dateFin: "",
    company: "",
  });

  const [session, setSession] = useState({
    nom: "",
    course: {
      id: "",
      name: "",
    },
    company: {
      id: "",
      name: "",
    },
    dateDepart: "",
    dateFin: "",
  });

  const [selectedCourse, setSelectedCourse] = useState({
    nom: "",
    id: "",
  });

  const [selectedCompany, setSelectedCompany] = useState({
    nom: "",
    id: "",
  });

  const [companies, setCompanies] = useState([
    {
      id: "",
      nom: "",
    },
  ]);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getAllData1 = async () => {
      const { data } = await axios.get(allCompaniesRoute);
      let temp = [];
      data.msg.map((company) =>
        temp.push({ id: company.id, nom: company.name })
      );
      setCompanies(temp);
    };
    getAllData1();
    const getAllData = async () => {
      const { data } = await axios.get(allCoursesRoute);
      setCourses(data);
    };
    getAllData();
  }, []);

  const [controller, dispatch] = useMaterialUIController();
  const { updater } = controller;

  const handleSubmit = async (event) => {
    const { course, nom, dateDepart, dateFin } = session;
    event.preventDefault();
    setFormErrors(validate(session));
    if (Object.keys(validate(session)).length === 0) {
      const { data } = await axios.post(addSessionsAdminRoute, {
        nom,
        datedebut: dateDepart,
        datefin: dateFin,
        cours: course.id,
        soc: selectedCompany.id,
      });
      if (data.status) {
        closeAddModel(false);
        setUpdater(dispatch, !updater);
        setToastInfos(dispatch, {
          color: "success",
          message: "Session Added Successfully",
        });
        openSnackBar(true);
      } else {
        setToastInfos(dispatch, { color: "warning", message: data.msg });
        openSnackBar(true);
      }
    }
  };

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setSession((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleSelectedCourse = (event) => {
    const course = event.target.value;
    setSession((prev) => ({ ...prev, course }));
    setSelectedCourse(course);
  };

  const handleSelectedCompany = (event) => {
    const company = event.target.value;
    setSession((prev) => ({ ...prev, company }));
    setSelectedCompany(company);
  };
  const validate = (values) => {
    const errors = {};
    if (!values.nom) {
      errors.nom = "Session Name is required !";
    }
    if (!values.course.id) {
      errors.course = "Course Name is required !";
    }
    if (!values.dateDepart) {
      errors.dateDepart = "Start Date is required !";
    }
    if (!values.dateFin) {
      errors.dateFin = "End Date is required !";
    }
    if (!values.company.id) {
      errors.company = "Company is required !";
    }
    return errors;
  };

  const courses_ToBe_Selected =
    courses.length !== 0 ? (
      courses.map((course) => (
        <MenuItem key={course.id} value={course}>
          {course.nom}
        </MenuItem>
      ))
    ) : (
      <MDTypography variant="text" sx={{ color: "#2b85eb" }}>
        No Courses !
      </MDTypography>
    );

  return (
    <Card sx={{ mt: "50px" }}>
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
          Add Session
        </MDTypography>

        <MDButton
          variant="gradient"
          color="dark"
          size="small"
          iconOnly
          onClick={() => closeAddModel(false)}
        >
          <Icon fontSize="small">close</Icon>
        </MDButton>
      </MDBox>

      <MDBox pt={4} pb={3} px={10}>
        <MDBox
          component="form"
          role="form"
          onSubmit={(event) => handleSubmit(event)}
        >
          <MDBox display="flex">
            <MDBox mb={2} sx={{ width: "50%" }}>
              <MDInput
                type="text"
                label="Session Name"
                variant="outlined"
                name="nom"
                fullWidth
                onChange={(e) => handleChange(e)}
                error={formErrors.nom}
              />
              <FormHelperText error>{formErrors.nom}</FormHelperText>
            </MDBox>

            <MDBox mb={2} ml={2} sx={{ width: "50%" }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">
                  Course Name
                </InputLabel>
                <Select
                  name="course"
                  sx={{ height: 45 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCourse.name}
                  label="Age"
                  onChange={(e) => handleSelectedCourse(e)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 150,
                      },
                    },
                  }}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Course Name"
                      error={formErrors.course}
                    />
                  }
                >
                  {courses_ToBe_Selected}
                </Select>
                <FormHelperText error>{formErrors.course}</FormHelperText>
              </FormControl>
            </MDBox>
          </MDBox>

          <MDBox display="flex">
            <MDBox mb={2} sx={{ width: "50%" }}>
              <MDInput
                type="date"
                label="Start Date"
                variant="outlined"
                name="dateDepart"
                fullWidth
                onChange={(e) => handleChange(e)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormHelperText error>{formErrors.dateDepart}</FormHelperText>
            </MDBox>

            <MDBox mb={2} ml={2} sx={{ width: "50%" }}>
              <MDInput
                type="date"
                label="Date Fin"
                variant="outlined"
                name="dateFin"
                fullWidth
                onChange={(e) => handleChange(e)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormHelperText error>{formErrors.dateFin}</FormHelperText>
            </MDBox>
          </MDBox>

          <MDBox mb={2}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label">Company</InputLabel>
              <Select
                error={formErrors.company}
                name="company"
                sx={{ height: 45 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCompany.name}
                label="Age"
                onChange={(e) => handleSelectedCompany(e)}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 150,
                    },
                  },
                }}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Company" />
                }
              >
                {companies.map((company) => (
                  <MenuItem key={company.id} value={company}>
                    {company.nom}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>{formErrors.company}</FormHelperText>
            </FormControl>
          </MDBox>
          <MDBox mt={4} mb={2} display="flex" justifyContent="center">
            <MDButton
              type="submit"
              variant="gradient"
              color="info"
              sx={{ width: "30%", mr: "5px" }}
            >
              Submit
            </MDButton>

            <MDButton
              type="reset"
              variant="gradient"
              color="dark"
              sx={{ width: "30%", ml: "5px" }}
            >
              clear
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default AddSession;
