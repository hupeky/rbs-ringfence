import React, {Component} from 'react'
import {connect} from 'react-redux'

import classes from './Page.css'

class page extends Component {
    
    render() {
        let {index} = this.props
        return (    
            <div style={{color: 'white'}} index={index} className={classes.Page}>
                {/* {this.props.inTransition ? <div>I am Transitioning</div> : null}
                {this.props.current ? <div>I am current</div> : <div>I am not current</div>} */}
                {this.props.children}
            </div>
        )
    }

}

const mapStateToProps = state => { // map redux state to class props
    return {
        currentIndex: state.currentIndex,
    }
}

export default connect( mapStateToProps )( page ) 