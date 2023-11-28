"use client"

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation';

import { nanoid } from 'nanoid'

import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Group, Flex, Text, Button, Space, TextInput, Textarea, NativeSelect, Slider, SimpleGrid, Image, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function uploadImage(file) {
    const {data, error} = await supabase
        .storage
        .from('Images')
        .upload(`${file[0].path}`, file[0])

    if(error){
        console.log(error)
    }
}

async function getImageUrl(imageUrl){
    const {data} = await supabase
        .storage
        .from('Images')
        .getPublicUrl(imageUrl)

    return data
}

async function handleSubmit(form, router){
    const { data } = await supabase.auth.getSession()

    uploadImage(form.image)
    const imageUrl = await getImageUrl(form.image[0].path)

    const hostId = await getUserIdByEmail(data.session.user.email)

    const { error } = await supabase
        .from('vans')
        .insert({ id: nanoid(), name: form.name, description: form.description, type: form.type.toLowerCase(), imageUrl: imageUrl.publicUrl, price: form.price, hostId: hostId})

    if(error){
        console.log("ERROR HERE", error)
    } else {
        router.push('/vans');
        router.refresh();
    }
}

async function getUserIdByEmail(email){
    const { data, error } = await supabase
        .from('users')
        .select('email, id')
        .eq('email', email)

    if(error){
        console.log(error)
    }

    return data[0].id
}

export default function AddListing(){
    const router = useRouter();
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
            <Text
                variant='gradient'
                gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                fw={700}
                style={{fontSize: '2rem'}}
            >
                List a New Van
            </Text>
            <Divider mt='sm' mb='xl'/>
            <form onSubmit={form.onSubmit(values => handleSubmit(values, router))}>
                <Flex
                    direction="column"
                    gap="xl"
                >
                    <TextInput
                        size='md'
                        radius="xl"
                        label="Van Name"
                        description="The punchier the name, the more likely someone is to rent your van."
                        withAsterisk
                        placeholder="Name"
                        {...form.getInputProps('name')}
                    />
                    <Textarea
                        size='md'
                        radius="xl"
                        label="Van Description"
                        description="Give the renter an idea of what your van's all about."
                        withAsterisk
                        placeholder="Description"
                        {...form.getInputProps('description')}
                    />
                    <NativeSelect
                        size = "md"
                        radius="xl"
                        label="Van Type"
                        withAsterisk
                        description="If you could describe your van in one word..."
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
                    <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
                        {previews}
                    </SimpleGrid>
                    <Space h='md' />
                    <Button type="submit" variant="gradient" gradient={{ from: 'yellow', to: 'orange', deg: 90 }} size='xl' radius='xl'>Submit</Button>
                </Flex>
            </form>
        </>
    )
}
