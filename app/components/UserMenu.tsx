"use client"

import { Menu, Group, Text, Avatar, useMantineTheme, ActionIcon, rem } from '@mantine/core';
import {
  IconLogout,
  IconHeart,
  IconGauge,
  IconMessage,
  IconSettings,
  IconChevronRight,
  IconUserCircle,
  IconHome2
} from '@tabler/icons-react';

import { useRouter } from "next/navigation";
import { createBrowserClient } from '@supabase/ssr';

export function UserMenu({ user }) {
  const theme = useMantineTheme();
  const router = useRouter();

  // Functions
  const handleLogout = async () => {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )

    const { error } = await supabase.auth.signOut();
    if(!error){
        router.push("/login")
        router.refresh()
    } else {
        console.log(error)
    }
  }

  return (
    <Group justify="center">
      <Menu
        withArrow
        width={300}
        position="bottom"
        transitionProps={{ transition: 'pop' }}
        withinPortal
      >
        <Menu.Target>
          <ActionIcon variant="default">
            {
            user.photo ?
            <Avatar
                radius="xl"
                src={user.photo}
                color="yellow"
              />
            :
            <IconUserCircle style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            rightSection={
              <IconChevronRight style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            }
          >
            <Group>
              <Avatar
                radius="xl"
                src={user.photo}
                color="yellow"
              />

              <div>
                <Text fw={500}>{user.first_name}</Text>
                <Text size="xs" c="dimmed">
                  {user.email}
                </Text>
              </div>
            </Group>
          </Menu.Item>

          <Menu.Divider />
            <Menu.Item
              leftSection={
                <IconHome2
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                  color={theme.colors.yellow[6]}
                />
              }
              component='a'
              href="/host"
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconGauge
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                  color={theme.colors.yellow[6]}
                />
              }
              component='a'
              href="/host/manage-listings"
            >
              Manage Listings
            </Menu.Item>
          <Menu.Divider />

          <Menu.Item
            leftSection={
              <IconHeart
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color={theme.colors.yellow[6]}

              />
            }
            component='a'
            href='/vans/liked'
          >
            Liked Listings
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconMessage
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
                color={theme.colors.blue[6]}
              />
            }
          >
            Activity
          </Menu.Item>

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item
            leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          >
            Account settings
          </Menu.Item>
          <Menu.Item
            leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
