import { useEffect } from "react";

import { useLocation } from "react-router-dom";

import MDBox from "components/MDBox";

import { useMaterialUIController, setLayout } from "context";

const PageLayout = ({ background, children }) => {
  const [, dispatch] = useMaterialUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "page");
  }, [pathname]);

  return (
    <MDBox
      width="98vw"
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: "hidden", overflowY: "auto" }}
    >
      {children}
    </MDBox>
  );
};

export default PageLayout;
