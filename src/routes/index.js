import { Suspense, lazy } from "react";
import Icon from "@mui/material/Icon";

import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import PrivacyPolicy from "layouts/PrivacyPolicy";

const Wcw = lazy(() => import("layouts/wcw"));
const Users = lazy(() => import("layouts/users"));
const Buyers = lazy(() => import("layouts/Buyers"));
const Plugins = lazy(() => import("layouts/plugins"));
const Profile = lazy(() => import("layouts/profile"));
const Settings = lazy(() => import("layouts/settings"));
const SalesRep = lazy(() => import("layouts/sales-rep"));
const Products = lazy(() => import("layouts/products"));
const Payments = lazy(() => import("layouts/payments"));
const Dashboard = lazy(() => import("layouts/dashboard"));
const StripeForm = lazy(() => import("stripe"));
const BrandDetail = lazy(() => import("layouts/brandDetail"));
const EditProduct = lazy(() => import("layouts/products/editProduct"));
const PaymentDetails = lazy(() => import("layouts/payments/components/paymentDetails"));
const ContentOrganization = lazy(() => import("layouts/contentOrganization"));
const DistributorDashboard = lazy(() => import("layouts/distributor-dashboard"));
const EditBuyer = lazy(() => import("layouts/Buyers/editBuyer"));

const SuspendedComponent = (Component) => (
  <Suspense>
    <Component />
  </Suspense>
);

export const brandRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: SuspendedComponent(Dashboard),
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
    component: SuspendedComponent(Products),
    isPrivate: true,
    isNavbar: true,
  },
  {
    type: "collapse",
    name: "Content Organization",
    key: "content-organization",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/content-organization",
    component: SuspendedComponent(ContentOrganization),
    isPrivate: true,
    isNavbar: true,
  },
  {
    type: "collapse",
    name: "Buyers",
    key: "buyers",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/buyers",
    component: SuspendedComponent(Buyers),
    isPrivate: true,
    isNavbar: true,
  },
  {
    type: "collapse",
    name: "Plugins",
    key: "plugins",
    icon: <Icon fontSize="small">shopify</Icon>,
    route: "/plugins",
    component: SuspendedComponent(Plugins),
    isPrivate: true,
    isNavbar: true,
  },
  {
    type: "collapse",
    name: "Settings",
    href: true,
    key: "settings",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/settings",
    component: SuspendedComponent(Settings),
    isPrivate: true,
    isNavbar: true,
    children: [
      {
        type: "collapse",
        name: "Users",
        key: "users",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/users",
        component: SuspendedComponent(Users),
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
    name: "Privacy Policy",
    key: "privacyPolicy",
    route: "/privacy-policy",
    component: <PrivacyPolicy />,
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
    name: "Edit Product",
    key: "product/:id",
    route: "/product/:id",
    component: SuspendedComponent(EditProduct),
    isPrivate: true,
    isNavbar: true,
  },
  {
    name: "Edit Buyer",
    key: "editbuyer",
    route: "/editbuyer/:id",
    component: SuspendedComponent(EditBuyer),
    isPrivate: true,
    isNavbar: true,
  },
  {
    name: "Profile",
    key: "Profile",
    icon: <Icon fontSize="small">table</Icon>,
    route: "/profile",
    component: SuspendedComponent(Profile),
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
    component: SuspendedComponent(DistributorDashboard),
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
    component: SuspendedComponent(BrandDetail),
    isPrivate: true,
    isNavbar: true,
  },
  {
    type: "collapse",
    name: "Payments",
    key: "payments",
    icon: <Icon fontSize="small">payments</Icon>,
    route: "/payments",
    component: SuspendedComponent(Payments),
    isPrivate: true,
    isNavbar: true,
  },
  {
    type: "collapse",
    name: "Plugins",
    key: "plugins",
    icon: <Icon fontSize="small">shopify</Icon>,
    route: "/plugins",
    component: SuspendedComponent(Plugins),
    isPrivate: true,
    isNavbar: true,
  },
  {
    name: "Payment Details",
    key: "Payment-Details",
    route: "/payment-detail/:id",
    component: SuspendedComponent(PaymentDetails),
    isPrivate: true,
    isNavbar: true,
  },
  {
    type: "collapse",
    name: "Settings",
    href: true,
    key: "settings",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/settings",
    component: SuspendedComponent(Settings),
    isPrivate: true,
    isNavbar: true,
    children: [
      {
        name: "Users",
        key: "users",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/users",
        component: SuspendedComponent(Users),
        isPrivate: true,
        isNavbar: true,
      },
      {
        type: "collapse",
        name: "Sales Rep",
        key: "sales-rep",
        icon: <Icon fontSize="small">attach_money</Icon>,
        route: "/sales-rep",
        component: SuspendedComponent(SalesRep),
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
    component: SuspendedComponent(StripeForm),
  },
];
