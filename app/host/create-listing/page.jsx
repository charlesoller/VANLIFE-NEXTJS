"use client"

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr'


import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Group, Flex, Text, Button, Space, TextInput, Textarea, NativeSelect, Slider, SimpleGrid, Image } from '@mantine/core';
import { useForm } from '@mantine/form';

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function uploadImage(file) {
    console.log("FLAG", file)
    const {data, error} = await supabase
        .storage
        .from('Images')
        .upload("test/image.png", file[0])
}

async function handleSubmit(form){
    uploadImage(form.image)
    console.log(form)
    // const { error } = await supabase
    //     .from('vans')
    //     .insert({ id: 123, name: form.name, description: form.description, type: form.type, imageUrl: null, price: form.price, hostId: 222})
}

export default function CreateListing(){
    const [files, setFiles] = useState([]);

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    });

    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            type: 'simple',
            price: 50,
            image: files,
        }
    })

    return (
        <>
            <h1> List a new van </h1>
            <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                <Flex
                    direction="column"
                    gap="lg"
                >
                    <TextInput
                        radius="xl"
                        label="Van Name"
                        description="The punchier the name, the more likely someone will rent your van."
                        withAsterisk
                        placeholder="Name"
                        {...form.getInputProps('name')}
                    />
                    <Textarea
                        radius="xl"
                        label="Van Description"
                        description="Give the renter an idea of what your van's all about."
                        withAsterisk
                        placeholder="Description"
                        {...form.getInputProps('description')}
                    />
                    <NativeSelect
                        radius="xl"
                        label="Van Type"
                        description="If you could describe your van in one word..."
                        withAsterisk
                        placeholder="Type"
                        data={["Simple", "Rugged", "Luxury"]}
                        {...form.getInputProps('type')}
                    />

                    <Text size="md" mt="xl">Price Per Night</Text>
                    <Slider
                        color="yellow"
                        min={50}
                        max={500}
                        label={price => `$${price}`}
                        marks={[
                            { value: 50, label: '$50' },
                            { value: 100, label: '$100' },
                            { value: 200, label: '$200' },
                            { value: 300, label: '$300' },
                            { value: 400, label: '$400' },
                            { value: 500, label: '$500' },
                        ]}
                        {...form.getInputProps('price')}
                    />
                    <Space h="lg" />
                    <Dropzone
                        onDrop={(files) => {
                            form.setFieldValue('image', files)
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
                    <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
                        {previews}
                    </SimpleGrid>
                    <Space h='md' />
                    <Button type="submit" variant="filled" color="yellow">Submit</Button>
                </Flex>
            </form>
        </>
    )
}
