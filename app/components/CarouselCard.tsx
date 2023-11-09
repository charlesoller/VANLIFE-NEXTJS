import { Paper, Text, Title, Button, useMantineTheme, rem, Container } from '@mantine/core';
import Link from 'next/link';
import classes from '../modules/Carousel.module.css';

interface CardProps {
    image: string;
    title: string;
    category: string;
  }

export default function Card({ image, title, category }: CardProps) {
    return (
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        style={{ backgroundImage: `url(${image})` }}
        className={classes.card}
      >
        <div>
          <Text className={classes.category} size="xs">
            {category}
          </Text>
          <Title order={3} className={classes.title}>
            {title}
          </Title>
        </div>
        <Link href="/vans">
          <Button variant="gradient" gradient={{ from: 'yellow', to: 'orange', deg: 90 }}>
              Rent this van
          </Button>
        </Link>
      </Paper>
    );
  }
