import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Box, Link } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import GoogleIcon from "@mui/icons-material/Google";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import { useUser } from "context/userContext";
import BasicLayout from "layouts/authentication/components/BasicLayout";

import bgImage from "assets/images/login-bg.jpg";
import tmLogo from "assets/images/whatChefWants.png";

const SignIn = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [password, setPassword] = useState();
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSignInWithGoogle = () => {};

  const handleForgotPassword = (e) => e.preventDefault();

  const handleSignIn = () => {
    if (userEmail.includes("distributor")) {
      localStorage.setItem(
        "user",
        JSON.stringify({ email: userEmail, password: password, type: "distributor" })
      );
      login({ email: userEmail, password: password, type: "distributor" });
    } else {
      localStorage.setItem(
        "user",
        JSON.stringify({ email: userEmail, password: password, type: "brands" })
      );
      login({ email: userEmail, password: password, type: "brands" });
    }
    navigate("/dashboard");
  };

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput onChange={handleEmailChange} type="email" label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput onChange={handlePasswordChange} type="password" label="Password" fullWidth />
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
              <MDButton onClick={handleSignIn} variant="gradient" color="success" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={2} mb={1}>
              <MDButton
                startIcon={<GoogleIcon />}
                onClick={handleSignInWithGoogle}
                variant="contained"
                fullWidth
                color="info"
              >
                Sign in with Google
              </MDButton>
            </MDBox>

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
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
};

export default SignIn;
