import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "muiComponents/Tables/DataTable";

import api from "../../../axios";

import { tableProductData } from "./data";

const SuperAdminProducts = () => {
  const [productData, setProductData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("products");
      const products = response?.data;
      setProductData(tableProductData(products));
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h5" gutterBottom>
          Products
        </MDTypography>
      </MDBox>
      <MDBox>
        <DataTable
          table={productData}
          showTotalEntries={true}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
};

export default SuperAdminProducts;
