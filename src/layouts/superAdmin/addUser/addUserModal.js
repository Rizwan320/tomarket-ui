import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import api from "../../../axios";

const validationSchema = Yup.object({
  userName: Yup.string().required("Name is required"),
  userEmail: Yup.string().email("Invalid email format").required("Email is required"),
});

const AddUserModal = ({ account }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await api.post(`/users/add-user/${account?.id}`, {
        email: values.userEmail,
        userName: values.userName,
        passwordChanged: false,
        isSuperAdmin: false,
        password: "*******",
      });
      toast.success("User added successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      navigate("/dashboard");
      handleClose();
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <MDButton variant="contained" color="success" onClick={handleOpen}>
        Add New User
      </MDButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
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
            borderRadius: 2,
          }}
        >
          <MDBox px={2} mt={2}>
            <MDTypography variant="h5" component="h1" mb={3}>
              Add New User
            </MDTypography>

            <Formik
              initialValues={{ userName: "", userEmail: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <MDBox flex={1} mb={2}>
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

                <MDBox flex={1}>
                  <Field name="userName" as={MDInput} type="text" label="Name" fullWidth required />
                  <ErrorMessage name="userName" component="h6" style={{ color: "red" }} />
                </MDBox>

                <MDBox m={2} display="flex" justifyContent="flex-end">
                  <MDButton type="submit" variant="gradient" color="success">
                    Add User
                  </MDButton>
                </MDBox>
              </Form>
            </Formik>
          </MDBox>
        </Box>
      </Modal>
    </>
  );
};

export default AddUserModal;
