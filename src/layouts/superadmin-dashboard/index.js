import { useState, useEffect } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Card from "@mui/material/Card";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Modal, Box, Typography, IconButton, InputAdornment } from "@mui/material";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DataTable from "muiComponents/Tables/DataTable";
import MDTypography from "components/MDTypography";

import api from "../../axios";
import { tableAccountData } from "./data";
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
  const [accountData, setAccountData] = useState({ columns: [], rows: [] });
  const { user, updateUser } = useUser();
  const [open, setOpen] = useState(!user?.user?.passwordChanged);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { AdminData } = useUser();

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
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await api.get("/accounts");
      const accounts = response?.data;
      setAccountData(tableAccountData(accounts, handleImpersonate));
    } catch (error) {
      toast.error(error.response?.data?.message || error?.message);
    }
  };

  const handleImpersonate = async (id) => {
    try {
      const response = await api.get("/admin/user", {
        params: { id },
      });
      AdminData(response?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Accounts
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={accountData}
          showTotalEntries={true}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
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
    </Card>
  );
};

export default SuperAdminDashboard;
