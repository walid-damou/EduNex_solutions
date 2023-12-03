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
import { useState } from "react";

// Axios
import axiosAuth from "services/authAxios";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater, setToastInfos } from "context";

import { useEffect } from "react";
import { allCompaniesRoute, addDepartementAdminRoute } from "utils/APIRoutes";

function AddDepartement({ closeAddModel, openSnackBar }) {
  const [formErrors, setFormErrors] = useState({
    deptname: "",
    company: "",
  });

  const [departement, setDepartement] = useState({
    nom: "",
    company: {
      id: "",
      nom: "",
    },
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

  const [controller, dispatch] = useMaterialUIController();
  const { updater } = controller;

  useEffect(() => {
    const getAllData = async () => {
      const { data } = await axiosAuth.get(allCompaniesRoute);
      let temp = [];
      data.msg.map((company) =>
        temp.push({ id: company.id, nom: company.name })
      );
      setCompanies(temp);
    };
    getAllData();
  }, []);

  const handleSubmit = async (event) => {
    // console.log("heey");
    const { nom, company } = departement;
    event.preventDefault();
    setFormErrors(validate(departement));
    if (Object.keys(validate(departement)).length === 0) {
      const { data } = await axiosAuth.post(addDepartementAdminRoute, {
        nom,
        soc: company.id,
      });
      if (data.status) {
        closeAddModel(false);
        setUpdater(dispatch, !updater);
        setToastInfos(dispatch, {
          color: "success",
          message: "Department Added Successfully",
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
    setDepartement((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleSelectedCompany = (event) => {
    const company = event.target.value;
    setDepartement((prev) => ({ ...prev, company }));
    setSelectedCompany(company);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.nom) {
      errors.deptname = "Department Name is required !";
    }
    if (!values.company.id) {
      errors.company = "Company is required !";
    }
    return errors;
  };

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
          Add Department
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
        <MDBox component="form" role="form">
          <MDBox display="flex"></MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Department Name"
              variant="outlined"
              fullWidth
              name="nom"
              onChange={(e) => handleChange(e)}
              error={formErrors.coursename}
            />
            <FormHelperText error>{formErrors.coursename}</FormHelperText>
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
        </MDBox>

        <MDBox mt={4} mb={2} display="flex" justifyContent="center">
          <MDButton
            type="submit"
            onClick={(e) => handleSubmit(e)}
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
    </Card>
  );
}

export default AddDepartement;
