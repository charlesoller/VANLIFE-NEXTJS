"use client"

import { nanoid } from 'nanoid'

import { useRouter } from "next/navigation";
import { createBrowserClient } from '@supabase/ssr'

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


    if (type === 'register'){
      const {loginError, uploadError} = await handleSignup(form.values.name, form.values.email, form.values.password);

      if (loginError) console.log(loginError.message)
      else if (uploadError) console.log(uploadError.message)
      else router.push('/verify')

    } else {
      const error = await handleLogin(form.values.email, form.values.password);
      if (error) console.log(error.message)
      else {
        router.push('/host')
        router.refresh();
      }
    }
  }

  interface FormValues {
    email: string;
    name: string;
    password: string;
    terms: boolean;
  }

  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <Container my={100}>
      <Paper radius="lg" p="xl" withBorder>
        <Text size="xl" fw={500}>
          Lets get rollin', login with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(() => handleSubmit(form))}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                radius="md"
              />
            )}

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

            {type === 'register' && (
              <Checkbox
                required
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor href="/signup" c="dimmed" size="xs">
                Don't have an account? Register
            </Anchor>
            <Button type="submit" radius="xl" color='yellow'>
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
