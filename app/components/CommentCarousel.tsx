"use client"

import { Flex } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import Comment from './Comment';

export default function CommentCarousel(){
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
                <Carousel.Slide>
                    <Comment />
                </Carousel.Slide>
                <Carousel.Slide>
                    <Comment />
                </Carousel.Slide>
                <Carousel.Slide>
                    <Comment />
                </Carousel.Slide>
            </Carousel>
        </Flex>
    )
}
