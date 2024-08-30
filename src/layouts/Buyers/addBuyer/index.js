import { Container, Card, CardContent, Grid } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import GooglePlacesAutocomplete from "google/GooglePlacesAutocomplete";
import api from "../../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBuyer = () => {
  const navigate = useNavigate();

  const initialValues = {
    displayName: "",
    email: "",
    city: "",
    country: "",
    countrySubDivisionCode: "",
    line1: "",
    postalCode: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    displayName: Yup.string().required("Display Name is required"),
    city: Yup.string(),
    country: Yup.string(),
    countrySubDivisionCode: Yup.string(),
    line1: Yup.string(),
    postalCode: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const location = {
      city: values.city,
      country: values.country,
      countrySubDivisionCode: values.countrySubDivisionCode,
      line1: values.line1,
      postalCode: values.postalCode,
    };

    const payload = {
      displayName: values.displayName,
      email: values.email,
      location: location,
    };

    try {
      const response = await api.post("/buyers/create", payload);
      if (response.status === 201) {
        toast.success("Buyer Added Successfully");
        navigate("/buyers");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handlePlaceSelected = (place, setFieldValue) => {
    if (place && place.formatted_address) {
      setFieldValue("line1", place.formatted_address);
    }
  };

  const handleCancel = () => navigate("/buyers");

  return (
    <Container component="main" maxWidth="xs">
      <Card>
        <CardContent>
          <MDTypography variant="h6" gutterBottom>
            Add Buyer
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
                    <Field
                      name="displayName"
                      as={MDInput}
                      margin="normal"
                      fullWidth
                      label="Display Name"
                      autoComplete="displayName"
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="displayName"
                      component="div"
                      style={{ color: "red", fontSize: "14px" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="email"
                      as={MDInput}
                      margin="normal"
                      fullWidth
                      label="Email"
                      autoComplete="email"
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      style={{ color: "red", fontSize: "14px" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="city"
                      as={MDInput}
                      margin="normal"
                      fullWidth
                      label="City"
                      autoComplete="city"
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      style={{ color: "red", fontSize: "14px" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="country"
                      as={MDInput}
                      margin="normal"
                      fullWidth
                      label="Country"
                      autoComplete="country"
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="country"
                      component="div"
                      style={{ color: "red", fontSize: "14px" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <GooglePlacesAutocomplete
                      value={values.line1}
                      onChange={(e) => setFieldValue("line1", e.target.value)}
                      onPlaceSelected={(place) => handlePlaceSelected(place, setFieldValue)}
                      label="Line 1"
                    />
                    <ErrorMessage
                      name="line1"
                      component="div"
                      style={{ color: "red", fontSize: "14px" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="countrySubDivisionCode"
                      as={MDInput}
                      margin="normal"
                      fullWidth
                      label="Country Subdivision Code"
                      autoComplete="countrySubDivisionCode"
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="countrySubDivisionCode"
                      component="div"
                      style={{ color: "red", fontSize: "14px" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="postalCode"
                      as={MDInput}
                      margin="normal"
                      fullWidth
                      label="Postal Code"
                      autoComplete="postalCode"
                      variant="outlined"
                    />
                    <ErrorMessage
                      name="postalCode"
                      component="div"
                      style={{ color: "red", fontSize: "14px" }}
                    />
                  </Grid>
                </Grid>

                <MDBox display="flex" justify="space-between" align="center">
                  <MDButton
                    type="submit"
                    color="success"
                    variant="gradient"
                    sx={{ mt: 3, mb: 2, mx: 2 }}
                    disabled={isSubmitting}
                  >
                    Add Buyer
                  </MDButton>
                  <MDButton
                    color="error"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleCancel}
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

export default AddBuyer;
