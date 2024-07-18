import * as Yup from "yup";

export const billingFormValidationSchema = Yup.object({
  name: Yup.string().required("Card Name is Required"),
  card: Yup.string()
    .required("Card Number is Required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .matches(
      /^(4[0-9]{15})|((?:5[1-5][0-9]{14})|(222[1-9][0-9]{12}|22[3-9][0-9]{13}|2[3-6][0-9]{14}|27[01][0-9]{13}|2720[0-9]{12}))$/,
      "Invalid Card Number"
    )
    .min(16, "Must be exactly 16 digits")
    .max(16, "Must be exactly 16 digits"),
  expiry_month: Yup.string().required("Required"),
  expiry_year: Yup.string().required("Required"),
  cvv2: Yup.string()
  .required("CVV is Required")
  .matches(/^[0-9]+$/, "Must be only digits")
  .min(3, "CVV is 3 or 4 digits")
  .max(4, "CVV is 3 or 4 digits"),
});
