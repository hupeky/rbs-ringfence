import React from 'react'
import classes from './dragFeedback.css'
const dragFeedback = ( props ) => {
    return (
        <div className={[classes.dragFeedback, props.isCorrect !== null ? classes.fadeIOut : null].join(" ")} >
            <p>{props.isCorrect ? 'Yes, you\'re right!' : 'Not quite right with that'}
            </p>
        </div>
    )
}

export default dragFeedback
