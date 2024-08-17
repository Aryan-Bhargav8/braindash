"use client";

import React from 'react';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Checkout from "@/components/view/payment/Checkout";


if (process.env.NEXT_PUBLIC_STRIPE_KEY === undefined) {
  throw new Error("Somehow, the stripe key isn't defined ...");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);


const Payment = ( {amount} : { amount : number }) => {
  if (amount == 0) return <></>;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: Math.round(amount),
        currency: "usd",
      }}
    >
      <Checkout amount={amount} />
    </Elements>
  );
};

export default Payment;