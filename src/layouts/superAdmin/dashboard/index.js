import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";

import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import InfoCard from "muiComponents/Cards/InfoCards/InfoCard";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Modal, Box, Typography, IconButton, InputAdornment } from "@mui/material";

import api from "../../../axios";

import { useUser } from "context/userContext";

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(7, "Password must be at least 7 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SuperAdminDashboard = () => {
  const [totalDistributors, setTotalDistributors] = useState(0);
  const [totalBrands, setTotalBrands] = useState(0);

  const { user, updateUser } = useUser();
  const [open, setOpen] = useState(!user?.user?.passwordChanged);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClose = () => setOpen(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (values) => {
    try {
      const response = await api.patch(`/users/change-password/${user.user.id}`, {
        password: values.password,
        passwordChanged: true,
      });
      if (response.status === 200) {
        toast.success("Password updated successfully");
        updateUser({ ...user.user, passwordChanged: true });
      } else {
        throw new Error(response.data.message || "Failed to update Password");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update Password");
    }
    handleClose();
  };

  useEffect(() => {
    fetchBrands();
    fetchDistributors();
  }, []);

  const fetchBrands = async () => {
    try {
      const brandsResponse = await api.get("brands");
      setTotalBrands(brandsResponse?.data?.length);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const fetchDistributors = async () => {
    try {
      const distributorsResponse = await api.get("distributors");
      setTotalDistributors(distributorsResponse?.data?.length);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const dashCardData = [
    {
      title: "Total Brands",
      value: `${totalBrands}`,
    },
    {
      title: "Total Distributors",
      value: `${totalDistributors}`,
    },
  ];

  return (
    <MDBox py={3}>
      <Grid container spacing={3}>
        {dashCardData?.map((data, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <InfoCard {...data} />
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason === "backdropClick") {
            return;
          }
          handleClose();
        }}
        aria-labelledby="add-password-modal-title"
        aria-describedby="add-password-modal-description"
        disablebackdropclick="true"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            outline: "none",
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <Typography id="add-password-modal-title" variant="h6" component="h2" mb={2}>
            Change Password
          </Typography>

          {/* Formik form */}
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <MDBox mb={2}>
                <Field
                  name="password"
                  as={MDInput}
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage name="password" component="h6" style={{ color: "red" }} />
              </MDBox>

              <MDBox mb={2}>
                <Field
                  name="confirmPassword"
                  as={MDInput}
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessage name="confirmPassword" component="h6" style={{ color: "red" }} />
              </MDBox>

              <MDBox mt={4} mb={1}>
                <MDButton type="submit" variant="gradient" color="success" fullWidth>
                  Update Password
                </MDButton>
              </MDBox>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </MDBox>
  );
};

export default SuperAdminDashboard;
