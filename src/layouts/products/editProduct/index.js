import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Container, Grid } from "@mui/material";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { PRODUCT_DATA } from "../productData/Products";

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    description: "",
    unit: "",
    price: "",
    unitsSoldLastMonth: "",
    unitsSoldLastWeek: "",
    category: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(
      PRODUCT_DATA.find((res) => {
        return res.id == id;
      })
    );
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(product);
    navigate("/products");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card>
        <CardContent>
          <MDTypography variant="h6" gutterBottom>
            Edit Product
          </MDTypography>
          <MDBox component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <MDInput
                  margin="normal"
                  fullWidth
                  label="Product Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  variant="outlined"
                  value={product.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <MDInput
                  margin="normal"
                  fullWidth
                  label="SKU"
                  name="sku"
                  autoComplete="sku"
                  autoFocus
                  variant="outlined"
                  value={product.sku}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <MDInput
                  margin="normal"
                  fullWidth
                  label="Unit"
                  name="unit"
                  autoComplete="unit"
                  autoFocus
                  variant="outlined"
                  value={product.unit}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <MDInput
                  margin="normal"
                  fullWidth
                  label="Price"
                  name="price"
                  autoComplete="price"
                  autoFocus
                  variant="outlined"
                  value={product.price}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <MDInput
                  margin="normal"
                  fullWidth
                  label="Category"
                  name="category"
                  autoComplete="category"
                  autoFocus
                  variant="outlined"
                  value={product.category}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MDInput
                  margin="normal"
                  fullWidth
                  label="Description"
                  name="description"
                  autoComplete="description"
                  autoFocus
                  variant="outlined"
                  value={product.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>

            <MDBox display="flex" justify="space-between" align="center">
              <MDButton type="submit" color="success" variant="gradient" sx={{ mt: 3, mb: 2 }}>
                Save Product
              </MDButton>
              <MDButton type="submit" color="error" variant="gradient" sx={{ mt: 3, mb: 2, mx: 2 }}>
                Delete Product
              </MDButton>
            </MDBox>
          </MDBox>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditProduct;
