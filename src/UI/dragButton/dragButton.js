import React from 'react'
import classes from './dragButton.css'
const dragButton = (props) => {
    return (
        <div ref={(ref) => {this.ref = ref}} onMouseDown={props.myClick(this.ref)} className={classes.dragger}>Drag me</div>
    )
}
export default dragButton