import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import api from "../../../axios";

const validationSchema = Yup.object({
  userName: Yup.string().required("Name is required"),
  userEmail: Yup.string().email("Invalid email format").required("Email is required"),
  accountName: Yup.string().required("Company Name is required"),
});

const AddBrandAndDistributor = ({ accountType }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (values) => {
    try {
      const res = await api.post("admin/create-account", {
        email: values.userEmail,
        userName: values.userName,
        password: "*******",
        accountType: accountType,
        accountName: values.accountName,
      });
      toast.success(`${accountType} added successfully`);
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <MDBox mr={2}>
        <MDButton variant="contained" color="success" onClick={handleOpen}>
          Add {accountType}
        </MDButton>
      </MDBox>{" "}
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
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="add-user-modal-title" variant="h6" component="h2" mb={2}>
            Add New {accountType.charAt(0).toUpperCase() + accountType.slice(1)}
          </Typography>

          <Formik
            initialValues={{
              userName: "",
              userEmail: "",
              password: "",
              accountType: accountType,
              accountName: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <MDBox mb={2}>
                <Field
                  name="accountName"
                  as={MDInput}
                  type="text"
                  label="Account Name"
                  fullWidth
                  required
                />
                <ErrorMessage name="accountName" component="h6" style={{ color: "red" }} />
              </MDBox>

              <MDBox mb={2} display="flex" justifyContent="space-between" gap={2}>
                <MDBox flex={1}>
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
              </MDBox>

              <MDBox mt={4} mb={1}>
                <MDButton type="submit" variant="gradient" color="success" fullWidth>
                  Add {accountType}
                </MDButton>
              </MDBox>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default AddBrandAndDistributor;
