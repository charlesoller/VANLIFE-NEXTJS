"use client"

import { useForm } from "@mantine/form"
import { Textarea, Button, Rating, Text } from "@mantine/core"

import { createBrowserClient } from "@supabase/ssr"

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function AddCommentForm({userId, vanId, hostId}){

    //the name will come automatically and be passed down, just need a form for text input and star rating
    //the comment component will pull the name and photo from a passed in commenter id
    const form = useForm({
        initialValues: {
            comment: '',
            rating: 5
        }
    })

    function handleSubmit(values){
        console.log(values)
        console.log(userId)
    }

    return (
        <div style={{padding: '1em'}}>
            <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                <Text size='lg' fw={500}>Rating</Text>
                <Rating defaultValue={5} size='xl' {...form.getInputProps('rating')} />
                <Textarea
                    size='lg'
                    autosize
                    minRows={6}
                    radius="xl"
                    mt='lg'
                    mb='xl'
                    label="Comment"
                    description="How was your experience with this van?"
                    withAsterisk
                    placeholder="Tell us what you liked, and maybe what you didn't."
                    {...form.getInputProps('comment')}
                />
                <Button type='submit' variant="gradient" gradient={{ from: 'yellow', to: 'orange', deg: 90 }} radius='xl' size='lg'>
                    Submit
                </Button>
            </form>
        </div>
    )
}
