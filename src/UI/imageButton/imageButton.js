import React from 'react'
import classes from './imageButton.css'

const listImage = (props) => {
    let columnWidth = 100 / props.columns
    return (
        <img style={{width:`${columnWidth-5}%`}}  src={props.image} onClick={props.click} className={[classes.imageButton, props.active ? classes.active : null].join(" ")} alt="" />
    )
}

export default listImage
