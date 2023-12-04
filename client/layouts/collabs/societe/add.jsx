// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FormHelperText from "@mui/material/FormHelperText";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

//import UseState Hook
import { useState } from "react";

import DropFileInput from "components/DropFileInput/DropFileInput";

// Axios
import axiosAuth from "services/authAxios";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater, setToastInfos } from "context";

import { addCollabsRoute, uploadRoute } from "utils/APIRoutes";

function AddCollab({ closeAddModel, openSnackBar }) {
  const [formErrors, setFormErrors] = useState({
    nom: "",
    prenom: "",
    mail: "",
  });

  const [collaborator, setCollaborator] = useState({
    nom: "",
    prenom: "",
    mail: "",
  });

  const [file, setFile] = useState(null);

  const [controller, dispatch] = useMaterialUIController();

  const { updater } = controller;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrors(validate(collaborator));
    if (Object.keys(validate(collaborator)).length === 0) {
      const { data } = await axiosAuth.post(addCollabsRoute, {
        account: {
          nom: collaborator.nom,
          prenom: collaborator.prenom,
          email: collaborator.mail,
        },
      });

      const ID = data.id;
      console.log(data);
      if (data.status) {
        const fd = new FormData();
        fd.append("image", file);
        fd.append("id", ID);
        fd.append("model", "Collaborateur");
        console.log(fd.getAll("image"));
        const config = {
          method: "post",
          url: uploadRoute,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: fd,
        };

        await axiosAuth(config);

        closeAddModel(false);
        setUpdater(dispatch, !updater);
        setToastInfos(dispatch, {
          color: "success",
          message: "Collaborator Added Successfully",
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
    setCollaborator((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.nom) {
      errors.nom = "Collaborator First Name is required !";
    }
    if (!values.prenom) {
      errors.prenom = "Collaborator Last Name is required !";
    }
    if (!values.mail) {
      errors.mail = "Collaborator Email is required !";
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
          Add Collaborator
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
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="First Name"
              variant="outlined"
              fullWidth
              name="prenom"
              onChange={(e) => handleChange(e)}
              error={formErrors.nom}
            />
            <FormHelperText error>{formErrors.nom}</FormHelperText>
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Last Name"
              variant="outlined"
              fullWidth
              name="nom"
              onChange={(e) => handleChange(e)}
              error={formErrors.prenom}
            />
            <FormHelperText error>{formErrors.prenom}</FormHelperText>
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Email"
              variant="outlined"
              fullWidth
              name="mail"
              onChange={(e) => handleChange(e)}
              error={formErrors.mail}
            />
            <FormHelperText error>{formErrors.mail}</FormHelperText>
          </MDBox>

          <Card>
            <MDBox>
              <DropFileInput
                title="Drag & Drop collab photo here"
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

export default AddCollab;
