// import Image from 'next/image'
import { Overlay, Container, Title, Button, Text } from '@mantine/core';
import classes from './modules/Home.module.css';
import Link from 'next/link'
import CardsCarousel from './components/Carousel';
import SelfPromo from './components/SelfPromo';

import { getVans } from './api/vanFetching'

export default async function Home() {
  const vans = await getVans();

  return (
    <main>
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container}>
          <Title className={classes.title}>You got the travel plans, we got the travel vans.</Title>
          <Text className={classes.description} size="xl" mt="xl">
            Add adventure to your life by joining the #vanlife movement.<br />Rent the perfect van to make your perfect road trip.
          </Text>
          <Link href="/vans">
            <Button variant="gradient" gradient={{ from: 'yellow', to: 'orange', deg: 90 }} size="xl" radius="xl" className={classes.control}>
              Find your van
            </Button>
          </Link>
        </Container>
      </div>
      <div>
        <Container size='xxl' mt='xl' mb='xl'>
          <CardsCarousel elements={vans}/>
        </Container>
      </div>
      <Container size='xxl' mt='xl' mb='xl'>
        <SelfPromo />
      </Container>
    </main>
  );
}
