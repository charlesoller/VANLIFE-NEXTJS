"use client"

import { useForm } from '@mantine/form';
import { Container, Paper, TextInput, Flex, Text, Group } from '@mantine/core';

import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

export default function Settings(){
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: null,
            photo: null,
            password: null
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
            <Paper shadow="sm" radius="xl" p="xl" withBorder>
                <form>
                    <Flex direction='column' gap='md'>
                        <TextInput
                                size='md'
                                radius="xl"
                                label="First Name"
                                description="Change your username"
                                placeholder="Name"
                                {...form.getInputProps('name')}
                        />
                        <TextInput
                            size='md'
                            radius="xl"
                            label="Last name"
                            description="Change your username"
                            placeholder="Name"
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            size='md'
                            radius="xl"
                            label="Email"
                            description="Change your username"
                            placeholder="Name"
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            size='md'
                            radius="xl"
                            label="Password"
                            description="Change your username"
                            placeholder="Name"
                            {...form.getInputProps('name')}
                        />
                        <Dropzone
                            onDrop={(files) => {
                                form.setFieldValue('image', files)
                                setFiles(files);
                            }}
                            onReject={(files) => console.log('rejected files', files)}
                            maxSize={3 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                            {...form.getInputProps('image')}
                        >
                            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                                <div>
                                    <Text size="xl" inline>
                                        Drag images here or click to select files
                                    </Text>
                                    <Text size="sm" c="dimmed" inline mt={7}>
                                        Attach as many files as you like, each file should not exceed 5mb
                                    </Text>
                                </div>
                            </Group>
                        </Dropzone>
                    </Flex>
                </form>
            </Paper>
        </Container>
    )
}
