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
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container
} from '@mantine/core';

import { GoogleButton } from '../../components/GoogleButton';
import { handleSignup, handleSignInWithGoogle } from '../authActions';

export default function AuthenticationForm() {
  const router = useRouter();

  async function handleSubmit( form : UseFormReturnType<FormValues> ){
      const {loginError, uploadError} = await handleSignup(form.values.firstName, form.values.lastName, form.values.email, form.values.password);

      if (loginError) console.log(loginError.message)
      else if (uploadError) console.log(uploadError.message)
      else router.push('/verify')
  }

  interface FormValues {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
  }

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      confirmPassword: val => (val !== form.values.password ? "Your passwords don't match" : null)
    },
  });

  return (
    <Container my={100}>
      <Paper radius="lg" p="xl" withBorder>
        <Text size="xl" fw={500}>
          Lets get rollin!, sign up with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(() => handleSubmit(form))}>
          <Stack>
            <Group grow>
              <TextInput
                required
                label="First Name"
                placeholder="Your first name"
                value={form.values.firstName}
                onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                radius="md"
              />

              <TextInput
                label="Last Name"
                placeholder="Your last name"
                value={form.values.lastName}
                onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                radius="md"
              />
            </Group>

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

            <PasswordInput
              required
              label="Confirm Password"
              placeholder="Confirm your password"
              value={form.values.confirmPassword}
              onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
              error={form.errors.confirmPassword && "Your passwords do not match!"}
              radius="md"
            />

            <Checkbox
              required
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor href="/login" c="dimmed" size="xs">
              Already have an account? Login
            </Anchor>
            <Button type="submit" radius="xl" color='yellow'>
              Sign Up
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
