
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import styles from "./Payment.module.scss";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_REACT_APPSTRIPE);

export default function CreditCardDetails() {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    const backendURL = process.env.NEXT_PUBLIC_REACT_APPBACKEND_URL
    // Create PaymentIntent as soon as the page loads
    fetch(backendURL+"/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

    return (
      <div className={`container ${styles.payment}`}>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    )

}