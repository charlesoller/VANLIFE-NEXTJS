"use client";

import { Button, Paper } from '@mantine/core';

import {PaymentElement, Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { useState } from 'react'

import { addTransaction, removeTransaction } from '../api/transactionUtils';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutForm = ({vanId, numDays}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e, vanId, numDays) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const id = await addTransaction(vanId, numDays)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3000/vans/${vanId}/checkout/thank-you`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
      removeTransaction(id);
    } else {
      setMessage("An unexpected error occurred.");
      removeTransaction(id);
    }

    setIsLoading(false);
  };

  return (
    <Paper shadow="sm" radius="xl" withBorder p="xl" style={{ width: '30%' }}>
      <form onSubmit={(e) => handleSubmit(e, vanId, numDays)}>
        <PaymentElement />
        <Button
          disabled={isLoading || !stripe || !elements}
          variant='gradient'
          gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
          size='lg'
          radius='xl'
          mt='lg'
          type='submit'
        >
          Pay now
        </Button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </Paper>
  );
};

export default function PaymentForm({options, vanId, numDays}){
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm vanId={vanId} numDays={numDays} />
    </Elements>
  )
}
