import React from 'react'

export default function TypeTag({ type, isFilter, className, isSelected }){
    const typeStyles = {
        background:
            type === "simple" ? "#E17654"
            : type === "rugged" ? "#115E59"
            : "#161616", //type is Luxury
        color: "#FFEAD0"
    }

    const filterStyle = {
        background: isSelected ?
                        type === "simple" ? "#E17654"
                        : type === "rugged" ? "#115E59"
                        : "#161616" //type is Luxury
                    : "#FFEAD0",
        color: isSelected ? "#FFEAD0" : "#4D4D4D"
    }

    return (
        <button className={`type-tag ${className}`} style={isFilter ? filterStyle : typeStyles}>
            { type }
        </button>
    )
}
