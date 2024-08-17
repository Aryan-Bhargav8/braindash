import React from 'react';
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
interface MyPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page = async ({ searchParams }: MyPageProps) => {

  const amount = searchParams.amount;
  const payment_intent = searchParams.payment_intent;
  const client_secret = searchParams.payment_intent_client_secret;

  //TODO: payment is complete, process it
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent as string);
    if (paymentIntent.status === "succeeded") {
      return <p>Payment ok.</p>;
    } else {
      return <p>Payment failed.</p>;
    }
  } catch (e) {
    return <p>Some error has happened.</p>;
  }
};

export default Page;