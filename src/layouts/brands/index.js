import { useState, useEffect } from "react";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "muiComponents/Tables/DataTable";
import Loader from "components/Loader";
import brandsData from "./brandsData";
import api from "../../axios";
import MDTabs from "components/MDTabs";
import connectionRequestsData from "./connectionRequestsData";
import { Grid } from "@mui/material";

const Brands = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("brands");
  const [brandsTableData, setBrandsTableData] = useState([]);
  const [connectionRequestsTableData, setConnectionRequestsTableData] = useState([]);

  const tabs = [
    { heading: "All Brands", accessor: "brands" },
    { heading: "Brands' Requests", accessor: "request_by_brand" },
  ];

  useEffect(() => {
    const fetchConnectionRequests = async (state) => {
      try {
        setLoading(true);
        const response = await api.get(`connections/distributor?state=${state}`);
        console.log(response);
        if (response.data) {
          setConnectionRequestsTableData(
            response.data.map((item) => ({ id: item.id, name: item.brand.name, state: item.state }))
          );
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (activeTab !== "brands") {
      fetchConnectionRequests(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const response = await api.get("accounts/brands");
        if (response.data) {
          setBrandsTableData(response.data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const { columns, rows } =
    activeTab === "brands"
      ? brandsData(brandsTableData)
      : connectionRequestsData(connectionRequestsTableData, setConnectionRequestsTableData);

  return (
    <>
      {loading && <Loader />}
      <Card>
        <Grid container p={3}>
          <Grid item xs={12} lg={6} display="flex" alignItems="center">
            <MDBox>
              <MDTypography variant="h6" gutterBottom>
                Brands
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

export default Brands;
