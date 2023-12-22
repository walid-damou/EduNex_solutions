import SignIn from "layouts/authentication/sign-in";
import Logout from "layouts/authentication/logout";
import routes_societe from "routes/routes_societe";
import routes_ampresta from "routes/routes_presta";
import routes_collab from "routes/routes_collab";

// @mui icons
import Icon from "@mui/material/Icon";
function Route(type) {
  let normalroutes = [
    {
      type: "collapse",
      name: "Login",
      key: "login",
      icon: <Icon fontSize="small">key</Icon>,
      route: "/login",
      component: <SignIn />,
    },
    {
      type: "collapse",
      name: "Logout",
      key: "Logout",
      icon: <Icon fontSize="small">lock</Icon>,
      route: "/logout",
      component: <Logout />,
    },
  ];
  let routes = normalroutes;
  if (type === "Societe") {
    routes = routes_societe;
  } else if (type === "Superadmin") {
    routes = routes_ampresta;
  } else if (type === "Collab") {
    routes = routes_collab;
  }
  return routes;
}
export default Route;
