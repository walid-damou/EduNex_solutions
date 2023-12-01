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
import { useState, useEffect } from "react";

// Axios
import axios from "services/authAxios";

// Material Dashboard 2 React contexts
import { useParams } from "react-router-dom";
import { SessionCollabRoute, sendEmailRoute } from "utils/APIRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setToastInfos } from "context";

export default function NotifyEmail({
  closeAddModel,
  openSnackBar,
  closeNotify,
}) {
  const { id } = useParams();
  const [emails, setEmails] = useState([]);

  const [, dispatch] = useMaterialUIController();

  const [formErrors, setFormErrors] = useState({
    subject: "",
    message: "",
  });

  const [form, setForm] = useState({
    subject: "",
    message: "",
  });

  useEffect(() => {
    const getCollab = async () => {
      const { data } = await axios.post(SessionCollabRoute, {
        sess: id,
      });
      const temp_emails = data.collab.map((collab) => collab.User.email);
      setEmails(temp_emails);
    };
    getCollab();
  }, []);

  const handleSubmit = async (event) => {
    const { subject, message } = form;
    event.preventDefault();
    setFormErrors(validate(form));
    if (Object.keys(validate(form)).length === 0) {
      const data = await axios.post(sendEmailRoute, {
        email: emails,
        subject: subject,
        message: message,
      });

      if (data.status === 200) {
        closeNotify(false);
        setToastInfos(dispatch, {
          color: "success",
          message: "Email Sent Successfully",
        });
        openSnackBar(true);
      }
    }
  };

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setForm((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.subject) {
      errors.subject = "Subject is required";
    }
    if (!values.message) {
      errors.message = "Message is required !";
    }
    return errors;
  };

  return (
    <Card>
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
        mt={3}
        mb={1}
      >
        <MDTypography variant="h6" color="white">
          Notify Collaborators
        </MDTypography>

        <MDButton
          variant="gradient"
          color="dark"
          size="small"
          iconOnly
          onClick={() => closeNotify(false)}
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
              label="Subject"
              variant="outlined"
              name="subject"
              fullWidth
              onChange={(e) => handleChange(e)}
              error={formErrors.subject}
            />
            <FormHelperText error>{formErrors.subject}</FormHelperText>
          </MDBox>

          <MDInput
            type="text"
            label="Message"
            variant="outlined"
            name="message"
            multiline
            fullWidth
            onChange={(e) => handleChange(e)}
            error={formErrors.message}
            rows={5}
          />
          <FormHelperText error>{formErrors.message}</FormHelperText>

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
