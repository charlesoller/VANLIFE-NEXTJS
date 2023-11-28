import { IconCurrencyDollar, IconStar } from '@tabler/icons-react';
import { Card, Text, Group, Center, rem, useMantineTheme } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import classes from '../modules/ExploreVanCard.module.css';

import {useState, useEffect} from 'react'

import { createBrowserClient } from '@supabase/ssr';

import LikeButton from './LikeButton';

interface CardProps {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    type: string;
  }

export default function ExploreVanCard({id, name, price, imageUrl, type}: CardProps) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function getUser(){
      const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
      const { data } = await supabase.auth.getSession();

      if(data){
        setUser(data.session)
      }
    }

    getUser();
  }, [])


  const theme = useMantineTheme();

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="xl"
    >
      <div
        className={classes.image}
        style={{
          backgroundImage:
            `url(${imageUrl})`,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <div className={classes.likePosition}>
            {user && <LikeButton vanId={id} size={52}/>}
          </div>
          <Text size="lg" className={classes.title} fw={700}>
            {name}
          </Text>

          <Group justify="space-between" gap="xs">
            <Text size="md" className={classes.type}>
              {upperFirst(type)}
            </Text>

            <Group gap="lg">
              <Center>
                <IconCurrencyDollar
                    style={{ width: rem(22), height: rem(22) }}
                    stroke={2}
                    color={theme.colors.gray[0]}
                />
                <Text size="xl" className={classes.bodyText}>
                  {price}
                </Text>
              </Center>
              <Center>
                <IconStar
                  style={{ width: rem(20), height: rem(20) }}
                  stroke={2}
                  color={theme.colors.gray[0]}
                />
                <Text size="xl" className={classes.bodyText}>
                  4.8
                </Text>
              </Center>
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
}
