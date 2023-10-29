import { Suspense } from "react";
import Link from "next/link";

import VanList from "./VanList"
import Loading from "../loading";

export default function Vans(){
    return (
        <>
            <div className="vans__grid">
                <Suspense fallback={<Loading />}>
                    <VanList />
                </Suspense>
            </div>
            <Link href="/vans/van-detail">Go to van detail </Link>
        </>
    )
}
