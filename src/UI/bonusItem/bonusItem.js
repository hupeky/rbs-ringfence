import React from 'react'
import {connect} from 'react-redux'
import * as siteActions from '../../../store/actions/siteActions'

import pageClasses from '../Page.css'
import classes from './bonusItem.css'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../Component/CentreContent/CentreContent'

import Timer from '../../../Component/timer/timer'

const bonusItem = ( props ) => {
    const {isLocked , isCurrent} = {...props}

    let current = false;

    if ( props.index === props.currentIndex ) {
        current = true
    }

    return (

    )
}

const mapStateToProps = state => { // map redux state to class props
    return {
        currentIndex: state.currentIndex,
    }
}

export default connect( mapStateToProps )( missionComplete ) 