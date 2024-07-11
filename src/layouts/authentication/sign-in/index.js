import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Box, Link } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
// import GoogleIcon from "@mui/icons-material/Google";
import { toast } from "react-toastify";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import { useUser } from "context/userContext";
import BasicLayout from "layouts/authentication/components/BasicLayout";

import bgImage from "assets/images/login-bg.jpg";
import tmLogo from "assets/images/toMarket-logo.png";
import api from "../../../axios";

const SignIn = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // const handleSignInWithGoogle = () => {};

  const handleForgotPassword = (e) => e.preventDefault();

  const handleSignIn = async (values, { setSubmitting }) => {
    try {
      const res = await api.post(`auth/login`, {
        email: values.userEmail,
        password: values.password,
      });
      if (res.status === 201) {
        login(res.data);
        navigate("/dashboard");
      } else {
        toast.error("Unauthorized User");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BasicLayout image={bgImage} formType="signin">
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
            initialValues={{
              userEmail: "",
              password: "",
            }}
            validationSchema={Yup.object({
              userEmail: Yup.string().email("Invalid email format").required("Email is required"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={handleSignIn}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <MDBox mb={2}>
                  <Field
                    name="userEmail"
                    as={MDInput}
                    type="email"
                    label="Email"
                    fullWidth
                    required
                  />
                  <ErrorMessage name="userEmail" component="h6" style={{ color: "red" }} />
                </MDBox>
                <MDBox mb={2}>
                  <Field
                    name="password"
                    as={MDInput}
                    type="password"
                    label="Password"
                    fullWidth
                    required
                  />
                  <ErrorMessage name="password" component="h6" style={{ color: "red" }} />
                </MDBox>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" ml={-1}>
                  <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    onClick={handleSetRememberMe}
                    sx={{ cursor: "pointer", userSelect: "none", ml: -6 }}
                  >
                    &nbsp;&nbsp;Remember me
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    fontWeight="regular"
                    color="success"
                    sx={{ cursor: "pointer", userSelect: "none" }}
                  >
                    <Link
                      to="/forgot-password"
                      component="button"
                      underline="always"
                      onClick={handleForgotPassword}
                      sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Forgot Password?
                    </Link>
                  </MDTypography>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    type="submit"
                    variant="gradient"
                    color="success"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    Sign In
                  </MDButton>
                </MDBox>
                {/* <MDBox mt={2} mb={1}>
                  <MDButton
                    startIcon={<GoogleIcon />}
                    onClick={handleSignInWithGoogle}
                    variant="contained"
                    fullWidth
                    color="info"
                  >
                    Sign In with Google
                  </MDButton>
                </MDBox> */}

                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Don&apos;t have an account?{" "}
                    <MDTypography
                      component={RouterLink}
                      to="/authentication/sign-up"
                      variant="button"
                      color="success"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign up
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

export default SignIn;
