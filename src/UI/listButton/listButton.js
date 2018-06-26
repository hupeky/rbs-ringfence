import React from 'react'
import classes from './listButton.css'

const listButton = ( props ) => {
    return (
        <button tabIndex="-1" onClick={props.click} className={[classes.listButton, props.active ? classes.active : null, props.answer ? classes.answer : null].join( " " )}>{props.label}</button>
    )
}

export default listButton

