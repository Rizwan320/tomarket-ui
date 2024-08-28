import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MDBox from "components/MDBox";
import breakpoints from "assets/theme/base/breakpoints";

const MDTabs = ({ tabs, setActiveTab }) => {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => {
    setActiveTab(tabs[newValue]?.accessor || tabs[newValue]);
    setTabValue(newValue);
  };

  return (
    <MDBox position="relative">
      <MDBox display="flex" alignItems="center" position="relative" borderRadius="xl" />
      <AppBar position="static">
        <Tabs
          orientation={tabsOrientation}
          value={tabValue}
          onChange={handleSetTabValue}
          sx={{ p: 1 }}
        >
          {tabs?.map((tab, index) => (
            <Tab key={index} label={tab?.heading} icon={tab?.icon} sx={{ px: 2 }} />
          ))}
        </Tabs>
      </AppBar>
    </MDBox>
  );
};

export default MDTabs;
