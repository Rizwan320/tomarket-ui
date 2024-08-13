import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import MDTabs from "components/MDTabs";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Grid } from "@mui/material";
import DataTable from "muiComponents/Tables/DataTable";
import Loader from "components/Loader";
import distributorsData from "./distributorData";
import api from "../../axios";
import connectionRequestsData from "layouts/brands/connectionRequestsData";

const Distributor = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("distributors");
  const [distributorsTableData, setDistributorsTableData] = useState([]);
  const [connectionRequestsTableData, setConnectionRequestsTableData] = useState([]);

  const tabs = [
    { heading: "All Distributors", accessor: "distributors" },
    { heading: "My Distributors", accessor: "confirmed" },
    { heading: "Distributors' Requests", accessor: "request_by_distributor" },
  ];

  const fetchDistributors = async () => {
    try {
      setLoading(true);
      const response = await api.get("connections/nonconnected-distributors");
      if (response.data) {
        setDistributorsTableData(response.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchConnectionRequests = async (state) => {
      try {
        setLoading(true);
        const response = await api.get(`connections/brand?state=${state}`);
        if (response.data) {
          setConnectionRequestsTableData(
            response.data.map((item) => ({
              id: item.id,
              name: item.distributor.name,
              state: item.state,
            }))
          );
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (activeTab !== "distributors") {
      fetchConnectionRequests(activeTab);
    } else {
      fetchDistributors();
    }
  }, [activeTab]);

  useEffect(() => {
    fetchDistributors();
  }, []);

  const { columns, rows } =
    activeTab === "distributors"
      ? distributorsData(distributorsTableData)
      : connectionRequestsData(connectionRequestsTableData);

  return (
    <>
      {loading && <Loader />}
      <Card>
        <Grid container p={3}>
          <Grid item xs={12} lg={6} display="flex" alignItems="center">
            <MDBox>
              <MDTypography variant="h6" gutterBottom>
                Distributors
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MDTabs tabs={tabs} setActiveTab={setActiveTab} />
          </Grid>
        </Grid>
        <MDBox>
          <DataTable
            table={{ columns, rows }}
            showTotalEntries={true}
            isSorted={true}
            noEndBorder
            showCheckbox={false}
            entriesPerPage={false}
          />
        </MDBox>
      </Card>
    </>
  );
};

export default Distributor;
