"use client"

import { TextInput, Textarea, Text, SimpleGrid, Group, Title, Button, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function Contact() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  return (
    <Paper shadow="sm" radius="xl" withBorder style={{padding: '3em'}}>
        <form onSubmit={form.onSubmit(() => {"mailto:charlesrello@gmail.com"})}>
        <Text
                variant='gradient'
                gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                fw={700}
                style={{fontSize: '2.5rem', marginBottom: '0.5em'}}
            >
                Contact Me
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
            <TextInput
            radius='lg'
            label="Name"
            placeholder="Your name"
            name="name"
            variant="filled"
            {...form.getInputProps('name')}
            />
            <TextInput
            radius='lg'
            label="Email"
            placeholder="Your email"
            name="email"
            variant="filled"
            {...form.getInputProps('email')}
            />
        </SimpleGrid>

        <TextInput
            label="Subject"
            radius='lg'
            placeholder="Subject"
            mt="md"
            name="subject"
            variant="filled"
            {...form.getInputProps('subject')}
        />
        <Textarea
            mt="md"
            radius='lg'
            label="Message"
            placeholder="Your message"
            maxRows={10}
            minRows={5}
            autosize
            name="message"
            variant="filled"
            {...form.getInputProps('message')}
        />

        <Group justify="center" mt="xl">
            <Button
                size="lg"
                variant="gradient"
                gradient={{ from: 'yellow', to: 'orange' }}
                radius='xl'
            >
                Send message
            </Button>
        </Group>
        </form>
    </Paper>
  );
}
