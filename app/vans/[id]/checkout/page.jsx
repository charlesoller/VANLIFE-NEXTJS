// "use client"

import dayjs from 'dayjs'
import axios from "axios";

import { Flex } from "@mantine/core";
import { getVan } from "@/app/api/vanFetching";

import RentalInfo from "@/app/components/RentalInfo";
import PaymentForm from "@/app/components/PaymentForm";

import { loadStripe } from '@stripe/stripe-js';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    typescript: true,
    apiVersion: "2023-10-16",
});


export default async function Checkout({ params, searchParams }){
    const van = await getVan(params.id)
    const startDate = searchParams.from;
    const endDate = searchParams.to;
    const numDays = dayjs(endDate).diff(dayjs(startDate), 'day')
    const subtotal = van.price * numDays;
    const total = Math.round((subtotal + (subtotal * 0.06)) * 100);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(total),
        currency: "USD",
    });

    const options = {
        clientSecret: paymentIntent.client_secret,
    };

    return (
        <main style={{padding: '2em'}}>
            <Flex align='center' gap='lg' style={{height: '65vh'}}>
                <RentalInfo van={van} startDate={startDate} endDate={endDate} numDays={numDays} subtotal={subtotal} total={total}/>
                <PaymentForm options={options} />
            </Flex>
        </main>
    )
}
