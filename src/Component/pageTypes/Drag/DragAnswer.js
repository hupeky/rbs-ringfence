import React, {Component} from 'react'
import {connect} from 'react-redux'

import classes from '../Page.css'

import PageButton from '../../../UI/pageButton/pageButton'

import Character from '../../../assets/character/character'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../hoc/CentreContent/CentreContent'
import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'


class Info extends Component {
    state = {
        active: false
    }

    buildBonusResponseHandler ( bonusCorrect, locked, unlocked ) {
        return bonusCorrect ? <h3>{unlocked}</h3> : <h3>{locked}</h3>
    }

    render () {
        let {buttonLabel, label, bonusLabel, sliderRef, locked, unlocked} = this.props
        let isCorrect = null;
        
        isCorrect = this.props.questionData[label].isCorrect

        let current = false
        let bonusCorrect = false
        
        if ( bonusLabel ) {
            bonusCorrect = this.props.bonusData[bonusLabel].bonusCorrect
        }
        if ( ( this.props.index === this.props.currentIndex || this.props.index === this.props.currentIndex - 1 ) ) { // if current is true
            current = true;
        }
        return (
            <React.Fragment>
                <ContentHolder>
                    <CentreContent force={this.props.currentIndex} centre={this.props.centreContent}>
                        {this.props.title ? <h2>{this.props.title}</h2> : null}
                        {isCorrect ? <h3>{this.props.preRight}</h3> : <h3>{this.props.preWrong}</h3>}
                        {this.props.paragraph ? <p>{this.props.paragraph}</p> : null}
                        {bonusLabel ? this.buildBonusResponseHandler( bonusCorrect, locked, unlocked ) : null}
                        {this.props.image ? <img className={classes.pageImg} alt="" src={this.props.image} /> : null}
                    </CentreContent>
                </ContentHolder>

                <ButtonHolder>
                    <PageButton buttonLabel={buttonLabel} sliderRef={sliderRef} nextPage={true} label={label} />
                </ButtonHolder>
            </React.Fragment>


        )
    }
}

const mapStateToProps = state => { // map redux state to class props
    return {
        currentIndex: state.currentIndex,
        windowHeight: state.windowHeight,
        questionData: state.questionData,
        bonusData: state.bonusData
    }
}


export default connect( mapStateToProps )( Info ) 