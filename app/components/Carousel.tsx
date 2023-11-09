"use client"

import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useMantineTheme } from '@mantine/core';

import { Suspense, useRef, useState, useEffect } from 'react';

import Card from './CarouselCard';

const vans = [
    {
        name: 'The Cruiser',
        type: 'luxury',
        imageUrl: 'https://jmermaivisuixassniym.supabase.co/storage/v1/object/sign/Images/Rectangle%20155.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvUmVjdGFuZ2xlIDE1NS53ZWJwIiwiaWF0IjoxNjk4ODYyODAxLCJleHAiOjE4NTY1NDI4MDF9.Bgxeaab4BOP-Dnrb0aL2qahqm4_YEQasY0pU3qMoUVI&t=2023-11-01T18%3A20%3A03.350Z'
    },
    {
        name: 'Green Wonder',
        type: 'rugged',
        imageUrl: 'https://jmermaivisuixassniym.supabase.co/storage/v1/object/sign/Images/Rectangle%20156.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvUmVjdGFuZ2xlIDE1Ni53ZWJwIiwiaWF0IjoxNjk4ODYyODcxLCJleHAiOjE4NTY1NDI4NzF9.sbl4iLcKbP5FN7_WcFGMfS3HSeDYkaj88CrkTw4YfzE&t=2023-11-01T18%3A21%3A12.280Z'
    },
    {
        name: 'Beach Bum',
        type: 'rugged',
        imageUrl: 'https://jmermaivisuixassniym.supabase.co/storage/v1/object/public/Images/Rectangle%20163.webp'
    }
]

console.log(vans[2].imageUrl)

export default function CardsCarousel() {
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

    const slides = vans.map(van => (
        <Carousel.Slide key={van.name}>
            <Card
                image={van.imageUrl}
                title={van.name}
                category={van.type}
            />
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
