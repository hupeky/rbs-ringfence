import React from 'react'
import classes from './dragAreaButton.css'

const dragAreaButton = (props) => {
    return (
        <div className={[classes.collectedItem, classes.fadeIn, props.correct ? classes.correct : classes.notCorrect].join( " " )}>{props.label}</div>
    )
}

export default dragAreaButton
