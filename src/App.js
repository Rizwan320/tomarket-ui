import { useState, useEffect } from "react";
import ReactGA from "react-ga4";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Sidenav from "muiComponents/Sidenav";
import DashboardLayout from "muiComponents/LayoutContainers/DashboardLayout";
import DashboardNavbar from "muiComponents/Navbars/DashboardNavbar";

import { setNavigate } from "./axios/navigate";
import { brandRoutes, distributorRoutes, superAdminRoutes } from "routes";
import { useMaterialUIController, setMiniSidenav } from "context";
import { useUser } from "context/userContext";
import PrivateRoute from "routes/privateRoutes";

import theme from "assets/theme";
import { logoCt as brandWhite, logoCtDark as brandDark } from "assets/assets";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const location = useLocation();
  const { user } = useUser();
  const isSuperAdmin = user?.user?.isSuperAdmin ?? false;
  const accountType = user?.user?.account?.accountType ?? "";
  const navigate = useNavigate();
  setNavigate(navigate);

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
  }, []);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // List of paths where Sidenav should be hidden
  const excludedPaths = ["/privacy-policy", "/authentication/sign-in", "/authentication/sign-up"];

  const routes = isSuperAdmin
    ? superAdminRoutes
    : accountType === "distributor"
    ? distributorRoutes
    : brandRoutes;

  const shouldRenderSidenav =
    layout === "dashboard" && user.isAuthenticated && !excludedPaths.includes(pathname);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.children) {
        return getRoutes(route.children);
      }
      if (!route.route) return null;

      let RouteElement;

      if (route.isPrivate) {
        RouteElement = <PrivateRoute>{route.component}</PrivateRoute>;
      } else {
        RouteElement = route.component;
      }
      if (route.isNavbar) {
        return (
          <Route
            exact
            path={route.route}
            element={
              <DashboardLayout>
                <DashboardNavbar />
                {RouteElement}
              </DashboardLayout>
            }
            key={route.key}
          />
        );
      }

      return <Route exact path={route.route} element={RouteElement} key={route.key} />;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {shouldRenderSidenav && (
        <Sidenav
          color={sidenavColor}
          brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
          CompanyName="ToMarket"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      )}
      <Routes>
        {getRoutes(routes)}
        <Route
          path="*"
          element={
            user.isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/authentication/sign-in" />
            )
          }
        />
      </Routes>
    </ThemeProvider>
  );
}
