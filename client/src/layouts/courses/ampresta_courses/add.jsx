// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FormHelperText from "@mui/material/FormHelperText";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import DropFileInput from "components/DropFileInput/DropFileInput";

//import UseState Hook
import { useState } from "react";

// Axios
import axiosAuth from "services/authAxios";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater, setToastInfos } from "context";

import { useEffect } from "react";
import {
  allPartnersRoute,
  uploadRoute,
  addCoursesRoute,
} from "utils/APIRoutes";

function AddCourses({ closeAddModel, openSnackBar, sendEdit }) {
  const [formErrors, setFormErrors] = useState({
    coursename: "",
    provider: "",
    description: "",
  });

  const [file, setFile] = useState(null);

  const [course, setCourse] = useState({
    nom: "",
    provider: {
      id: "",
      name: "",
    },
    description: "",
  });

  const [selectedProvider, setSelectedProvider] = useState({
    nom: "",
    id: "",
  });

  const [providers, setProviders] = useState([
    {
      id: "",
      nom: "",
    },
  ]);

  const [controller, dispatch] = useMaterialUIController();
  const { updater } = controller;

  useEffect(() => {
    const getAllPartners = async () => {
      const { data } = await axiosAuth.get(allPartnersRoute);
      let temp = [];
      data.map((provider) => temp.push({ id: provider.id, nom: provider.nom }));
      setProviders(temp);
    };
    getAllPartners();
  }, []);

  const handleSubmit = async (event) => {
    const { nom, provider, description } = course;
    event.preventDefault();
    setFormErrors(validate(course));
    if (Object.keys(validate(course)).length === 0) {
      const { data } = await axiosAuth.post(addCoursesRoute, {
        nom,
        provider: provider.id,
        description,
      });
      const ID = data.id;

      if (data.status) {
        if (file !== null) {
          const fd = new FormData();
          fd.append("image", file);
          fd.append("id", ID);
          fd.append("model", "cours");

          const config = {
            method: "post",
            url: uploadRoute,
            headers: {
              "content-Type": "multipart/form-data",
            },
            data: fd,
          };

          await axiosAuth(config);
        }

        closeAddModel(false);
        setUpdater(dispatch, !updater);
        setToastInfos(dispatch, {
          color: "success",
          message: "Course Added Successfully",
        });
        openSnackBar(true);
      } else {
        setToastInfos(dispatch, {
          color: "warning",
          message: data.msg,
        });
        openSnackBar(true);
      }
    }
  };

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setCourse((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleSelectedProvider = (event) => {
    const provider = event.target.value;
    setCourse((prev) => ({ ...prev, provider }));
    setSelectedProvider(provider);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.nom) {
      errors.coursename = "Course Name is required !";
    }
    if (!values.provider.id) {
      errors.provider = "Provider is required !";
    }
    if (!values.description) {
      errors.description = "Description is required !";
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
          Add Course
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
            <MDBox mb={2} mr={2} s sx={{ width: "50%" }}>
              <MDInput
                type="text"
                label="Course Name"
                variant="outlined"
                fullWidth
                name="nom"
                onChange={(e) => handleChange(e)}
                error={formErrors.coursename}
                defaultValue={sendEdit.nom}
              />
              <FormHelperText error>{formErrors.coursename}</FormHelperText>
            </MDBox>

            <MDBox mb={2} ml={2} sx={{ width: "50%" }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Provider</InputLabel>
                <Select
                  error={formErrors.provider}
                  name="provider"
                  sx={{ height: 45 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedProvider.name}
                  onChange={(e) => handleSelectedProvider(e)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 150,
                      },
                    },
                  }}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Provider" />
                  }
                >
                  {providers.map((provider) => (
                    <MenuItem key={provider.id} value={provider}>
                      {provider.nom}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>{formErrors.provider}</FormHelperText>
              </FormControl>
            </MDBox>
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Description"
              variant="outlined"
              name="description"
              fullWidth
              onChange={(e) => handleChange(e)}
              error={formErrors.description}
              defaultValue={sendEdit.description}
            />
            <FormHelperText error>{formErrors.description}</FormHelperText>
          </MDBox>

          <Card>
            <MDBox p={0.4}>
              <DropFileInput
                title="Drag & Drop course logo here"
                name="image"
                onFileChange={(files) => setFile(files[0])}
              />
            </MDBox>
          </Card>

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

export default AddCourses;
