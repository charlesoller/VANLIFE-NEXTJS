"use client"

import { Text, Flex, Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import CommentCarousel from "./CommentCarousel"
import AddCommentForm from "./AddCommentForm";

export default function CommentSection({userId, vanId, hostId}){
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
                <Button
                    variant='gradient'
                    gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                    radius='xl'
                    size='lg'
                    onClick={open}
                >
                    + Comment
                </Button>
            </Flex>
            <div>
                <CommentCarousel />
            </div>

            <Modal opened={opened} onClose={close} title='Leave a Comment' radius='xl' centered>
                <AddCommentForm userId={userId} vanId={vanId} hostId={hostId}/>
            </Modal>
        </>
    )
}
