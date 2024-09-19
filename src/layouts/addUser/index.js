import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import api from "../../axios";

const validationSchema = Yup.object({
  userName: Yup.string().required("Name is required"),
  userEmail: Yup.string().email("Invalid email format").required("Email is required"),
});

const AddUser = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const res = await api.post("/users", {
        email: values.userEmail,
        userName: values.userName,
        passwordChanged: false,
        isSuperAdmin: true,
        password: "*******",
      });
      toast.success("User added successfully");
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
    navigate("/dashboard");
  };

  return (
    <Card>
      <MDBox mt={4} px={2}>
        <MDTypography variant="h4" component="h1" mb={3}>
          Add New User
        </MDTypography>

        <Formik
          initialValues={{ userName: "", userEmail: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
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

            <MDBox m={4} display="flex" justifyContent="flex-end">
              <MDButton type="submit" variant="gradient" color="success">
                Add User
              </MDButton>
            </MDBox>
          </Form>
        </Formik>
      </MDBox>
    </Card>
  );
};

export default AddUser;
