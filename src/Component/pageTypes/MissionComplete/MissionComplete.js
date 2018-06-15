import React from 'react'
import {connect} from 'react-redux'
import * as siteActions from '../../../store/actions/siteActions'

import pageClasses from '../Page.css'
import classes from './MissionComplete.css'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../Component/CentreContent/CentreContent'

import Timer from '../../../Component/timer/timer'

const missionComplete = ( props ) => {
    const {percent} = {...props}
    console.log ('percent', percent)

    let current = false;

    if ( props.index === props.currentIndex ) {
        current = true
    }

    const onTimeOutHndler = () => {
        props.sliderRef.slickNext()
    }
    return (
        <React.Fragment>
             {current ? <Timer time={2000} notVisible={true} onTimeOut={onTimeOutHndler} /> : null}
            <ContentHolder>
                <CentreContent force={props.currentIndex}>
                    <p className={classes.subtext}>Mission is {percent} complete</p>
                    <div className={classes.barHolder}>
                        <div style={{width: current ? percent : null}} className={classes.bar} />
                    </div>
                </CentreContent>
            </ContentHolder>
        </React.Fragment>

    )
}

const mapStateToProps = state => { // map redux state to class props
    return {
        currentIndex: state.currentIndex,
    }
}

export default connect( mapStateToProps )( missionComplete ) 