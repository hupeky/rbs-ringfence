import React from 'react'
import classes from './yesNoButton.css'

const yesNoButton = (props) => {
    return (
        <button onClick={props.click} className={[classes.yesNoButton, props.active ? classes.active : null].join(" ")}>{props.label}</button>
    )
}

export default yesNoButton
