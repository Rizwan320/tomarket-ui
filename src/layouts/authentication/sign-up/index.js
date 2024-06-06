import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Card from "@mui/material/Card";
import { Grid, Box } from "@mui/material";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import BasicLayout from "../components/BasicLayout";
import GooglePlacesAutocomplete from "google/GooglePlacesAutocomplete";

import bgImage from "assets/images/login-bg.jpg";
import tmLogo from "assets/images/whatChefWants.png";
import api from "../../../axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const initialValues = {
    companyName: "",
    companyEmail: "",
    mailingAddress: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company Name is required"),
    companyEmail: Yup.string().email("Invalid email format").required("Company Email is required"),
    mailingAddress: Yup.string().required("Mailing Address is required"),
    userName: Yup.string().required("User Name is required"),
    email: Yup.string().email("Invalid email format").required("User Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(7, "Password must be at least 7 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const response = await api.post("/auth/register", values);
    if (response.status === 201) {
      toast.success("User Register Successfully");
      setTimeout(() => {
        navigate("/authentication/sign-in");
      }, 1000);
    } else {
      toast.error("Failed to Register");
    }
    setSubmitting(false);
  };

  const handlePlaceSelected = (place, setFieldValue) => {
    setFieldValue("mailingAddress", place.formatted_address);
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="success"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <Grid item xs={12}>
            <Box
              component="img"
              sx={{
                zIndex: 100,
                width: "80%",
                maxWidth: "400px",
                height: "100px",
                objectFit: "contain",
                mt: "10px",
                mb: "auto",
                ml: "auto",
                mr: "auto",
              }}
              src={tmLogo}
              alt="Logo"
            />
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <MDBox mb={2}>
                  <Field
                    name="companyName"
                    as={MDInput}
                    type="text"
                    label="Company Name"
                    fullWidth
                  />
                  <ErrorMessage name="companyName" component="h6" style={{ color: "red" }} />
                </MDBox>
                <MDBox mb={2}>
                  <Field
                    name="companyEmail"
                    as={MDInput}
                    type="email"
                    label="Company Email"
                    fullWidth
                  />
                  <ErrorMessage name="companyEmail" component="h6" style={{ color: "red" }} />
                </MDBox>
                <MDBox mb={2}>
                  <Field name="mailingAddress">
                    {({ field, form }) => (
                      <GooglePlacesAutocomplete
                        value={field.value}
                        onChange={field.onChange(field.name)}
                        onPlaceSelected={(place) => handlePlaceSelected(place, form.setFieldValue)}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="mailingAddress" component="h6" style={{ color: "red" }} />
                </MDBox>
                <MDBox mb={2}>
                  <Field name="userName" as={MDInput} type="text" label="User Name" fullWidth />
                  <ErrorMessage name="userName" component="h6" style={{ color: "red" }} />
                </MDBox>
                <MDBox mb={2}>
                  <Field name="email" as={MDInput} type="email" label="User Email" fullWidth />
                  <ErrorMessage name="email" component="h6" style={{ color: "red" }} />
                </MDBox>
                <MDBox mb={2}>
                  <Field name="password" as={MDInput} type="password" label="Password" fullWidth />
                  <ErrorMessage name="password" component="h6" style={{ color: "red" }} />
                </MDBox>
                <MDBox mb={2}>
                  <Field
                    name="confirmPassword"
                    as={MDInput}
                    type="password"
                    label="Confirm Password"
                    fullWidth
                  />
                  <ErrorMessage name="confirmPassword" component="h6" style={{ color: "red" }} />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    type="submit"
                    variant="gradient"
                    color="success"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </MDButton>
                </MDBox>

                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Already have an account?{" "}
                    <MDTypography
                      component={RouterLink}
                      to="/authentication/sign-in"
                      variant="button"
                      color="success"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign in
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </Form>
            )}
          </Formik>
        </MDBox>
      </Card>
    </BasicLayout>
  );
};

export default SignUp;
