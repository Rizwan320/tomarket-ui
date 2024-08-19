import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import api from "../../../axios";
import { units } from "utils/salesUnits";

const FieldWrapper = ({ name, children }) => (
  <FormControl fullWidth variant="outlined" margin="normal">
    {children}
    <ErrorMessage name={name} component="div" style={{ color: "red", fontSize: "14px" }} />
  </FormControl>
);

const ProductForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    sku: "",
    description: "",
    unit: "",
    price: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const validationSchema = Yup.object({
    name: Yup.string().required("Product Name is required"),
    sku: Yup.string().required("SKU is required"),
    price: Yup.number().required("Price is required").positive("Price must be positive"),
    description: Yup.string(),
    unit: Yup.string().required("Unit is required"),
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/products/${id}`);
          const data = response.data;
          setInitialValues({
            name: data.name || "",
            sku: data.sku || "",
            description: data.description || "",
            unit: data.productSaleUnits[0].salesUnit.abbreviation || "",
            price: Number(data.price),
          });
        } catch (error) {
          toast.error("Error fetching product details");
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEditMode) {
        const response = await api.patch(`/products/${id}`, values);
        if (response.status === 200) {
          toast.success("Product updated successfully");
          navigate("/products");
        }
      } else {
        const response = await api.post("/products", values);
        if (response.status === 201) {
          toast.success("Product added successfully");
          navigate("/products");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card>
        <CardContent>
          <MDTypography variant="h6" gutterBottom>
            {isEditMode ? "Edit Product" : "Add Product"}
          </MDTypography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FieldWrapper name="name">
                      <Field
                        name="name"
                        as={MDInput}
                        margin="normal"
                        fullWidth
                        label="Product Name"
                        autoComplete="name"
                        variant="outlined"
                      />
                    </FieldWrapper>
                  </Grid>
                  <Grid item xs={12}>
                    <FieldWrapper name="sku">
                      <Field
                        name="sku"
                        as={MDInput}
                        margin="normal"
                        fullWidth
                        label="SKU"
                        autoComplete="sku"
                        variant="outlined"
                        disabled={isEditMode}
                      />
                    </FieldWrapper>
                  </Grid>
                  <Grid item xs={12}>
                    <FieldWrapper name="unit">
                      <InputLabel id="unit-label">Unit</InputLabel>
                      <Field
                        as={Select}
                        name="unit"
                        labelId="unit-label"
                        label="Unit"
                        onChange={(e) => setFieldValue("unit", e.target.value)}
                        value={values.unit}
                        sx={{ height: 45 }}
                        fullWidth
                        disabled={isEditMode}
                      >
                        {units.map((unit) => (
                          <MenuItem key={unit.abbreviation} value={unit.abbreviation}>
                            {`${unit.name} (${unit.abbreviation})`}
                          </MenuItem>
                        ))}
                      </Field>
                    </FieldWrapper>
                  </Grid>
                  <Grid item xs={12}>
                    <FieldWrapper name="price">
                      <Field
                        name="price"
                        as={MDInput}
                        margin="normal"
                        fullWidth
                        label="Price"
                        type="number"
                        autoComplete="price"
                        variant="outlined"
                      />
                    </FieldWrapper>
                  </Grid>
                  <Grid item xs={12}>
                    <FieldWrapper name="description">
                      <Field
                        name="description"
                        as={MDInput}
                        margin="normal"
                        fullWidth
                        label="Description"
                        autoComplete="description"
                        variant="outlined"
                        multiline
                        rows={4}
                      />
                    </FieldWrapper>
                  </Grid>
                </Grid>

                <MDBox display="flex" justifyContent="flex-end" alignItems="center" mt={3}>
                  <MDButton
                    type="submit"
                    color="success"
                    variant="gradient"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                  >
                    {isEditMode ? "Save Changes" : "Add Product"}
                  </MDButton>
                </MDBox>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductForm;
