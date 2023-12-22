// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

//import UseState Hook
import { useState, useEffect } from "react";

// Axios
import axios from "services/authAxios";

import { AddQuotaRoute, AllQuotaRoute } from "utils/APIRoutes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setUpdater, setToastInfos } from "context";

function AddQuota({ openAddModel, companyID, openSnackBar }) {
  const [providers, setProviders] = useState([]);

  const [loading, setLoading] = useState(false);

  const [controller, dispatch] = useMaterialUIController();
  const { updater } = controller;

  useEffect(() => {
    const getAllPartners = async () => {
      axios.post(AllQuotaRoute, { SocieteId: companyID }).then((response) => {
        const { data } = response;
        let temp = [];
        data.map((provider) => {
          let quota = 0;
          if (provider.Quota.length > 0) {
            quota = provider.Quota[0].quota;
          }
          temp.push({
            id: provider.id,
            nom: provider.nom,
            quota: quota,
          });
        });
        setProviders(temp);
        setLoading(true);
      });
    };
    getAllPartners();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const quotas = [];
    providers.map((provider) =>
      quotas.push({
        provider: provider.id,
        societe: companyID,
        quota: provider.quota,
      })
    );
    const { data } = await axios.post(AddQuotaRoute, {
      quotas,
    });
    if (data.status) {
      openAddModel(false);
      setUpdater(dispatch, !updater);
      setToastInfos(dispatch, {
        color: "success",
        message: "Quota Updated Successfully",
      });
      openSnackBar(true);
    } else {
      setToastInfos(dispatch, { color: "warning", message: data.msg });
      openSnackBar(true);
    }
  };

  const handleChange = (index, event) => {
    const quota = event.target.value;
    const values = [...providers];
    values[index].quota = quota;
    setProviders(values);
  };

  return (
    <Card sx={{ mt: "50px" }}>
      {loading && (
        <>
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
              Edit Quota
            </MDTypography>

            <MDButton
              variant="gradient"
              color="dark"
              size="small"
              iconOnly
              onClick={() => openAddModel(false)}
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
              {providers.map((provider, index) => (
                <MDBox display="flex" key={provider.id}>
                  <MDBox mb={2} mr={2} s sx={{ width: "50%" }}>
                    <MDInput
                      type="text"
                      value={provider.nom}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </MDBox>

                  <MDBox mb={2} ml={2} sx={{ width: "50%" }}>
                    <MDInput
                      type="number"
                      label="Quantity"
                      variant="outlined"
                      fullWidth
                      name="quota"
                      defaultValue={provider.quota} // <--- hadi ra Vri walakin render laho ra2y akhar
                      onChange={(event) => handleChange(index, event)}
                    />
                  </MDBox>
                </MDBox>
              ))}

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
        </>
      )}
    </Card>
  );
}

export default AddQuota;
