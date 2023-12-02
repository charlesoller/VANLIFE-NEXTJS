import { Paper, Text, Avatar, Flex, Divider} from "@mantine/core"
import { IconStarFilled } from '@tabler/icons-react';
import { getVan } from "../api/vanFetching";
import { getCurrentUserById } from "../api/api";

export default async function Review({vanId, rating, comment, commenterId}){

    const van = await getVan(vanId);
    const reviewer = await getCurrentUserById(commenterId)

    return (
        <Paper shadow="sm" radius="xl" p='lg' my='md' withBorder>
            <Flex justify='space-between'>
                <Flex gap='md' align='center'>
                    <Avatar radius="xl" size='4rem' src={van.imageUrl}/>
                    <Text size="xl" fw={700} style={{fontSize: '1.8rem'}}>{van.name}</Text>
                    <Text c="dimmed">from: {reviewer.first_name} {reviewer.last_name}</Text>
                </Flex>
                <Flex align="center" gap='xs'>
                    <Text c='yellow' fw={700} style={{fontSize: '2rem'}}>{rating} <IconStarFilled /></Text>
                </Flex>
            </Flex>
            <Divider my='lg'/>


            <Text>
                {comment}
            </Text>
        </Paper>
    )
}
