
import React from 'react'
import {connect} from 'react-redux'

const printName = ( props ) => {
    return <span>{props.nickname}</span>
}

const mapStateToProps = state => { // map redux state to class props
    return {
        nickname: state.nickname
    }
}

export default connect( mapStateToProps )( printName ) 
