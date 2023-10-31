import React from "react"
import Link from "next/link"

export default function HostVanThumbnail({ id, name, price, imageUrl }){
    return (
        <Link className="host-van--thumbnail" href={`/host/vans/${id}`}>
            <h1 className="host-van--thumbnail__name">{ name }</h1>
            <p className="host-van--thumbnail__price">${ price }/day</p>
            <img className="host-van--thumbnail__image" src={ imageUrl } alt="An image of a van available for rental." />
        </Link>
    )
}
