"use client";

import { Button } from '@mantine/core';

import {PaymentElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import Stripe from "stripe";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  typescript: true,
  apiVersion: "2023-10-16",
});

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements) {
    // Stripe.js hasn't yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    return;
  }

  setIsLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: "http://localhost:3000",
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    setMessage(error.message);
  } else {
    setMessage("An unexpected error occurred.");
  }

  setIsLoading(false);
};

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <Button radius='xl' size='lg' variant='gradient' mt='lg' gradient={{ from: 'yellow', to: 'orange', deg: 90 }}>
        Pay
      </Button>
    </form>
  );
};

export default function PaymentForm({options}){
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  )
}
