import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Sidenav from "muiComponents/Sidenav";
import DashboardLayout from "muiComponents/LayoutContainers/DashboardLayout";
import DashboardNavbar from "muiComponents/Navbars/DashboardNavbar";
import { brandRoutes, distributorRoutes } from "routes";
import { useMaterialUIController, setMiniSidenav } from "context";
import { useUser } from "context/userContext";
import PrivateRoute from "routes/privateRoutes";

import theme from "assets/theme";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

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
  const { user } = useUser();

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
          routes={
            user?.user?.account.accountType === "distributor" ? distributorRoutes : brandRoutes
          }
          // routes={brandRoutes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      )}
      <Routes>
        {getRoutes(
          user?.user?.account.accountType === "distributor" ? distributorRoutes : brandRoutes
        )}
        {/* {getRoutes(brandRoutes)} */}
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
