import React from 'react'

import classes from './buttonHolder.css'

const buttonHolder = (props) => {
    return (
        <div className={classes.buttonHolder} style={{height:'60px'}}>
            {props.children}
        </div>
    )
}

export default buttonHolder
