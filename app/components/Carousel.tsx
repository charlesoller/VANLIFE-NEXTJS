"use client"

import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useMantineTheme } from '@mantine/core';

import { Suspense, useRef, useState, useEffect } from 'react';

import Card from './VanCard';


export default function CardsCarousel({ elements }) {
    const autoplay = useRef(Autoplay({ delay: 5000 }));
    // const [vans, setVans] = useState([]);

    // useEffect(() => {
    //     async function loadVans() {
    //         const data = await getVans()
    //         console.log("DATA", data)
    //         setVans(data)
    //         console.log("VANS", vans)
    //     }

    //     loadVans()
    //     // console.log("here", vans)

    // }, []);

    const theme = useMantineTheme();
    // const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const slides = elements.map(van => (
        <Carousel.Slide key={van.name}>
            <Card
                image={van.imageUrl}
                title={van.name}
                category={van.type}
            >
                Rent this van
            </Card>
        </Carousel.Slide>
    ));

    // const vansElement = vans.map(van => {
    //     const thumbnailEle =
    //         <Link className="van--thumbnail" href={`/vans/${van.id}`} key={ van.id }>
    //             <VanThumbnail
    //                 id={ van.id }
    //                 name={ van.name }
    //                 price={ van.price }
    //                 imageUrl = { van.imageUrl }
    //                 type={ van.type }
    //             />
    //         </Link>
    //     return type ? van.type === type ? thumbnailEle : null : thumbnailEle;
    // })


    return (
    <Carousel
        withIndicators
        controlSize={50}
        slideSize={{ base: '100%', sm: '50%' }}
        slideGap="md"
        initialSlide={1}
        loop
        align="start"
        slidesToScroll={2}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
    >
        {slides}
    </Carousel>
    );
}
