import React, {Component} from 'react'
import classes from './dragButton.css'
class DragButton extends Component {
    componentDidMount () {
        this.props.setRef(this.ref)
    }
    render () {
        return <div ref={(ref) => {this.ref = ref}} onTouchStart={this.props.mousedown} onMouseDown={this.props.mousedown} className={classes.dragger}>{this.props.children}</div>
    }
}

export default DragButton