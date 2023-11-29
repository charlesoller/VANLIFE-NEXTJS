"use client"

import { useForm } from "@mantine/form"
import { Textarea, Button, Rating, Text } from "@mantine/core"

import { createBrowserClient } from "@supabase/ssr"

import { useRouter } from "next/navigation"

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function AddCommentForm({userId, vanId, hostId, closeModal}){

    const router = useRouter()
    const form = useForm({
        initialValues: {
            comment: '',
            rating: 5
        }
    })

    async function handleVanSubmit(values){
        //fetching the current comments from supabase
        const { data, error: fetchError } = await supabase.from('vans')
            .select('comments')
            .eq('id', vanId)
        if(fetchError) console.log(fetchError)
        //checking if there are currently any comments
        //if not, set it equal to an array with the current comment
        //if so then push the comment object into the array
        let currComments = data[0].comments;
        if(!currComments){
            currComments = [{comment: values.comment, rating: values.rating, commenterId: userId}]
        } else {
            currComments.push({comment: values.comment, rating: values.rating, commenterId: userId})
        }

        //uploading to supabase
        const { error: uploadError } = await supabase.from('vans')
            .update({ comments: currComments })
            .eq('id', vanId)
        if(uploadError) console.log(uploadError)
    }

    async function handleUserSubmit(values){
        //fetching the current comments from supabase
        const { data, error: fetchError } = await supabase.from('users')
            .select('comments')
            .eq('id', userId)
        if(fetchError) console.log(fetchError)
        //checking if there are currently any comments
        //if not, set it equal to an array with the current comment
        //if so then push the comment object into the array
        let currComments = data[0].comments;
        if(!currComments){
            currComments = [{comment: values.comment, rating: values.rating, vanId: vanId}]
        } else {
            currComments.push({comment: values.comment, rating: values.rating, vanId: vanId})
        }
        //uploading to supabase
        const { error: uploadError } = await supabase.from('users')
            .update({ comments: currComments })
            .eq('id', userId)
        if(uploadError) console.log(uploadError)
    }

    async function handleSubmit(values){
        handleVanSubmit(values);
        handleUserSubmit(values);
        closeModal();
        router.push(`/vans/${vanId}`)
        router.refresh();
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
