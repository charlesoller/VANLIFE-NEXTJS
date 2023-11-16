import { IconCurrencyDollar, IconStar, IconPeace } from '@tabler/icons-react';
import { Card, Text, Group, Center, rem, UnstyledButton, useMantineTheme } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import classes from '../modules/ExploreVanCard.module.css';

import PeaceButton from './PeaceIcon';

interface CardProps {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    type: string;
  }

export default function ExploreVanCard({id, name, price, imageUrl, type}: CardProps) {
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

          <PeaceButton vanId={id}/>

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
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                    color={theme.colors.gray[0]}
                />
                <Text size="lg" className={classes.bodyText}>
                  {price}
                </Text>
              </Center>
              <Center>
                <IconStar
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                  color={theme.colors.gray[0]}
                />
                <Text size="lg" className={classes.bodyText}>
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
