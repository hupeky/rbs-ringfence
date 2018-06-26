import React from 'react'
import classes from './yesNoButton.css'

const yesNoButton = (props) => {
    return (
        <button  tabIndex="-1" onClick={props.click} className={[classes.yesNoButton, props.active ? classes.active : null, props.answer ? classes.answer : null].join(" ")}>{props.label}</button>
    )
}

export default yesNoButton
