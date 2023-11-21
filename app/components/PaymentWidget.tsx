"use client"
import dayjs from 'dayjs';

import classes from '../modules/PaymentWidget.module.css'
import { Paper, Text, Flex, Divider, Space, Button } from '@mantine/core'
import { DateInput } from '@mantine/dates';

import { useState, useEffect } from 'react';

export default function PaymentWidget({ price }){
    const currentDate = new Date();
    // const nextDate = new Date();
    // nextDate.setDate(nextDate.getDate() + 1)
    const [ startDate, setStartDate ] = useState<Date | null>(currentDate);
    const [ endDate, setEndDate ] = useState<Date | null>(dayjs(currentDate).add(1, 'day').toDate());
    // const [ endDateMinusOne, setEndDateMinusOne ] = useState<Date | null>(new Date());
    const [ numDays, setNumDays ] = useState(1);

    useEffect(() => {
        // endDateMinusOne.setEndDateMinusOne(endDate.getDate() - 1)
        setNumDays(Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)))
    },[startDate, endDate]);
    // console.log(startDate)

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
            {/* <Button
                // fullWidth
                size="lg"
                radius="xl"
                variant="gradient"
                gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                className={classes.rentButton}
            >
                Rent Now
            </Button> */}
            <button
                className={classes.rentButton}
            >
                Rent Now

            </button>
        </Paper>
    )
}
