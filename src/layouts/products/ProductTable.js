import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "muiComponents/Tables/DataTable";
import DropdownMenu from "muiComponents/MultiSelectDropdown";
import productData from "./productData";

const COLUMNS = [
  { Header: "Logo", accessor: "logo", align: "left" },
  { Header: "Name", accessor: "name", align: "center" },
  { Header: "SKU", accessor: "sku", align: "center" },
  { Header: "Description", accessor: "description", align: "center" },
  { Header: "Unit", accessor: "unit", align: "center" },
  { Header: "Price", accessor: "price", align: "center" },
  { Header: "Unit Sold Last Month", accessor: "unitSoldLastMonth", align: "center" },
  { Header: "Unit Sold Last Week", accessor: "unitSoldLastWeek", align: "center" },
  { Header: "Category", accessor: "category", align: "center" },
  { Header: "Largest Buyer", accessor: "largestBuyer", align: "center" },
  { Header: "Best Sales Rep", accessor: "bestSalesRep", align: "center" },
  { Header: "Best Market", accessor: "bestMarket", align: "center" },
  { Header: "Highest Sales Day", accessor: "highestSalesDay", align: "center" },
  { Header: "Highest Sales Month", accessor: "highestSalesMonth", align: "center" },
  { Header: "Inventory Age", accessor: "inventoryAge", align: "center" },
];

const ProductTable = () => {
  const [tableColumns, setTableColumns] = useState([
    "id",
    "logo",
    "name",
    "sku ",
    "description",
    "unit",
    "price",
  ]);
  const { columns, rows } = productData(tableColumns);
  let navigate = useNavigate();

  const handleRowClick = (row) => {
    console.log(row);
    navigate(`/product/${row?.id}`);
  };

  return (
    <Card>
      <MDBox sx={{ display: "flex", justifyContent: "space-between" }} p={3}>
        <MDTypography variant="h6" gutterBottom>
          Product Table
        </MDTypography>
        <DropdownMenu
          tableColumns={tableColumns}
          columns={COLUMNS}
          setTableColumns={setTableColumns}
        />
      </MDBox>

      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={true}
          isSorted={true}
          noEndBorder
          entriesPerPage={false}
          onRowClick={handleRowClick}
        />
      </MDBox>
    </Card>
  );
};

export default ProductTable;
