import { lazy } from "react";
// @mui icons
import Icon from "@mui/material/Icon";
const Logout = lazy(() => import("layouts/authentication/logout"));
const ResetPassword = lazy(() =>
  import("layouts/authentication/reset-password")
);
const Sessions = lazy(() => import("layouts/sessions/ampresta"));
const Partners = lazy(() => import("layouts/partners"));
const Courses = lazy(() => import("layouts/courses/ampresta_courses"));
const Collabs = lazy(() => import("layouts/collabs/ampresta"));
const Departments = lazy(() => import("layouts/departments/ampresta"));
const Companies = lazy(() => import("layouts/companies"));
const Quota = lazy(() => import("layouts/quota"));
const Vouchers = lazy(() => import("layouts/vouchers/ampresta"));
const Error404 = lazy(() => import("layouts/error404"));
const SignIn = lazy(() => import("layouts/authentication/sign-in"));
const Dashboard = lazy(() => import("layouts/dashboard/ampresta_dash"));

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
    name: "Companies",
    key: "companies",
    icon: <Icon fontSize="small">business</Icon>,
    route: "/companies",
    component: <Companies />,
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
    name: "Partners",
    key: "partners",
    icon: <Icon fontSize="small">handshake</Icon>,
    route: "/partners",
    component: <Partners />,
  },
  {
    type: "collapse",
    name: "Quota",
    key: "quota",
    icon: <Icon fontSize="small">table</Icon>,
    route: "/quota",
    component: <Quota />,
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
    name: "Sessions",
    key: "sessions",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/sessions",
    component: <Sessions />,
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
    icon: <Icon fontSize="small">key</Icon>,
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
    name: "Reset",
    key: "reset",
    route: "/reset",
    component: <ResetPassword />,
  },
  {
    name: "Error404",
    key: "Error404",
    route: "/Error404",
    component: <Error404 />,
  },
];

export default routes;
