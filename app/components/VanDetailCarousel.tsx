import classes from '../modules/VanDetailCarousel.module.css'

import Image from 'next/image'

interface VanProps {
    van: {
        name: string,
        description: string,
        type: string,
        imageUrl: string,
        price: number,
        id: string,
        hostId: string
    }
}

export default function VanDetailCarousel({ van }: VanProps){
    return (
        <section className={classes.grid}>
            <div className={`${classes.imageContainer} ${classes.main}`}>
                <Image
                    src={van.imageUrl}
                    alt="An image of a van available for rent."
                    sizes='100%'
                    fill={true}
                    className={classes.image}
                />
            </div>
            <div className={classes.imageContainer}>
                <Image
                    src={van.imageUrl}
                    alt="An image of a van available for rent."
                    sizes='100%'
                    fill={true}
                    className={classes.image}
                />
            </div>
            <div className={classes.imageContainer}>
                <Image
                    src={van.imageUrl}
                    alt="An image of a van available for rent."
                    sizes='100%'
                    fill={true}
                    className={classes.image}
                />
            </div>
        </section>
    )
}
