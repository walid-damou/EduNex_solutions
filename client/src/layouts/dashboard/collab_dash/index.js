// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MenuCards from "examples/Cards/MenuCards";
import { useEffect } from "react";
import axios from "services/authAxios";
import { CollabDashboard } from "utils/APIRoutes";
import { useState } from "react";

function Dashboard() {
  const [collabdata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getStats = async () => {
      const { data } = await axios.get(CollabDashboard);
      if (data.status) {
        setData(data);
        console.log(data);
        setLoading(true);
      }
    };
    getStats();
  }, []);
  const MenuList = [
    {
      id: 1,
      color: "error",
      icon: "warning",
      title: "My Requests",
      description: "All requests I sent to enroll in a course",
      route: "/requests",
      value: loading && collabdata.requests,
    },
    {
      id: 2,
      color: "info",
      icon: "apps",
      title: "Catalogue",
      description: "All the courses I can choose to enroll in",
      route: "/catalogue",
      value: "1",
    },
    {
      id: 3,
      color: "success",
      icon: "school",
      title: "My Sessions",
      description: "All requests I sent to enroll in a course",
      route: "/mySessions",
      value: loading && collabdata.sessions,
    },
    {
      id: 4,
      color: "dark",
      icon: "local_activity",
      title: "My Vouchers",
      description: "Code with which I can pass an exam",
      route: "/myVouchers",
      value: loading && collabdata.vouchers,
    },
    {
      id: 5,
      color: "secondary",
      icon: "verified",
      title: "My Certificates",
      description: "Approved certificates I can download",
      route: "/",
      value: loading && collabdata.certifs,
    },
    {
      id: 6,
      color: "primary",
      icon: "settings",
      title: "My informations",
      description: "Personal Informations I can change",
      route: "/profile",
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar collab />
      <MDBox py={3}>
        <Grid container spacing={2} rowSpacing={1}>
          {MenuList.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <MDBox mb={1}>
                <MenuCards
                  color={item.color}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  route={item.route}
                  value={item.value}
                />
              </MDBox>
            </Grid>
          ))}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
