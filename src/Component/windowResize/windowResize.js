import {connect} from 'react-redux'
import * as siteActions from '../../store/actions/siteActions'

const WindowResize = (props) => {
    window.addEventListener( 'resize', props.triggerWindowResizeEventHandler )
    return null
}


const mapDispatchToProps = dispatch => {
    return {
        triggerWindowResizeEventHandler: ( ) => dispatch( {type: siteActions.TRIGGER_RESIZE} )
    }
}                   

export default connect( null, mapDispatchToProps )( WindowResize )
