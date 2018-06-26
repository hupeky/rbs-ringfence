import React from 'react'

import classes from './contentHolder.css'

const contentHolder = ( props ) => {

    return (
        
            <div className={classes.contentHolder}>
             
                <div className={classes.innerHolder}>
                
                    {props.children}
                    
                </div>
                
            </div>
        
    )
}

export default contentHolder
