import MDBox from "components/MDBox";

import DashboardLayout from "muiComponents/LayoutContainers/DashboardLayout";
import DashboardNavbar from "muiComponents/Navbars/DashboardNavbar";

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>Hello Settings ....</MDBox>
    </DashboardLayout>
  );
}

export default Overview;
