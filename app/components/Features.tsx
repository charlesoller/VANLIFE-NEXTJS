import { ThemeIcon, Text, Container, SimpleGrid, Paper, rem } from '@mantine/core';
import { IconBrandStripe, IconBrandSupabase, IconBrandNextjs, IconBrandTypescript, IconBrandMantine } from '@tabler/icons-react';

export const MOCKDATA = [
  {
    icon: IconBrandNextjs,
    title: 'Next.js App Router',
    description:
      'By utilizing bleeding edge technology like Next.js App Router, server components are accelerate the rendering process to ensure a top-notch, performant application.',
  },
  {
    icon: IconBrandSupabase,
    title: 'Supabase',
    description:
      'Supabase is used to manage van details and user accounts, allowing users to login with email or o-auth, like vans, list vans, leave comments, reviews, and overall create a seamlessly connected experience',
  },
  {
    icon: IconBrandStripe,
    title: 'Stripe checkout',
    description:
      "Stripe's implementation means that the checkout process is smooth and efficient. Van Life features a full checkout flow, ready for production due to the inherent security with Stripe checkout.",
  },
  {
    icon: IconBrandTypescript,
    title: 'Typescript',
    description:
      'The utilization of Typescript adds type-safety to the front end of this project, allowing for much easier maintainability as the app grows.',
  },
  {
    icon: IconBrandMantine,
    title: 'Mantine + CSS Modules',
    description:
      'Mantine and CSS Modules are used to style the front end of this project, which is focused on accessibility and responsiveness. ',
  },
];

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius='xl' color='yellow'>
        <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" size='lg' mb={7}>
        {title}
      </Text>
      <Text size="md" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export default function Features() {
  const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <Container size='lg'>
        <Paper shadow="sm" radius="xl" withBorder style={{padding: '3em'}}>
            <Text
                variant='gradient'
                gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                fw={700}
                style={{fontSize: '2.5rem', marginBottom: '0.5em'}}
            >
                Cutting Edge Features
            </Text>
            <SimpleGrid
                mt={60}
                cols={{ base: 1, sm: 2, md: 3 }}
                spacing={{ base: 'xl', md: 50 }}
                verticalSpacing={{ base: 'xl', md: 50 }}
            >
                {features}
            </SimpleGrid>
        </Paper>
    </Container>
  );
}
