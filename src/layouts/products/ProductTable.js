import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import DataTable from "muiComponents/Tables/DataTable";
import DropdownMenu from "muiComponents/MultiSelectDropdown";

import UploadFileModal from "layouts/Buyers/components/Modals/UploadFileModal";

import api from "../../axios";
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
  const [open, setOpen] = useState(false);
  const [uplaodFile, setUploadFile] = useState();
  const [tableColumns, setTableColumns] = useState([
    "id",
    "logo",
    "name",
    "sku ",
    "description",
    "unit",
    "price",
  ]);
  const PRODUCT_FILE_HEADERS = [
    {
      id: "name",
      displayName: "Name",
    },
    {
      id: "description",
      displayName: "Description",
    },
    {
      id: "sku",
      displayName: "SKU",
    },
    {
      id: "unit",
      displayName: "Unit",
    },
    {
      id: "price",
      displayName: "Price",
    },
  ];
  const { columns, rows } = productData(tableColumns);
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    navigate(`/product/${row?.id}`);
  };

  const handleAddProduct = () => navigate("/product/add");

  const handleOpen = (file) => {
    setOpen(true);
  };

  const handleModalClose = () => setOpen(false);

  const handleClose = (file) => setUploadFile(file);

  const handleSubmit = async () => {
    if (uplaodFile) {
      const formData = new FormData();
      formData.append("file", uplaodFile);
      try {
        const response = await api.post("products/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setOpen(false);
      }
    }
  };

  return (
    <Card>
      <MDBox sx={{ display: "flex", justifyContent: "space-between" }} p={3}>
        <MDTypography variant="h6" gutterBottom>
          Product Table
        </MDTypography>
        <MDBox
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MDBox mr={2}>
            <MDButton variant="contained" color="success" onClick={handleOpen}>
              Upload File
            </MDButton>
          </MDBox>

          <MDBox mr={2}>
            <MDButton variant="contained" color="success" onClick={() => handleAddProduct()}>
              Add Product
            </MDButton>
          </MDBox>

          <DropdownMenu
            tableColumns={tableColumns}
            columns={COLUMNS}
            setTableColumns={setTableColumns}
          />
        </MDBox>
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
      {open && (
        <UploadFileModal
          open={open}
          fileName="TM-product-upload-template"
          handleClose={handleClose}
          handleModalClose={handleModalClose}
          handleSubmit={handleSubmit}
          columns={PRODUCT_FILE_HEADERS}
          heading="Download Product Template From Here"
        />
      )}
    </Card>
  );
};

export default ProductTable;
