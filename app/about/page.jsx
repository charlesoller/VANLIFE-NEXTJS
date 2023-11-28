import { Container, Text, Button, Flex, Divider, Space } from '@mantine/core';
import classes from '../modules/About.module.css';
import { IconBrandGithub } from '@tabler/icons-react';
import Features from '../components/Features';
import SelfPromo from '../components/SelfPromo';
import Contact from '../components/Contact';

export default function About() {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          A{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'yellow', to: 'orange' }} inherit>
            Next.js
          </Text>{' '}
          full CRUD van rental app
        </h1>

        <Text className={classes.description} c="dimmed">
          Van Life is a full CRUD (create, read, update, delete) van rental application modeled on similar apps in the market such as Airbnb.
        </Text>

        <Flex className={classes.controls} gap='xl'>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'yellow', to: 'orange' }}
            radius='xl'
          >
            Explore Vans
          </Button>

          <Button
            component="a"
            href="https://github.com/charlesoller/VANLIFE-NEXTJS"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<IconBrandGithub />}
            radius='xl'
          >
            GitHub
          </Button>
        </Flex>
      </Container>
      <Container size='lg' mb={100}>
        <Features />
        <Divider my={80}/>
        <Contact />
      </Container>
    </div>
  );
}
