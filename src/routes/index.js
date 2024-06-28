import Icon from "@mui/material/Icon";

import Wcw from "layouts/wcw";
import Profile from "layouts/profile";
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ContentOrganization from "layouts/contentOrganization";
import BrandDetail from "layouts/brandDetail";
import PaymentDetails from "layouts/payments/components/paymentDetails";
import Products from "layouts/products";
import EditProduct from "layouts/products/editProduct";
import StripeForm from "stripe";
import Payments from "layouts/payments";
import Buyers from "layouts/Buyers";
import SalesRep from "layouts/sales-rep";
import Users from "layouts/dashboard/users";
import DistributorDashboard from "layouts/distributor-dashboard";
import Plugins from "layouts/plugins";

export const brandRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    isPrivate: true,
    isNavbar: true,
  },
  // {
  //   type: "collapse",
  //   name: "WCW",
  //   key: "wcw",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/wcw",
  //   component: <Wcw />,
  //   isPrivate: true,
  //   isNavbar: true,
  // },
  {
    type: "collapse",
    name: "Products",
    key: "products",
    icon: <Icon fontSize="small">table</Icon>,
    route: "/products",
    component: <Products />,
    isPrivate: true,
    isNavbar: true,
  },
  {
    type: "collapse",
    name: "Content Organization",
    key: "content-organization",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/content-organization",
    component: <ContentOrganization />,
    isPrivate: true,
    isNavbar: true,
  },
  {
    type: "collapse",
    name: "Buyers",
    key: "buyers",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/buyers",
    component: <Buyers />,
    isPrivate: true,
    isNavbar: true,
  },
  {
    type: "collapse",
    name: "Plugins",
    key: "plugins",
    icon: <Icon fontSize="small">shopify</Icon>,
    route: "/plugins",
    component: <Plugins />,
    isPrivate: true,
    isNavbar: true,
  },
  {
    type: "collapse",
    name: "Settings",
    href: true,
    key: "profile",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/profile",
    component: <Profile />,
    isPrivate: true,
    isNavbar: true,
    children: [
      {
        type: "collapse",
        name: "Users",
        key: "users",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/users",
        component: <Users />,
        isPrivate: true,
        isNavbar: true,
      },
    ],
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    isPrivate: false,
    isNavbar: false,
  },

  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
    isPrivate: false,
    isNavbar: false,
  },
  {
    name: "product/:id",
    key: "product/:id",
    route: "/product/:id",
    component: <EditProduct />,
    isPrivate: true,
    isNavbar: true,
  },
];

export const distributorRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">table</Icon>,
    route: "/dashboard",
    component: <DistributorDashboard />,
    isPrivate: true,
    isNavbar: true,
  },
  // {
  //   type: "collapse",
  //   name: "Content Organization",
  //   key: "content-organization",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/content-organization",
  //   component: <ContentOrganization />,
  //   isPrivate: true,
  //   isNavbar: true,
  // },
  {
    name: "Brands Details",
    key: "Brands-Details",
    route: "/brand-detail/:id",
    component: <BrandDetail />,
    isPrivate: true,
    isNavbar: true,
  },
  {
    type: "collapse",
    name: "Payments",
    key: "payments",
    icon: <Icon fontSize="small">payments</Icon>,
    route: "/payments",
    component: <Payments />,
    isPrivate: true,
    isNavbar: true,
  },
  {
    type: "collapse",
    name: "Plugins",
    key: "plugins",
    icon: <Icon fontSize="small">shopify</Icon>,
    route: "/plugins",
    component: <Plugins />,
    isPrivate: true,
    isNavbar: true,
  },
  {
    name: "Payment Details",
    key: "Payment-Details",
    route: "/payment-detail/:id",
    component: <PaymentDetails />,
    isPrivate: true,
    isNavbar: true,
  },
  {
    type: "collapse",
    name: "Settings",
    href: true,
    key: "profile",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/profile",
    component: <Profile />,
    isPrivate: true,
    isNavbar: true,
    children: [
      {
        type: "collapse",
        name: "Users",
        key: "users",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/users",
        component: <Users />,
        isPrivate: true,
        isNavbar: true,
      },
      {
        type: "collapse",
        name: "Sales Rep",
        key: "sales-rep",
        icon: <Icon fontSize="small">attach_money</Icon>,
        route: "/sales-rep",
        component: <SalesRep />,
        isPrivate: true,
        isNavbar: true,
      },
    ],
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    isPrivate: false,
    isNavbar: false,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
    isPrivate: false,
    isNavbar: false,
  },
  {
    name: "Payment",
    key: "payment",
    route: "/payment/:id",
    isPrivate: false,
    isNavbar: true,
    component: <StripeForm />,
  },
];
