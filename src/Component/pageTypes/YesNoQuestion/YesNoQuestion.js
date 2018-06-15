import React, {Component} from 'react'

import {connect} from 'react-redux'
import * as siteActions from '../../../store/actions/siteActions'

import pageClasses from '../Page.css'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../Component/CentreContent/CentreContent'

import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'
import PageButton from '../../../UI/pageButton/pageButton'
import YesNoButton from '../../../UI/yesNoButton/yesNoButton'

import Timer from '../../timer/timer'

class yesNoQuestion extends Component {
    state = {
        selected: this.props.questionData[this.props.label].questionItems.map( ( item ) => {return false} ),

    }

    buildQuestionHandler ( title, question ) {
        return (
            <React.Fragment>
                <h2>{title}</h2>
                <p className={pageClasses} >{question}</p>
            </React.Fragment>
        )
    }

    buildAnswerHandler ( isCorrect, preRight, preWrong, answer ) {
        return (
            <p>{isCorrect ? preRight : preWrong} {answer}</p>
        )
    }

    selectYesNoHandler = ( answer, label, sliderRef, index ) => {
        sliderRef.slickNext()

        let currentSelected = this.state.selected.map(item => false)
        currentSelected[index] = !currentSelected[index]
        this.setState( {selected: currentSelected} )

        console.log( this.state.selected )
        this.props.setAnswerHandler( answer, label )
    }

    buildYesNoNuttonsHandler = (question, label, sliderRef) => {
        return this.props.questionData[label].questionItems.map( ( item, index ) => {
            return question ?
                <YesNoButton key={index} label={item.label} active={this.state.selected[index]} click={() => this.selectYesNoHandler( [item.value], label, sliderRef, index )} />
                :
                <YesNoButton key={index} label={item.label} active={this.props.questionData[label].questionItems[index].value} />
        } )
    }
    bonusTimedoutHandler = ( didTimeOut, label, bonusLabel, sliderRef ) => {
        if ( didTimeOut ) {
            this.props.setBonusAnswerHandler( false, bonusLabel )
            this.props.setAnswerHandler( [false], label )
            sliderRef.slickNext()
        }

    }

    render () {
        let current = false;
        let {title, question, label, preWrong, preRight, answer, sliderRef, buttonLabel, bonusLabel, bonusQuestion} = {...this.props};

        let isCorrect = null;
        isCorrect = this.props.questionData[label].isCorrect

        if ( this.props.index === this.props.currentIndex ) {
            current = true
        }

        return (
            <React.Fragment>
                {( bonusQuestion && current ) ? <Timer time={this.props.bonusData[bonusLabel].bonusTime} start={current} onTimeOut={( didTimeOut ) => this.bonusTimedoutHandler( didTimeOut, label, bonusLabel,sliderRef )} /> : null}
                <ContentHolder>
                    <CentreContent>
                        {question ?
                            this.buildQuestionHandler( title, question )
                            :
                            this.buildAnswerHandler( isCorrect, preRight, preWrong, answer )
                        }
                        {this.buildYesNoNuttonsHandler(question, label, sliderRef)}
                    </CentreContent>
                </ContentHolder>

                <ButtonHolder>
                    {!question ? <PageButton buttonLabel={buttonLabel} nextPage={true} sliderRef={this.props.sliderRef} label={label} /> : null}
                </ButtonHolder>
            </React.Fragment>
        )
    }

}

/* { // the format of the object being spread as props
    type: 'YesNoQuestion',  
    label: 'question1',
    title: 'Page title',
    question: 'Question, is this question 1?',
    subText: 'This is a bit more explanation',
    yesNoLabel: ['Yes', 'No'],
    correctAnswer: true
}, */

const mapStateToProps = state => { // map redux state to class props
    return {
        currentIndex: state.currentIndex,
        questionData: state.questionData,
        bonusData: state.bonusData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAnswerHandler: ( answer, label ) => dispatch( {type: siteActions.SET_ANSWER, answer: answer, label: label} ),
        setBonusAnswerHandler: ( answer, bonusLabel ) => dispatch( {type: siteActions.SET_BONUS_ANSWER, answer: answer, bonusLabel: bonusLabel} ),

    }
}

export default connect( mapStateToProps, mapDispatchToProps )( yesNoQuestion ) 