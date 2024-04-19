import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "muiComponents/Tables/DataTable";
import productData from "./productData";

const ProductTable = () => {
  const { columns, rows } = productData();
  let navigate = useNavigate();

  const handleRowClick = (row) => {
    console.log(row);
    navigate(`/product/${row?.id}`);
  };

  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h6" gutterBottom>
          Product Table
        </MDTypography>
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={true}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
          onRowClick={handleRowClick}
        />
      </MDBox>
    </Card>
  );
};

export default ProductTable;
