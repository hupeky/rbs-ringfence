import React from 'react'
import classes from './listButton.css'

const listButton = (props) => {
    return (
        <button onClick={props.click} className={[classes.listButton, props.active ? classes.active : null].join(" ")}>{props.label}</button>
    )
}

export default listButton
