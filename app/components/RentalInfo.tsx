import dayjs from 'dayjs';

import { Text, Paper, Flex, Stack, Divider } from '@mantine/core'
import Image from 'next/image'
import classes from '../modules/RentalInfo.module.css'

export default function RentalInfo({van, startDate, endDate, numDays, subtotal, total}){
    return (
        <section className={classes.body} style={{ padding: '2em' }}>
            <Paper shadow="sm" radius="xl" withBorder p="xl" style={{ width: '100%' }}>
                <Text
                    variant='gradient'
                    gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                    fw={700}
                    style={{fontSize: '2.5rem', marginBottom: '0.5em'}}
                >
                    Ready for some wheels?
                </Text>
                <Flex gap='xl'>
                    <div style={{height: '40vh', width: '50%', position: 'relative'}}>
                        <Image
                            src={van.imageUrl}
                            alt="An image of the van you're renting"
                            sizes='100%'
                            fill={true}
                            className={classes.image}
                        />
                    </div>

                    <Stack align='flex-start' justify='flex-start' gap='xs'>
                        <Text fw={700} style={{fontSize: '1.8rem'}} my='0'>{van.name}</Text>
                        <Text c='dimmed' size='sm' mt='0'>{`Your rental from ${dayjs(startDate).format('dddd, MMM D')} to ${dayjs(endDate).format('dddd, MMM D')}`}</Text>
                        <Divider w='100%' my='md' />
                        <Text fw={500}>{`$${van.price}`}<Text span c='dimmed'>/night</Text></Text>
                        <Text fw={500}>{numDays}<Text span c='dimmed'> {numDays === 1 ? 'night' : 'night'}</Text></Text>
                        <Text fw={500}>Subtotal: ${subtotal}<Text span c='dimmed'> + tax</Text></Text>
                        <Divider w='100%' my='sm' />
                        <Text fw={700} size='xl'>Total: ${(total/100).toFixed(2)}</Text>
                    </Stack>
                </Flex>
            </Paper>
        </section>

    )
}

// .imageContainer {
//     position: relative;
// }

// .image {
//     object-fit: cover;
//     object-position: 50% 70%;
//     border-radius: 2rem;
// }
