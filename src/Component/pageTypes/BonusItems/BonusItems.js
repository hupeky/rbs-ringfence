import React from 'react'
import {connect} from 'react-redux'
//import pageClasses from '../Page.css'
import classes from './BonusItems.css'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../hoc/CentreContent/CentreContent'

import Timer from '../../../Component/timer/timer'
import BonusItem from '../../../UI/bonusItem/bonusItem'

import LockIcon from '../../../assets/bonus/lock/lock'

import PageButton from '../../../UI/pageButton/pageButton'
import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'

const bonusItems = ( props ) => {
    const {bonusLabel, locked, unlocked, sliderRef, label, buttonLabel } = {...props}

    let current = false;
    let bonusItemsList = [null]
    let bonusCorrect = null

    if ( ( props.index === props.currentIndex || props.index === props.currentIndex - 1 ) ) { // if current is true
        current = true;
        bonusItemsList = Object.keys( props.bonusData ).map( ( item, index ) => {
            if ( props.bonusData[item].bonusCorrect === null ) {
                return <div key={index} className={classes.bonusItem}><LockIcon /></div>
            } else {
                let currentBonus = props.bonusData[item].bonusLabel === bonusLabel

                bonusCorrect = props.bonusData[item].bonusCorrect
                let BonusIcon = props.bonusData[item].icon

                return <div key={index} className={classes.bonusItem}>
                    <BonusItem selected={props.bonusData[item].selected} bonusCorrect={props.bonusData[item].bonusCorrect} icon={BonusIcon} label={item} correct={bonusCorrect} current={currentBonus} />
                </div>
            }
        } )
    } else { // build default lock list
        bonusItemsList = Object.keys( props.bonusData ).map( ( item, index ) => {return <div key={index} className={classes.bonusItem}><LockIcon /></div>} )
    }



    const onTimeOutHndler = () => {
        props.sliderRef.slickNext( 2 )
    }
    return (

        <React.Fragment>
            {current ? <Timer time={3500} notVisible={true} onTimeOut={onTimeOutHndler} /> : null}
            <ContentHolder>
                <CentreContent force={props.currentIndex} centre={props.centreContent}>
                    <div className={classes.bonusHolder}>
                        {props.bonusData[bonusLabel].bonusCorrect ?
                            <React.Fragment>
                                <h3 className={classes.subTitle} >{unlocked}</h3>
                            </React.Fragment>
                            :
                            <h3 className={classes.subTitle} >{locked}</h3>
                        }
                        {bonusItemsList}
                    </div>
                </CentreContent>
            </ContentHolder>
            <ButtonHolder>
                <PageButton buttonLabel={buttonLabel} sliderRef={sliderRef} nextPage={true} label={label} />
            </ButtonHolder>
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