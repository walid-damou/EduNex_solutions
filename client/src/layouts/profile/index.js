import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Overview page components
import Header from "layouts/profile/components/Header";
import ProfileInfoCard from "./components/ProfileInfoCard";
import ChangePassword from "./components/ChangePassword";

import axios from "services/authAxios";
import { getProfileRoute } from "utils/APIRoutes";
import { updateProfileRoute } from "utils/APIRoutes";
import MySnackBar from "components/MySnackBar";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setToastInfos } from "context";

function Overview() {
  const [controller, dispatch] = useMaterialUIController();
  const { toastInfos } = controller;

  const [tabValue, setTabValue] = useState("0");
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const labels = [];
  const values = [];

  const [infosProfile, setInfosProfile] = useState({});
  const [userSociete, setUserSociete] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [userNom, setUserNom] = useState(null);
  const [userPrenom, setUserPrenom] = useState(null);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await axios.post(getProfileRoute);
      const { nom, prenom, email_institu, Societe, User, image } = data;
      setInfosProfile({
        username: User.username,
        emailPerso: User.email,
        emailInstitu: email_institu,
      });
     // setUserSociete(Societe.name);
	    setUserSociete(Societe ? Societe.name : "Societe non définie");
      setUserAvatar(image);
      setUserNom(nom);
      setUserPrenom(prenom);
    };
    getProfile();
  }, []);

  const handleChange = (event) => {
    console.log(event.target.name);
    setInfosProfile((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(infosProfile).forEach((el) => {
    labels.push(el);
  });

  // Push the object values into the values array
  Object.values(infosProfile).forEach((el) => values.push(el));

  const updateProfile = async (event) => {
    event.preventDefault();
    const data = await axios.post(updateProfileRoute, {
      nom: userNom,
      prenom: userPrenom,
      email: infosProfile.emailPerso,
      username: infosProfile.username,
    });

    if (data.status === 200) {
      setToastInfos(dispatch, {
        color: "success",
        message: "Profile Updated Successfully",
      });
      setOpenSnackBar(true);
    } else {
      setToastInfos(dispatch, { color: "warning", message: data.msg });
      setOpenSnackBar(true);
    }
  };

  const paginate = [
    {
      label: "Profile",
      icon: <Icon fontSize="small">person</Icon>,
    },
    {
      label: "Password",
      icon: <Icon fontSize="small">key</Icon>,
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar collab />
      <MDBox mb={3} />
      <Header>
        <TabContext value={tabValue}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              md={12}
              lg={3}
              sx={{ display: "flex", justifyContent: "center", mt: 5, mx: 1 }}
            >
              <AppBar position="static">
                <Tabs
                  orientation={"vertical"}
                  value={tabValue}
                  onChange={handleSetTabValue}
                >
                  {paginate.map((item, index) => (
                    <Tab
                      label={item.label}
                      icon={item.icon}
                      key={item.label}
                      value={index.toString()}
                    />
                  ))}
                </Tabs>
              </AppBar>
              <Divider orientation="vertical" sx={{ mx: 1, opacity: 0.8 }} />
            </Grid>

            <Grid item xs={12} md={12} lg={8} sx={{ display: "grid" }}>
              <TabPanel value="0">
                <ProfileInfoCard
                  shadow={false}
                  labels={labels}
                  values={values}
                  userAvatar={userAvatar}
                  userNom={userNom}
                  userPrenom={userPrenom}
                  userSociete={userSociete}
                  handleChange={handleChange}
                  updateProfile={updateProfile}
                  handleChangePrenom={setUserPrenom}
                  handleChangeNom={setUserNom}
                />
                {openSnackBar && (
                  <MySnackBar
                    color={toastInfos.color}
                    title={toastInfos.message}
                    open={openSnackBar}
                    close={() => setOpenSnackBar(!openSnackBar)}
                  />
                )}
              </TabPanel>
              <TabPanel value="1">
                <ChangePassword
                  shadow={false}
                  setOpenSnackBar={setOpenSnackBar}
                />
                {openSnackBar && (
                  <MySnackBar
                    color={toastInfos.color}
                    title={toastInfos.message}
                    open={openSnackBar}
                    close={() => setOpenSnackBar(!openSnackBar)}
                  />
                )}
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
