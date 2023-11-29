import { Text, Avatar, Group, Paper, Space } from '@mantine/core';
import { createBrowserClient } from '@supabase/ssr';
import { IconStarFilled } from '@tabler/icons-react';
import { Flex } from '@mantine/core';

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function Comment({commenterId, rating, commentBody}){
    async function getCurrentUserById(userId: string){
        const {data, error} = await supabase
            .from('users')
            .select()
            .eq('id', userId)

        if(error){
            console.log(error.message)
        }

        return data[0]
    }
    const user = await getCurrentUserById(commenterId);
    return (
        <Paper shadow="sm" radius="xl" p="xl" style={{height: '97%'}}>
            <Flex gap='md'>
                <Avatar
                    src={user.photo}
                    alt={`${user.first_name} ${user.last_name}`}
                    radius="xl"
                />
                <Flex justify='space-between' direction='column'>
                    <Text size="md">{user.first_name} {user.last_name}</Text>
                    <Text fw={600} c='yellow'>{rating} <IconStarFilled size={12}/></Text>
                </Flex>
            </Flex>
            <Space my='sm' />
        <Text size="sm">
          {commentBody}
        </Text>
      </Paper>
    )
}
