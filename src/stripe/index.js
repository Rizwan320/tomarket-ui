import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from "./PaymetForm";

const stripePromise = loadStripe(
  "pk_test_51P8MQPP28UXraLM3qpisAFy05yKaI3FpWoiY1YgnPBOSa1KQWdPejdWsu9Bg2xN53qlqG5UZ9rXTr5hQL6RSPLPj00DMObxzWF"
);
const StripeForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeForm;
