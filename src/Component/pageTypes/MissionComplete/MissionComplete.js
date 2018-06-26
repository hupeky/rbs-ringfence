import React from 'react'
import {connect} from 'react-redux'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../hoc/CentreContent/CentreContent'
import Timer from '../../../Component/timer/timer'

import MissionBar from '../../../UI/missionBar/missionBar'

const missionComplete = ( props ) => {
    const {percent} = {...props}

    let current = false;

    if ( props.index === props.currentIndex ) {
        current = true
    }

    const onTimeOutHndler = () => {
        props.sliderRef.slickNext()
    }
    return (
        <React.Fragment>
            {current ? <Timer time={2500} notVisible={true} onTimeOut={onTimeOutHndler} /> : null}
            <ContentHolder>
                <CentreContent force={props.currentIndex} centre={props.centreContent}>
                    <MissionBar current={current} percent={percent}/>
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
