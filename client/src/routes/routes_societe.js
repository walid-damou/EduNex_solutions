// @mui icons
import Icon from "@mui/material/Icon";
import { lazy } from "react";
const CoursesDetails = lazy(() =>
  import("layouts/courses/courses catalogue/chooseCourse")
);
const Logout = lazy(() => import("layouts/authentication/logout"));
const Sessions = lazy(() => import("layouts/sessions/societe"));
const SessionsDetails = lazy(() => import("layouts/sessionsDetails"));
const Courses = lazy(() => import("layouts/courses/courses catalogue"));
const Collabs = lazy(() => import("layouts/collabs/societe"));
const Departments = lazy(() => import("layouts/departments/societe"));
const Requests = lazy(() => import("layouts/requests"));
const Vouchers = lazy(() => import("layouts/vouchers/societe"));
const Error404 = lazy(() => import("layouts/error404"));
const SignIn = lazy(() => import("layouts/authentication/sign-in"));
const Dashboard = lazy(() => import("layouts/dashboard/societe_dash"));

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
    name: "Courses",
    key: "courses",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/courses",
    component: <Courses />,
  },
  {
    type: "collapse",
    name: "Departments",
    key: "departments",
    icon: <Icon fontSize="small">apartment</Icon>,
    route: "/departments",
    component: <Departments />,
  },
  {
    type: "collapse",
    name: "Requests",
    key: "requests",
    icon: <Icon fontSize="small">help</Icon>,
    route: "/requests",
    component: <Requests />,
  },
  {
    type: "collapse",
    name: "Sessions",
    key: "sessions",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/sessions",
    component: <Sessions />,
  },
  {
    name: "details",
    key: "details",
    icon: <Icon fontSize="small">check</Icon>,
    route: "/sessions/details/:id",
    component: <SessionsDetails />,
  },
  {
    type: "collapse",
    name: "Collaborators",
    key: "collaborators",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/collaborators",
    component: <Collabs />,
  },
  {
    type: "collapse",
    name: "Vouchers",
    key: "vouchers",
    icon: <Icon fontSize="small">local_activity</Icon>,
    route: "/vouchers",
    component: <Vouchers />,
  },
  {
    name: "Login",
    key: "login",
    route: "/login",
    component: <SignIn />,
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
    name: "Error404",
    key: "Error404",
    icon: <Icon fontSize="small">error</Icon>,
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
