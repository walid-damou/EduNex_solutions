// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

//import UseState Hook
import { useEffect, useState } from "react";

// Axios
import axios from "services/authAxios";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater, setToastInfos } from "context";

import {
  allCompaniesRoute,
  allPartnersRoute,
  addVouchersAdminRoute,
} from "utils/APIRoutes";

function AddCollab({ closeAddModel, openSnackBar }) {
  const [formErrors, setFormErrors] = useState({
    company: "",
    provider: "",
    code: "",
  });

  const [voucher, setVoucher] = useState({
    company: "",
    provider: "",
    code: "",
  });

  const [allCompanies, setAllCompanies] = useState();
  const [allProviders, setAllProviders] = useState();

  const [controller, dispatch] = useMaterialUIController();
  const { updater } = controller;

  useEffect(() => {
    const getAllCompanies = async () => {
      const { data } = await axios.get(allCompaniesRoute);
      let temp = [];
      data.msg.map((provider) =>
        temp.push({ id: provider.id, nom: provider.name })
      );
      setAllCompanies(temp);
    };
    getAllCompanies();
  }, []);

  useEffect(() => {
    const getAllProviders = async () => {
      const { data } = await axios.get(allPartnersRoute);
      let temp = [];
      data.map((provider) => temp.push({ id: provider.id, nom: provider.nom }));
      setAllProviders(temp);
    };
    getAllProviders();
  }, []);

  const handleSelectedCompany = (event) => {
    const company = event.target.value;
    setVoucher((prev) => ({ ...prev, company }));
  };

  const handleSelectedProvider = (event) => {
    const provider = event.target.value;
    setVoucher((prev) => ({ ...prev, provider }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrors(validate(voucher));
    if (Object.keys(validate(voucher)).length === 0) {
      const requestDATA = { vouchers: [] };
      requestDATA.vouchers.push({
        societe: voucher.company.nom,
        code: voucher.code,
        provider: voucher.provider.nom,
      });
      const { data } = await axios.post(addVouchersAdminRoute, requestDATA);

      if (data.status) {
        closeAddModel(false);
        setUpdater(dispatch, !updater);
        setToastInfos(dispatch, {
          color: "success",
          message: "Voucher Added Successfully",
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
    setVoucher((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.company) {
      errors.company = "Company Name is required !";
    }
    if (!values.provider) {
      errors.provider = "Provider Name is required !";
    }
    if (!values.code) {
      errors.code = "Voucher Code is required !";
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
          Add Voucher
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
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Company</InputLabel>
                <Select
                  error={formErrors.company}
                  name="provider"
                  sx={{ height: 45 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
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
                  {Array.isArray(allCompanies) &&
                    allCompanies.length > 0 &&
                    allCompanies.map((company) => (
                      <MenuItem key={company.id} value={company}>
                        {company.nom}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText error>{formErrors.company}</FormHelperText>
              </FormControl>
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
                  {Array.isArray(allProviders) &&
                    allProviders.length > 0 &&
                    allProviders.map((provider) => (
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
              label="Code"
              variant="outlined"
              fullWidth
              name="code"
              onChange={(e) => handleChange(e)}
              error={formErrors.code}
            />
            <FormHelperText error>{formErrors.code}</FormHelperText>
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

export default AddCollab;
