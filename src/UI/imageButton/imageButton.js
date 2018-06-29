import React from 'react'
import classes from './imageButton.css'

const listImage = ( props ) => {
    let columnWidth = 100 / props.columns
    return (
        <div style={{width: `${columnWidth}%`}} className={classes.imageButton}  onClick={props.click} >
            <img className={props.active ? classes.active : null} src={props.image} alt="" />
            <p>{props.label}</p>
        </div>

    )
}

export default listImage
