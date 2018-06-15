import React from 'react'

function nextArrow ( props ) {
    const {className, style, onClick} = props;
    return (
        props.visible ? <div
            className={className}
            style={{...style, display: "block", right: '15px'}}
            onClick={onClick}
        /> : null
    )
}

export default nextArrow