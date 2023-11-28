import { Paper, Text, Title, Button, useMantineTheme, rem, Container } from '@mantine/core';
import Link from 'next/link';
import classes from '../modules/Carousel.module.css';

interface CardProps {
    image: string;
    title: string;
    category: string;
    children: string;
    id: string
    path: string
  }

export default function Card({ image, title, category, children, id, path }: CardProps) {

    return (
      <Paper
        style={{ backgroundImage: `url(${image})` }}
        shadow="md"
        p="xl"
        radius="xl"
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
        <Button variant="gradient" gradient={{ from: 'yellow', to: 'orange', deg: 90 }} radius='lg' component={Link} href={path}>
            {children}
        </Button>
      </Paper>
    );
  }
