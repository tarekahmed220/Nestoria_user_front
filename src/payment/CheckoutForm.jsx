import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axiosInstance from "../apis/axiosConfig";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentStatus("Payment failed");
      return;
    }

    // Send payment information to server
    const response = await axiosInstance.post(
      "/api/payment/create-payment-intent",
      { amount: 50 },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const { clientSecret } = response.data;
    // const { clientSecret } = await response.json();

    const { error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: paymentMethod.id,
      }
    );

    if (confirmError) {
      setPaymentStatus("Payment failed");
    } else {
      setPaymentStatus("Payment successful");
      console.log("successfully payment");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-black min-h-10 w-[400px]"
    >
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      <p>{paymentStatus}</p>
    </form>
  );
};

export default CheckoutForm;
