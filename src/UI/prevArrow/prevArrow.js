import React from 'react'

function prevArrow ( props ) {
    const {className, style, onClick} = props;
    return (
        props.visible ? <div
            className={className}
            style={{...style, display: "block", left: '10px'}}
            onClick={onClick}
        /> : null
    )
}

export default prevArrow