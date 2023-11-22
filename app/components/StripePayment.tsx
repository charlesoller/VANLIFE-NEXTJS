"use client";

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";

export default function PaymentForm() {
//   const stripe = useStripe();
//   const elements = useElements();

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const cardElement = elements?.getElement("card");

//     try {
//       if (!stripe || !cardElement) return null;
//       const { data } = await axios.post("/api/create-payment-intent", {
//         data: { amount: 89 },
//       });
//       const clientSecret = data;

//       await stripe?.confirmCardPayment(clientSecret, {
//         payment_method: { card: cardElement },
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

  return (
    <form>
      <PaymentElement />
      <button type="submit">Submit</button>
    </form>
  );
}
