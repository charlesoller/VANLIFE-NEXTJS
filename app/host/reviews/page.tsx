import Review from "@/app/components/Review"
import { Text } from "@mantine/core"

import { getReviews } from "@/app/api/reviewUtils";
import { nanoid } from "nanoid";

export default async function Reviews() {
    let reviews = await getReviews();
    if(!reviews) reviews = []

    const reviewElements = reviews.map(review => (
        <Review
            key={nanoid()}
            vanId={review.vanId}
            rating={review.rating}
            comment={review.comment}
            commenterId={review.commenterId}
        />
    ))
    return (
        <section>
            <Text
                variant='gradient'
                gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                fw={700}
                style={{fontSize: '3rem', marginBottom: '0.5em'}}
                my='0'
            >
                Your Reviews
            </Text>
            {
                reviews.length ?
                reviewElements
                : <Text>You do not yet have any reviews</Text>
            }
        </section>
    )
}
