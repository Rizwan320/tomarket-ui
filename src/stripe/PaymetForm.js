import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Card, CircularProgress, FormGroup } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: name,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      console.log("PaymentMethod", paymentMethod);
      alert("Payment Success");
      setLoading(false);
      navigate("/dashboard");

      // Send the payment method ID to your server to complete the payment
    }
  };
  return (
    <Card sx={{ mt: 2 }}>
      <MDBox p={3}>
        <form onSubmit={handleSubmit}>
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
        </form>
      </MDBox>
    </Card>
  );
};

export default PaymentForm;
