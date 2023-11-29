"use client"

import { Flex } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Comment from './Comment';

export default function CommentCarousel({comments}){
    const commentElements = comments.map(comment => (
        <Carousel.Slide>
            <Comment commenterId={comment.commenterId} rating={comment.rating} commentBody={comment.comment}/>
        </Carousel.Slide>
    ))

    return (
        <Flex gap="2em" style={{height: '100%'}}>
            <Carousel
                withIndicators
                controlSize={40}
                slideSize="50%"
                slideGap="md"
                loop
                align="start"
                slidesToScroll={1}
            >
                { commentElements }
            </Carousel>
        </Flex>
    )
}
