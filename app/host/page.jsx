import Link from "next/link"

export default function HostDashboard(){
    return (
        <>
            <h1>Host Dashboard here</h1>
            <Link href="/host/income">Go to income</Link>
            <Link href="/host/vans">Go to vans</Link>
            <Link href="/host/reviews">Go to reviews</Link>
        </>
    )
}
