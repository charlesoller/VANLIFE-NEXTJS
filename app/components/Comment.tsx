import { Text, Avatar, Group, Paper, Space } from '@mantine/core';

export default function Comment(){
    return (
        <Paper shadow="sm" radius="xl" p="xl">
            <Group>
            <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                alt="Jacob Warnhalter"
                radius="xl"
            />
            <div>
                <Text size="md">Jacob Warnhalter</Text>
                <Text size="xs" c="dimmed">
                10 minutes ago
                </Text>
            </div>
            </Group>
            <Space my='sm' />
        <Text size="sm" ta="justify">
          This Pokémon likes to lick its palms that are sweetened by being soaked in honey. Teddiursa
          concocts its own honey by blending fruits and pollen collected by Beedrill. Blastoise has
          water spouts that protrude from its shell. The water spouts are very accurate.
        </Text>
      </Paper>
    )
}
