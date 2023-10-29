import React from 'react'
import TypeTag from './TypeTag'

export default function VanThumbnail({ name, price, imageUrl, type }){
    return (
        <div>
            <img className="van--thumbnail__image" src={ imageUrl } alt='An image of a van available for rent.' />
            <h3 className="van--thumbnail__name">{ name }</h3>
            <h3 className="van--thumbnail__price">${ price }</h3>
            <p className="van--thumbnail__price-subtext">/day</p>
            <TypeTag className="van--thumbnail__type" type={type} isFilter={false}/>
        </div>
    )
}
