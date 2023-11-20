"use client"

import { Flex } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import Comment from './Comment';

export default function CommentCarousel(){
    return (
        <Flex gap="2em" style={{height: '270px'}}>
            <Carousel
                height="100%"
                withIndicators
                controlSize={40}
                slideSize="50%"
                slideGap="md"
                loop
                align="start"
                slidesToScroll={2}
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
