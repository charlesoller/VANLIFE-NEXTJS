"use client"

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

    function changeBackground(event) {
        event.target.style.background = typeStyles.background;
        event.target.style.color = typeStyles.color;
    }

    function clearBackground(event) {
        event.target.style.background = filterStyle.background;
        event.target.style.color = filterStyle.color;
    }

    return (
        <button className={`type-tag ${className}`} style={isFilter ? filterStyle : typeStyles} onMouseEnter={isFilter ? changeBackground : null} onMouseLeave={isFilter ? clearBackground : null}>
            { type }
        </button>
    )
}
