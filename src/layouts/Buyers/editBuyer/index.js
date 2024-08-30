import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Container, Grid } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import GooglePlacesAutocomplete from "google/GooglePlacesAutocomplete";
import api from "../../../axios";
import { toast } from "react-toastify";

const EditBuyer = () => {
  const { id } = useParams();

  const [buyer, setBuyer] = useState({
    displayName: "",
    email: "",
  });
  const [location, setLocation] = useState({
    city: "",
    country: "",
    countrySubDivisionCode: "",
    line1: "",
    postalCode: "",
  });
  const validationSchemaBuyer = Yup.object({
    displayName: Yup.string().required("Display Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });
  const validationSchemaLocation = Yup.object({
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Counmtry is required"),
    countrySubDivisionCode: Yup.string().required("Country Subdivision Code is required"),
    line1: Yup.string().required("Line 1 is required"),
    postalCode: Yup.string().required("Postal Code is required"),
  });

  useEffect(() => {
    const fetchBuyer = async () => {
      try {
        const response = await api.get(`/buyers/${id}`);
        const { displayName, email, location } = response?.data?.data;
        setBuyer({
          displayName: displayName || "",
          email: email || "",
        });
        const { city, country, countrySubDivisionCode, line1, postalCode } = location;
        setLocation({
          city: city || "",
          country: country || "",
          countrySubDivisionCode: countrySubDivisionCode || "",
          line1: line1 || "",
          postalCode: postalCode || "",
        });
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    fetchBuyer();
  }, [id]);

  const handleSubmitBuyer = async (values, { setSubmitting }) => {
    try {
      const response = await api.patch(`/buyers/buyer/${id}`, values);
      if (response.status === 200) {
        toast.success("Buyer info updated successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitLocation = async (values, { setSubmitting }) => {
    try {
      const response = await api.patch(`/locations/buyers/${id}`, values);
      if (response.status === 200) {
        toast.success("Location updated successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePlaceSelected = (place, setFieldValue) => {
    if (place && place.formatted_address) {
      setFieldValue("line1", place.formatted_address);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card>
        <CardContent>
          <MDTypography variant="h6" gutterBottom>
            Basic Info
          </MDTypography>
          <Formik
            initialValues={buyer}
            validationSchema={validationSchemaBuyer}
            onSubmit={handleSubmitBuyer}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      name="displayName"
                      as={MDInput}
                      margin="normal"
                      fullWidth
                      label="Display Name"
                      autoComplete="displayName"
                      autoFocus
                      variant="outlined"
                      disabled={true}
                    />
                    <ErrorMessage
                      name="displayName"
                      component="div"
                      style={{ color: "red", fontSize: "14px" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
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
                </Grid>
                <MDBox display="flex" justifyContent="flex-end" alignItems="flex-end">
                  <MDButton
                    type="submit"
                    color="success"
                    variant="gradient"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                  >
                    Update
                  </MDButton>
                </MDBox>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <MDTypography variant="h6" gutterBottom>
            Update Location
          </MDTypography>
          <Formik
            initialValues={location}
            validationSchema={validationSchemaLocation}
            onSubmit={handleSubmitLocation}
            enableReinitialize
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
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
                    <Field name="line1">
                      {({ field }) => (
                        <GooglePlacesAutocomplete
                          value={field.value}
                          onChange={field.onChange(field.name)}
                          onPlaceSelected={(place) => handlePlaceSelected(place, setFieldValue)}
                          label="Line 1"
                        />
                      )}
                    </Field>
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

                <MDBox display="flex" justifyContent="flex-end" alignItems="flex-end">
                  <MDButton
                    type="submit"
                    color="success"
                    variant="gradient"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                  >
                    Update
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

export default EditBuyer;
