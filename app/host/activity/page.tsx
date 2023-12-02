import ActivityBanner from "@/app/components/ActivityBanner"
import { getActivities } from "@/app/api/activityUtils"
import { Text } from "@mantine/core"

export default async function Activity(){
    const activities = await getActivities();
    const activityElements = activities.map(activity => (
        <ActivityBanner
            key={activity.transaction_id}
            vanId={activity.van_id}
            totalCost={activity.total_amount}
            type={activity.type}
        />
    ))
    return (
        <>
            <Text
                variant='gradient'
                gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
                fw={700}
                style={{fontSize: '3rem', marginBottom: '0.5em'}}
                my='0'
            >
                Recent Activity
            </Text>
            {activityElements}
        </>
    )
}
