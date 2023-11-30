"use client"

import { Flex } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

export default function CommentCarousel({commentElements}){
    return (
        <Flex gap="2em" style={{height: '100%'}}>
            <Carousel
                style={{width: '100%'}}
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
