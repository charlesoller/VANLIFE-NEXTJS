"use client"

import { Text, Flex, Button, Modal, Space } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useState } from "react"
import CommentCarousel from "./CommentCarousel"
import AddCommentForm from "./AddCommentForm";

export default function CommentSection({userId, vanId, hostId}){
    const [ error, setError ] = useState(null)
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Flex justify='space-between'>
                <Text
                    variant='gradient'
                    gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                    fw={700}
                    style={{fontSize: '1.7rem', marginBottom: '0.5em'}}
                >
                    This is what people are saying
                </Text>
                <div>
                    <Text c='red' fw={700}>
                        {error}
                    </Text>
                    <Space my='xs'/>
                    <Button
                        variant={userId ? 'gradient' : 'outline'}
                        color={!userId && 'yellow'}
                        gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                        radius='xl'
                        size='lg'
                        onClick={userId ? open : () => setError("Log in to comment.")}
                    >
                        + Comment
                    </Button>
                </div>
            </Flex>
            <div>
                <CommentCarousel />
            </div>

            <Modal opened={opened} onClose={close} title='Leave a Comment' radius='xl' centered>
                <AddCommentForm userId={userId} vanId={vanId} hostId={hostId} closeModal={close}/>
            </Modal>
        </>
    )
}
