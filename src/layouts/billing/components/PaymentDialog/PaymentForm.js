import { Grid, Card } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MasterCard from "../MasterCard";
import { billingFormValidationSchema } from "./schema";

const FieldWrapper = ({ name, children }) => {
  return (
    <FormControl fullWidth>
      {children}
      <ErrorMessage name={name} component="h6" style={{ color: "red" }} />
    </FormControl>
  );
};

const PaymentForm = () => {
  const initialValues = {
    name: "",
    card: "",
    expiry_month: "",
    expiry_year: "",
    cvv2: "",
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (!/[0-9]/.test(key)) {
      event.preventDefault();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={billingFormValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} display="flex" justifyContent="center" alignContent="center">
              <MDBox maxWidth="450px">
                <MasterCard
                  number={values.card}
                  holder={values.name || "..."}
                  expires={`${values.expiry_month || ".."}/${
                    values.expiry_year.toString().slice(2, 4) || ".."
                  }`}
                  // cvv={values.cvv2}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FieldWrapper name="name">
                    <Field as={MDInput} label="Name on Card" name="name" required />
                  </FieldWrapper>
                </Grid>
                <Grid item xs={12}>
                  <FieldWrapper name="card">
                    <Field
                      as={MDInput}
                      label="Card Number"
                      name="card"
                      type="text"
                      inputProps={{ maxLength: 16 }}
                      onKeyPress={handleKeyPress}
                      required
                    />
                  </FieldWrapper>
                </Grid>
                <Grid item xs={3}>
                  <FieldWrapper name="cvv2">
                    <Field
                      as={MDInput}
                      label="CVV"
                      name="cvv2"
                      type="text"
                      inputProps={{ maxLength: 4 }}
                      onKeyPress={handleKeyPress}
                      required
                    />
                  </FieldWrapper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FieldWrapper name="expiry_month">
                    <InputLabel id="expiry_month-label">Month</InputLabel>
                    <Field sx={{ height: 45 }} as={Select} name="expiry_month">
                      {[...Array(12).keys()].map((month) => (
                        <MenuItem key={month + 1} value={month + 1}>
                          {month + 1}
                        </MenuItem>
                      ))}
                    </Field>
                  </FieldWrapper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FieldWrapper name="expiry_year">
                    <InputLabel id="expiry_year-label">Year</InputLabel>
                    <Field sx={{ height: 45 }} as={Select} name="expiry_year">
                      {Array.from({ length: 10 }, (v, i) => new Date().getFullYear() + i).map(
                        (year) => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        )
                      )}
                    </Field>
                  </FieldWrapper>
                </Grid>
              </Grid>
              <MDBox display="flex" justifyContent="end" mt={2}>
                <MDButton type="submit" variant="contained" color="success" disabled={isSubmitting}>
                  Submit
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentForm;
