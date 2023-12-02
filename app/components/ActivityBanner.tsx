import classes from '@/app/modules/ActivityBanner.module.css'

import { Paper, BackgroundImage, Text, Flex, Button } from '@mantine/core'
import { getVan } from '../api/vanFetching'

export default async function ActivityBanner({vanId, totalCost, type}){
    const van = await getVan(vanId)

    return (
        <Paper shadow="sm" radius="xl" className={classes.body} withBorder my='2em'>
            <Flex>
                <div className={classes.imageContainer}>
                    <BackgroundImage
                        src="https://jmermaivisuixassniym.supabase.co/storage/v1/object/public/Images/Rectangle%20155.webp"
                        radius="xl"
                    >

                        <div className={classes.image}></div>
                    </BackgroundImage>
                </div>
                <Flex direction='column' justify="center" ml='1em'>
                    <Text c='dimmed' className={classes.type}>{van.type}</Text>
                    <Text
                        variant='gradient'
                        gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                        fw={700}
                        style={{fontSize: '2.5rem', marginBottom: '0.5em'}}
                        my='0'
                    >
                        {van.name}
                    </Text>
                </Flex>
                <Flex ml='auto' mr='2em' direction='column' justify='center'>
                    <Button radius='xl' size='xs' color={type === 'transaction' ? 'green' : 'red'} className={classes.transactionType}>{type === 'order' ? 'order' : 'income'}</Button>
                    <Text
                        variant='gradient'
                        gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                        fw={700}
                        style={{fontSize: '2.5rem', marginBottom: '0.5em'}}
                        my='0'
                    >
                        ${totalCost}
                    </Text>
                </Flex>
            </Flex>
        </Paper>
    )
}
