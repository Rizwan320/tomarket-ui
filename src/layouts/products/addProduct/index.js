import {
  Container,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { toast } from "react-toastify";
import api from "../../../axios";
import { units } from "utils/salesUnits";

const FieldWrapper = ({ name, children }) => (
  <FormControl fullWidth variant="outlined" margin="normal">
    {children}
    <ErrorMessage name={name} component="div" style={{ color: "red", fontSize: "14px" }} />
  </FormControl>
);

const AddProduct = () => {
  const initialValues = {
    name: "",
    sku: "",
    price: "",
    description: "",
    unit: "",
  };

  const navigate = useNavigate();

  const handleCancel = () => navigate("/products");

  const validationSchema = Yup.object({
    productName: Yup.string().required("Product Name is required"),
    SKU: Yup.string().required("SKU is required"),
    price: Yup.number().required("Price is required").positive("Price must be positive"),
    description: Yup.string(),
    unit: Yup.string().required("Unit is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      name: values.productName,
      sku: values.SKU,
      price: values.price,
      description: values.description,
      unit: values.unit,
    };

    try {
      const response = await api.post("/Products", payload);
      if (response.status === 201) {
        toast.success("Product Added Successfully");
        navigate("/products");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(`Product already exists with SKU(s): ${error.response.data.message}`);
      } else {
        toast.error("Error Adding Product");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card>
        <CardContent>
          <MDTypography variant="h6" gutterBottom>
            Add Product
          </MDTypography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FieldWrapper name="productName">
                      <Field
                        name="productName"
                        as={MDInput}
                        margin="normal"
                        fullWidth
                        label="Product Name"
                        autoComplete="productName"
                        variant="outlined"
                      />
                    </FieldWrapper>
                  </Grid>
                  <Grid item xs={12}>
                    <FieldWrapper name="SKU">
                      <Field
                        name="SKU"
                        as={MDInput}
                        margin="normal"
                        fullWidth
                        label="SKU"
                        autoComplete="SKU"
                        variant="outlined"
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

                <MDBox display="flex" justifyContent="flex-start" alignItems="center" mt={3}>
                  <MDButton
                    type="submit"
                    color="success"
                    variant="gradient"
                    sx={{ mt: 3, mb: 2, mr: 2 }}
                    disabled={isSubmitting}
                  >
                    Add Product
                  </MDButton>
                  <MDButton
                    type="button"
                    color="primary"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => handleCancel()}
                  >
                    Cancel
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

export default AddProduct;
