import { Suspense } from "react";
import Link from "next/link";

import VanList from "./VanList"
import { filtersElement } from "./VanList";
import Loading from "../loading";

export default function Vans(){

    return (
        <main className="vans">
            <h1 className="vans__title">Explore our van options</h1>
            <div className="vans__filters">
                {filtersElement}
            </div>
            <div className="vans__grid">
                <Suspense fallback={<Loading />}>
                    <VanList />
                </Suspense>
            </div>
        </main>
    )
}
