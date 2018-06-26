import React from 'react'

import classes from './carouselItem.css'

const carousel = ( props ) => {
    let display = 'none'
    if ( props.answer && props.active ) {
        display = 'block'
    }
    if ( !props.answer ) {
        display = 'block'
    }
    return (
        <React.Fragment>
            <img style={{display: display}} alt="" className={classes.carouselItem} src={props.image} />
            <p>{props.label}</p>
        </React.Fragment>

    )
}

export default carousel
