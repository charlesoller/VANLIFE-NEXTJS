"use client"

import classes from '../modules/PaymentWidget.module.css'
import { Paper, Text, Flex, Divider, Space, Button } from '@mantine/core'
import { DateInput } from '@mantine/dates';

import { useState } from 'react';

export default function PaymentWidget({ price }){
    const [ startDate, setStartDate ] = useState<Date | null>(null);
    const [ endDate, setEndDate ] = useState<Date | null>(null);

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
            />
            <Space h="sm"/>
            <DateInput
                value={endDate}
                onChange={setEndDate}
                label="To:"
                placeholder="Date input"
            />
            <Divider my="lg"/>
            <Text>Total: $195 + tax</Text>
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
