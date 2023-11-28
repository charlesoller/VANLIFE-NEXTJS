"use client"
import dayjs from 'dayjs';

import classes from '../modules/PaymentWidget.module.css'
import { Paper, Text, Flex, Divider, Space, Button } from '@mantine/core'
import { DateInput } from '@mantine/dates';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PaymentWidget({ price, id, user }){
    console.log(user)
    const currentDate = new Date();
    const [ startDate, setStartDate ] = useState<Date | null>(currentDate);
    const [ endDate, setEndDate ] = useState<Date | null>(dayjs(currentDate).add(1, 'day').toDate());
    const [ numDays, setNumDays ] = useState(1);

    useEffect(() => {
        setNumDays(Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)))
    },[startDate, endDate]);

    return (
        <Paper className={classes.body} shadow="sm" radius="xl" withBorder>
            <Flex align="baseline">
                <Text className={classes.price} fw={700} variant='gradient' gradient={{ from: 'orange', to: 'yellow', deg: 90 }}>${price}</Text>
                <Text c="dimmed" size="md">/night</Text>
            </Flex>
            <Divider my="sm"/>
            <DateInput
                value={startDate}
                onChange={setStartDate}
                label="From:"
                placeholder="Date input"
                minDate={ currentDate }
                maxDate={ dayjs(endDate).subtract(1, 'day').toDate() }
                radius='xl'
            />
            <Space h="sm"/>
            <DateInput
                value={endDate}
                onChange={setEndDate}
                label="To:"
                placeholder="Date input"
                minDate={ dayjs(startDate).add(1, 'day').toDate() }
                radius='xl'
            />
            <Divider my="lg"/>
            <Text>Total: {`$${price * numDays}`} + tax</Text>
            <Divider my="lg"/>
            <Link
                href={{
                    pathname: `/vans/${id}/checkout`,
                    query: {from: dayjs(startDate).format('MM-DD-YYYY').toString(), to: dayjs(endDate).format('MM-DD-YYYY').toString()}
                }}
            >
                <button
                    className={classes.rentButton}
                    disabled={user ? false : true}
                    style={!user ? {background: "transparent", color: "#D9D02F", border: "3px solid #D9D02F"} : null}
                >
                    {user ? "Rent Now" : "Must Log In First"}
                </button>
            </Link>
        </Paper>
    )
}
