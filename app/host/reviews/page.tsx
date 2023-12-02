import Review from "@/app/components/Review"
import { Text } from "@mantine/core"

import { getReviews } from "@/app/api/reviewUtils";

export default async function Reviews() {
    const reviews = await getReviews();

    const reviewElements = reviews.map(review => (
        <Review
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
            {reviewElements}
        </section>
    )
}
