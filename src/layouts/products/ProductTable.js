import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "muiComponents/Tables/DataTable";

import api from "../../axios";

import { tableProductData } from "./data";
import UploadFileModal from "layouts/buyers/components/Modals/UploadFileModal";

const ProductTable = () => {
  const [open, setOpen] = useState(false);
  const [uplaodFile, setUploadFile] = useState();
  const [productData, setProductData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    fetchProducts();
  }, []);

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
      id: "latestBuyer",
      displayName: "Latest Buyer",
    },
    {
      id: "totalSoldWeek",
      displayName: "Total Sold Week",
    },
    {
      id: "totalSoldMonth",
      displayName: "Total Sold Month",
    },
  ];

  const fetchProducts = async () => {
    try {
      const response = await api.get("products");
      const products = response?.data;
      setProductData(tableProductData(products));
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

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
      <MDBox p={3}>
        <MDTypography variant="h5" gutterBottom>
          Products
        </MDTypography>
        {/* <MDBox
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
        </MDBox> */}
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
      {/* {open && (
        <UploadFileModal
          open={open}
          fileName="TM-product-upload-template"
          handleClose={handleClose}
          handleModalClose={handleModalClose}
          handleSubmit={handleSubmit}
          columns={PRODUCT_FILE_HEADERS}
          heading="Download Product Template From Here"
        />
      )} */}
    </Card>
  );
};

export default ProductTable;
