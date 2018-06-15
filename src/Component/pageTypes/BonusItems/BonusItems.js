import React from 'react'
import {connect} from 'react-redux'
import * as siteActions from '../../../store/actions/siteActions'

import pageClasses from '../Page.css'
import classes from './BonusItem.css'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../Component/CentreContent/CentreContent'

import Timer from '../../../Component/timer/timer'



const bonusItems  = ( props ) => {
    const {bonusItem} = {...props}
    console.log ('percent', bonusItem)

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
                {
                    current ? 
                        this.props.bonusData.map((item, index) => {
                            
                        } )
                    :
                    null
                }

                </CentreContent>
            </ContentHolder>
        </React.Fragment>

    )
}

const mapStateToProps = state => { // map redux state to class props
    return {
        currentIndex: state.currentIndex,
        bonusData: state.bonusData
    }
}

export default connect( mapStateToProps )( bonusItems ) 