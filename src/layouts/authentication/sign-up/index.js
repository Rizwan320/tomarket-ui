import { useState } from "react";
import { toast } from "react-toastify";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Card from "@mui/material/Card";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import MDBox from "components/MDBox";
import Loader from "components/Loader";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import BasicLayout from "../components/BasicLayout";
import GooglePlacesAutocomplete from "google/GooglePlacesAutocomplete";

import api from "../../../axios";
import { backgroundImage, tomarketLogo } from "assets/assets";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const initialValues = {
    accountName: "",
    mailingAddress: "",
    accountType: "brand",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    shopifyAppUrl: "",
  };

  const validationSchema = Yup.object({
    accountName: Yup.string().required("Company Name is required"),
    mailingAddress: Yup.string().required("Mailing Address is required"),
    userName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("User Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(7, "Password must be at least 7 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    shopifyAppUrl: Yup.string().notRequired(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/register", values);
      if (response.status === 201) {
        toast.success("User Registered Successfully");
        setTimeout(() => {
          navigate("/authentication/sign-in");
        }, 1000);
      } else {
        toast.error("Failed to Register");
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handlePlaceSelected = (place, setFieldValue) => {
    setFieldValue("mailingAddress", place.formatted_address);
  };
  const handleTogglePasswordVisibility = () => setHidePassword(!hidePassword);
  const handleToggleConfirmPasswordVisibility = () => setHideConfirmPassword(!hideConfirmPassword);

  return (
    <BasicLayout image={backgroundImage} formType="signup">
      {loading && <Loader />}
      <Card sx={{ width: "600px" }}>
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
          <MDBox
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
            src={tomarketLogo}
            alt="Logo"
          />
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <MDBox mb={2} display="flex" justifyContent="space-between">
                  <MDBox mr={1} flex={1}>
                    <Field
                      name="accountName"
                      as={MDInput}
                      type="text"
                      label="Account Name"
                      fullWidth
                    />
                    <ErrorMessage name="accountName" component="h6" style={{ color: "red" }} />
                  </MDBox>
                </MDBox>
                {/* <MDBox mb={2} display="flex" justifyContent="space-between" alignItems="flex-end"> */}
                <MDBox mb={2} mr={1} flex={1}>
                  <Field name="mailingAddress">
                    {({ field, form }) => (
                      <GooglePlacesAutocomplete
                        value={field.value}
                        onChange={field.onChange(field.name)}
                        onPlaceSelected={(place) => handlePlaceSelected(place, form.setFieldValue)}
                        label="Mailing Address"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="mailingAddress" component="h6" style={{ color: "red" }} />
                </MDBox>
                <MDBox mb={2} mr={1} flex={1}>
                  <Field
                    name="shopifyAppUrl"
                    as={MDInput}
                    type="text"
                    label="Shopify App Link"
                    fullWidth
                  />
                  <ErrorMessage name="shopifyAppUrl" component="h6" style={{ color: "red" }} />
                </MDBox>
                <MDBox mb={2} display="flex" justifyContent="space-between">
                  <MDBox mr={1} flex={1}>
                    <Field name="userName" as={MDInput} type="text" label="Full Name" fullWidth />
                    <ErrorMessage name="userName" component="h6" style={{ color: "red" }} />
                  </MDBox>
                  <MDBox ml={1} flex={1}>
                    <Field name="email" as={MDInput} type="email" label="User Email" fullWidth />
                    <ErrorMessage name="email" component="h6" style={{ color: "red" }} />
                  </MDBox>
                </MDBox>
                <MDBox mb={2} display="flex" justifyContent="space-between">
                  <MDBox mr={1} flex={1}>
                    <Field
                      name="password"
                      as={MDInput}
                      type={hidePassword ? "password" : "text"}
                      label="Password"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                              {hidePassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <ErrorMessage name="password" component="h6" style={{ color: "red" }} />
                  </MDBox>
                  <MDBox ml={1} flex={1}>
                    <Field
                      name="confirmPassword"
                      as={MDInput}
                      type={hideConfirmPassword ? "password" : "text"}
                      label="Confirm Password"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                              {hideConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <ErrorMessage name="confirmPassword" component="h6" style={{ color: "red" }} />
                  </MDBox>
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
