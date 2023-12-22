import { lazy } from "react";
// @mui icons
import Icon from "@mui/material/Icon";
const Profile = lazy(() => import("layouts/profile"));
const MyRequests = lazy(() => import("layouts/MyRequests"));
const Logout = lazy(() => import("layouts/authentication/logout"));
const Sessions = lazy(() => import("layouts/sessions/collab"));
const Vouchers = lazy(() => import("layouts/vouchers/collab"));
const Error404 = lazy(() => import("layouts/error404"));
const SignIn = lazy(() => import("layouts/authentication/sign-in"));
const Dashboard = lazy(() => import("layouts/dashboard/collab_dash"));
const SessionsDetails = lazy(() => import("layouts/sessionsDetails"));
const CoursesDetails = lazy(() =>
  import("layouts/courses catalogue/chooseCourse")
);
const CatalogueCourses = lazy(() => import("layouts/courses catalogue"));
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Catalogue",
    key: "catalogue",
    icon: <Icon fontSize="small">apps</Icon>,
    route: "/catalogue",
    component: <CatalogueCourses />,
  },
  {
    type: "collapse",
    name: "My Sessions",
    key: "mySessions",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/mySessions",
    component: <Sessions />,
  },
  {
    name: "details",
    key: "details",
    route: "/sessions/details/:id",
    component: <SessionsDetails />,
  },
  {
    type: "collapse",
    name: "My Vouchers",
    key: "vouchers",
    icon: <Icon fontSize="small">local_activity</Icon>,
    route: "/vouchers",
    component: <Vouchers />,
  },
  {
    type: "collapse",
    name: "My Requests",
    key: "requests",
    icon: <Icon fontSize="small">warning</Icon>,
    route: "/requests",
    component: <MyRequests />,
  },
  {
    type: "collapse",
    name: "My Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "divider",
  },
  {
    type: "collapse",
    name: "Logout",
    key: "Logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
    component: <Logout />,
  },
  {
    type: "divider",
  },
  {
    name: "Login",
    key: "login",
    route: "/login",
    component: <SignIn />,
  },
  {
    name: "Error404",
    key: "Error404",
    route: "/Error404",
    component: <Error404 />,
  },
  {
    name: "details",
    key: "details",
    route: "/catalogue/details/:id",
    component: <CoursesDetails />,
  },
];

export default routes;
