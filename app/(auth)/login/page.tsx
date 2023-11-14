"use client"

import { useRouter } from "next/navigation";

import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm, UseFormReturnType } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container
} from '@mantine/core';

import { GoogleButton } from '../../components/GoogleButton';
import { handleLogin } from "../authActions";


export default function AuthenticationForm() {
  const router = useRouter();

  async function handleSubmit( form : UseFormReturnType<FormValues> ){
    const error = await handleLogin(form.values.email, form.values.password);
    if (error) console.log(error.message)
    else {
      router.push('/host')
      router.refresh();
    }
  }

  interface FormValues {
    email: string;
    name: string;
    password: string;
    terms: boolean;
  }

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    }
  });

  return (
    <Container my={100}>
      <Paper radius="lg" p="xl" withBorder>
        <Text size="xl" fw={500}>
          Lets get rollin', login with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl" onClick={() => console.log("FIX ME")}>Google</GoogleButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(() => handleSubmit(form))}>
          <Stack>

            <TextInput
              required
              label="Email"
              placeholder="hello@vanlife.app"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor href="/signup" c="dimmed" size="xs">
                Don't have an account? Register
            </Anchor>
            <Button type="submit" radius="xl" color='yellow'>
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
