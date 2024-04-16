import Icon from "@mui/material/Icon";

import Wcw from "layouts/wcw";
import Profile from "layouts/profile";
import TablePage from "layouts/table";
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ContentOrganization from "layouts/contentOrganization";
import BrandDetail from "layouts/brandDetail";

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
    name: "WCW",
    key: "wcw",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/wcw",
    component: <Wcw />,
  },
  {
    type: "collapse",
    name: "Settings",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Content Organization",
    key: "content-organization",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/content-organization",
    component: <ContentOrganization />,
  },
  {
    type: "collapse",
    name: "Brands Table",
    key: "Brands-Table",
    icon: <Icon fontSize="small">table</Icon>,
    route: "/brands-table",
    component: <TablePage />,
  },
  {
    name: "Brands Details",
    key: "Brands-Details",
    route: "/brand-detail/:id",
    component: <BrandDetail />,
  },
];

export default routes;
