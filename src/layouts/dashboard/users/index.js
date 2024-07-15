import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Card from "@mui/material/Card";
import { InputLabel, FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import GooglePlacesAutocomplete from "google/GooglePlacesAutocomplete";
import api from "../../../axios";
import Loader from "components/Loader";

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    id: "",
    account: {
      accountName: "",
      // accountType: "",
      id: "",
    },
    mailingAddress: "",
    userName: "",
    email: "",
    // password: "",
    // confirmPassword: "",
    shopifyAppUrl: "",
  });

  const validationSchema = Yup.object({
    account: Yup.object({
      accountName: Yup.string().required("Account Name is required"),
      // accountType: Yup.string().required("Account Type is required"),
    }),
    mailingAddress: Yup.string().required("Mailing Address is required"),
    userName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("User Email is required"),
    // password: Yup.string().min(7, "Password must be at least 7 characters").notRequired(),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Passwords must match")
    //   .notRequired(),
    shopifyAppUrl: Yup.string().url("Invalid URL format").notRequired(),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/users/details");
        if (response.status === 200) {
          const userData = response.data;
          setInitialValues({
            id: userData.id,
            account: {
              accountName: userData?.account?.accountName,
              accountType: userData?.account?.accountType,
              id: userData?.account?.id,
            },
            mailingAddress: userData?.mailingAddress,
            userName: userData?.userName,
            email: userData?.email,
            // password: "",
            // confirmPassword: "",
            shopifyAppUrl: userData?.shopifyAppUrl,
          });
        } else {
          toast.error("Failed to fetch user data");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    const { password, confirmPassword, ...payload } = values;
    try {
      const response = await api.patch(`/users/${initialValues?.id}`, payload);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        throw new Error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePlaceSelected = (place, setFieldValue) => {
    setFieldValue("mailingAddress", place.formatted_address);
  };

  return (
    <Card sx={{ width: "100%" }}>
      {loading && <Loader />}
      <MDBox pt={4} pb={3} px={3}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <MDBox mb={2} display="flex" justifyContent="space-between">
                <MDBox mr={1} flex={1}>
                  <Field
                    name="account.accountName"
                    as={MDInput}
                    type="text"
                    label="Account Name"
                    fullWidth
                  />
                  <ErrorMessage
                    name="account.accountName"
                    component="h6"
                    style={{ color: "red" }}
                  />
                </MDBox>
                {/* <MDBox ml={1} flex={1}>
                  <Field name="account.accountType">
                    {({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="accountType-label">Account Type</InputLabel>
                        <Select
                          {...field}
                          labelId="accountType-label"
                          id="accountType"
                          variant="standard"
                        >
                          <MenuItem value="brand">Brand</MenuItem>
                          <MenuItem value="distributor">Distributor</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                  <ErrorMessage
                    name="account.accountType"
                    component="h6"
                    style={{ color: "red" }}
                  />
                </MDBox> */}
              </MDBox>
              <MDBox mb={2} mr={1} flex={1}>
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
              {/* <MDBox mb={2} display="flex" justifyContent="space-between">
                <MDBox mr={1} flex={1}>
                  <Field name="password" as={MDInput} type="password" label="Password" fullWidth />
                  <ErrorMessage name="password" component="h6" style={{ color: "red" }} />
                </MDBox>
                <MDBox ml={1} flex={1}>
                  <Field
                    name="confirmPassword"
                    as={MDInput}
                    type="password"
                    label="Confirm Password"
                    fullWidth
                  />
                  <ErrorMessage name="confirmPassword" component="h6" style={{ color: "red" }} />
                </MDBox>
              </MDBox> */}
              <MDBox mt={4} mb={1}>
                <MDButton type="submit" variant="gradient" color="success" disabled={isSubmitting}>
                  Update Profile
                </MDButton>
              </MDBox>
            </Form>
          )}
        </Formik>
      </MDBox>
    </Card>
  );
};

export default EditProfile;
