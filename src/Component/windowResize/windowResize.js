import {Component} from 'react'
 import {connect} from 'react-redux'
import * as siteActions from '../../store/actions/siteActions'

class WindowResize extends Component {
    componentWillMount () {
        const windowSize = () => {
            this.props.triggerWindowResizeEventHandler ( window.innerHeight ) 
        }
        window.addEventListener( 'resize', () => windowSize())
        windowSize()

    }
    render () {
        return (
            null
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerWindowResizeEventHandler: ( windowHeight ) => dispatch( {type: siteActions.TRIGGER_RESIZE, windowHeight:windowHeight } )
    }
}                   

export default connect( null, mapDispatchToProps )( WindowResize )
