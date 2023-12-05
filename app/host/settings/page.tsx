"use client"

import { Container, Paper, TextInput, PasswordInput, Flex, Text, Group, Button, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

export default function UpdateProfileForm(){
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            photo: '',
            password: ''
        }
    })

    return (
        <Container>
            <Text
                variant='gradient'
                gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                fw={700}
                style={{fontSize: '3rem', marginBottom: '0.5em'}}
                my='0'
            >
                Account Settings
            </Text>
            <Text c="dimmed" mb='sm'>Note: this form is currently non-functional</Text>
            <Paper shadow="sm" radius="xl" p="xl" withBorder>
                <form>
                    <Flex direction='column' gap='md'>
                        <TextInput
                            size='md'
                            radius="xl"
                            label="First Name"
                            description="Update your first name"
                            placeholder="First Name"
                            {...form.getInputProps('firstName')}
                        />
                        <TextInput
                            size='md'
                            radius="xl"
                            label="Last name"
                            description="Update your last name"
                            placeholder="Last Name"
                            {...form.getInputProps('lastName')}
                        />
                        <PasswordInput
                            size='md'
                            radius="xl"
                            label="Password"
                            description="Update your password"
                            placeholder="******"
                            {...form.getInputProps('password')}
                        />
                        <Text fw={500} my='0'>Profile Picture</Text>
                        <Text c='dimmed' my='0'>Change your profile picture</Text>
                        <Dropzone
                            onDrop={(files) => {}}
                            onReject={(files) => console.log('rejected files', files)}
                            maxSize={3 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                            {...form.getInputProps('photo')}
                        >
                            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                                <div>
                                    <Text size="xl" inline>
                                        Drag images here or click to select a file
                                    </Text>
                                    <Text size="sm" c="dimmed" inline mt={7}>
                                        Attach the file that you would like to use as your profile picture, the file should not exceed 5mb
                                    </Text>
                                </div>
                            </Group>
                        </Dropzone>
                    </Flex>
                </form>
                <Center mt='md'>
                    <Button size='xl' variant='gradient' gradient={{from: 'yellow', to: 'orange'}}>
                        Submit
                    </Button>
                </Center>
            </Paper>
        </Container>
    )
}
