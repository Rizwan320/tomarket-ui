import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Card, CircularProgress, FormGroup } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [amountToPay, setAmountToPay] = useState(0);

  const handleAmountChange = (event) => {
    const enteredAmount = event.target.value;
    // Check if the entered value is less than 0
    if (enteredAmount < 0 && /^\d*$/.test(enteredAmount) && enteredAmount == NaN) {
      // If less than 0, set the amount to 0
      setAmountToPay(0);
    } else {
      // const parsedAmount = parseInt(enteredAmount);
      // console.log(parsedAmount);
      setAmountToPay(enteredAmount);
    }
  };
  // const handleAmountChange = (event) => {
  //   const value = event.target.value;
  //   // Prevents input of negative values and non-numeric characters
  //   if (value !== "" && (Number(value) <= 0 || isNaN(value))) {
  //     setAmountToPay(value.slice(0, -1));
  //   }
  // };

  // const stripe = useStripe();
  // const elements = useElements();
  // const navigate = useNavigate();

  const handleToken = (token) => {
    if (token) {
      console.log(token);
      alert("Payment Success");
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   setLoading(true);

  //   if (!stripe || !elements) {
  //     // Stripe.js has not yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   // const cardElement = elements.getElement(CardElement);

  //   // const { error, paymentMethod } = await stripe.createPaymentMethod({
  //   //   type: "card",
  //   //   card: cardElement,
  //   //   billing_details: {
  //   //     name: name,
  //   //   },
  //   // });

  //   if (error) {
  //     setError(error.message);
  //     setLoading(false);
  //   } else {
  //     console.log("PaymentMethod", paymentMethod);
  //     alert("Payment Success");
  //     setLoading(false);
  //     navigate("/dashboard");

  //     // Send the payment method ID to your server to complete the payment
  //   }
  // };

  return (
    <Card sx={{ mt: 2 }}>
      <MDBox p={3}>
        {/* <form onSubmit={handleSubmit}> */}
        <MDTypography id="stripe-payment-modal" variant="h6" component="h2">
          Stripe Payment
        </MDTypography>
        <MDTypography id="stripe-payment-modal-description" sx={{ mt: 2 }}>
          Enter your payment details below:
        </MDTypography>
        <MDInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ my: 2 }}
          required
        />
        <MDInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ my: 2 }}
          type="email"
          required
        />
        <MDInput
          label="Phone No"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ my: 2 }}
          type="number"
          required
        />
        <MDInput
          label="Amount to Pay"
          value={amountToPay}
          fullWidth
          margin="normal"
          sx={{ my: 2 }}
          type="number"
          required
          onChange={handleAmountChange}
          inputProps={{ min: 0 }}
        />
        {name && email && phoneNo && amountToPay ? (
          <StripeCheckout
            token={handleToken}
            stripeKey="pk_test_51P8MQPP28UXraLM3qpisAFy05yKaI3FpWoiY1YgnPBOSa1KQWdPejdWsu9Bg2xN53qlqG5UZ9rXTr5hQL6RSPLPj00DMObxzWF"
            name="What Chef Wants"
            amount={amountToPay !== NaN ? parseInt(amountToPay * 100) : 0} // Amount in cents
            currency="USD"
            description="Purchase Description"
            image="https://www.whatchefswant.com/wp-content/uploads/2023/09/cropped-favicon-1.jpg"
            label="Pay Now"
            locale="en"
            email={email}
          >
            <MDButton type="button" variant="contained" color="success" size="small">
              pay
            </MDButton>
          </StripeCheckout>
        ) : (
          ""
        )}
      </MDBox>
      {/* <form onSubmit={handleSubmit}>
        <MDTypography id="stripe-payment-modal" variant="h6" component="h2">
          Stripe Payment
        </MDTypography>
        <MDTypography id="stripe-payment-modal-description" sx={{ mt: 2 }}>
          Enter your payment details below:
        </MDTypography>
        <MDInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ my: 2 }}
        />
        <MDBox
          mt={2}
          mb={2}
          sx={{ border: "1px solid #ced4da", borderRadius: "6px", padding: "10px" }}
        >
          <CardElement
            options={{
              style: {
                base: {
                  color: "#32325d",
                  fontFamily: "Arial, sans-serif",
                  fontSmoothing: "antialiased",
                  fontSize: "16px",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a",
                },
              },
            }}
          />
        </MDBox>
        <MDButton
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          disabled={!stripe || loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress color="info" size={24} /> : "Pay"}
        </MDButton>
        {error && (
          <MDTypography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </MDTypography>
        )}
      </form> */}
    </Card>
  );
};

export default PaymentForm;
