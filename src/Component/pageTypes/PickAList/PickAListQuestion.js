import React, {Component} from 'react'

import {connect} from 'react-redux'
import * as siteActions from '../../../store/actions/siteActions'

import pageClasses from '../Page.css'

import ListButton from '../../../UI/listButton/listButton'
import ImageButton from '../../../UI/imageButton/imageButton'
import Carousel from '../../../UI/Carousel/Carousel'

import PageButton from '../../../UI/pageButton/pageButton'
import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../Component/CentreContent/CentreContent'
import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'

import Timer from '../../timer/timer'

class pickAList extends Component {
    state = {
        selected: this.props.questionData[this.props.label].questionItems.map( ( item ) => {return false} ),
        funny: false,
        disabled: 'disabled'
    }

    selectListHandler ( index, items, bonusQuestion, label, bonusLabel ) {

        let updatedFunny = this.state.funny;
        let currentSelected = [...this.state.selected]
        if ( items[index].funny === true ) {
            updatedFunny = !updatedFunny;
            this.setState( {
                funny: updatedFunny,
            } )
        }

        currentSelected[index] = !currentSelected[index]
        this.setState( {
            selected: currentSelected,
            disabled: false
        } )

        if ( bonusQuestion ) {
            let isCorrect = currentSelected.every( ( item, index ) => item === this.props.questionData[label].correctAnswer[index] )
            console.log( 'isCorrect', isCorrect )
            if ( isCorrect ) {
                console.log( 'isCorrect', isCorrect )
                this.props.setBonusAnswerHandler( isCorrect, bonusLabel )
                this.submitListHandler( currentSelected, label )
            }

        }
    }

    submitListHandler = ( answer, label ) => {
        this.props.setAnswerHandler( answer, label, this.state.funny )
        this.props.sliderRef.slickNext()
    }

    buildPageButtonHandler ( question, label, buttonLabel, sliderRef, bonusQuestion ) {
        let button
        if ( question ) {
            button = <PageButton disabled={this.state.disabled} click={() => this.submitListHandler( this.state.selected, label )} buttonLabel={buttonLabel} sliderRef={sliderRef} nextPage={true} label={label} />
        } else {
            button = <PageButton buttonLabel={buttonLabel} sliderRef={sliderRef} nextPage={true} label={label} />
        }
        if ( bonusQuestion ) {
            button = null
        }
        return button
    }

    buildAnswerText = ( preRight, preWrong, preFunny, answer, isCorrect ) => {
        switch ( isCorrect ) {
            case true: return (
                <React.Fragment>
                    <p>{preRight} </p>
                    <p>{answer}</p>
                </React.Fragment>
            )
            case false: return (
                <React.Fragment>
                    <p>{preWrong} </p>
                    <p>{answer}</p>
                </React.Fragment>
            )
            case 'funny': return (
                <React.Fragment>
                    <p>{preFunny} </p>
                    <p>{answer}</p>
                </React.Fragment>
            )
            default: return <p>{answer}</p>
        }
    }

    bonusTimedoutHandler = ( didTimeOut, label, bonusLabel ) => {
        if ( didTimeOut ) {
            this.props.setBonusAnswerHandler( false, bonusLabel )
            this.submitListHandler( this.state.selected, label )
        }

    }

    render () {
        let current = false;
        let {title, question, label, bonusLabel, questionItems, buttonLabel, sliderRef, preWrong, preRight, preFunny, answer, bonusQuestion, buttonType} = {...this.props};

        let isCorrect = null;
        isCorrect = this.props.questionData[label].isCorrect

        if ( this.props.index === this.props.currentIndex ) {
            current = true
        }

        const buildPageButtonsHandler = () => {
            const buttonType = this.props.questionData[label].buttonType
            const buttonCount = Object.keys( this.props.questionData[label].questionItems ).length

            let buttonColumns = 3
            if ( buttonCount > 5 ) {
                buttonColumns = 3
            }
            if ( buttonCount > 10 ) {
                buttonColumns = 4
            }
            if ( buttonCount > 14 ) {
                buttonColumns = 5
            }

            let list = []
            list = this.props.questionData[label].questionItems.map( ( item, index ) => {
                let button = null
                switch ( buttonType ) {
                    case 'list':
                        return question ?
                            button = <ListButton click={() => this.selectListHandler( index, questionItems, bonusQuestion, label, bonusLabel )} key={index} active={this.state.selected[index]} label={item.label} />
                            :
                            button = <ListButton key={index} active={this.props.questionData[label].correctAnswer[index]} label={item.label} />
                    case 'image':
                        return question ?
                            button = <ImageButton click={() => this.selectListHandler( index, questionItems, bonusQuestion, label, bonusLabel )} columns={buttonColumns} image={item.image} key={index} active={this.state.selected[index]} label={item.label} />
                            :
                            button = <ImageButton columns={buttonColumns} image={item.image} key={index} active={this.props.questionData[label].correctAnswer[index]} label={item.label} />
                    case 'carousel':                
                        return <img key={index} alt='' src={item.image} />
                    default:
                        list.push( <p>Sorry error creating buttons</p> )
                        break
                }
                return button
            } )
            return list

        }

        return (
            <React.Fragment>
                {( bonusQuestion && current ) ? <Timer time={this.props.bonusData[bonusLabel].bonusTime} start={current} onTimeOut={( didTimeOut ) => this.bonusTimedoutHandler( didTimeOut, label, bonusLabel )} /> : null}
                <ContentHolder>
                    <CentreContent force={this.props.currentIndex}>
                        <h2>{title}</h2>

                        {question ? <p className={pageClasses} >{question}</p> : null}
                        {!question ? this.buildAnswerText( preRight, preWrong, preFunny, answer, isCorrect ) : null}

                        {buttonType === 'carousel' ? <Carousel onUpdate={(index) => this.selectListHandler( index, questionItems, bonusQuestion, label, bonusLabel )} > {buildPageButtonsHandler()} </Carousel> : buildPageButtonsHandler() }
                    </CentreContent>
                </ContentHolder>
                <ButtonHolder>
                    {this.buildPageButtonHandler( question, label, buttonLabel, sliderRef, bonusQuestion )}
                </ButtonHolder>
            </React.Fragment>
        )
    }

}

/* // object format
type: 'PickAListQuestion',
question: 'Question, is this question 2?',
label: 'question2',
questionItems: [
{label: 'item1 funny wrong', value: false},
{label: 'item2 wrong', value: false},
{label: 'item3 correct', value: true},
    ],
    buttonLabel: 'Am I right?',
    correctAnswer: [false,false,true]
}
*/

const mapStateToProps = state => { // map redux state to class props
    return {
        currentIndex: state.currentIndex,
        questionData: state.questionData,
        bonusData: state.bonusData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAnswerHandler: ( answer, label, funny ) => dispatch( {type: siteActions.SET_ANSWER, answer: answer, label: label, funny: funny} ),
        setBonusAnswerHandler: ( answer, bonusLabel ) => dispatch( {type: siteActions.SET_BONUS_ANSWER, answer: answer, bonusLabel: bonusLabel} ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( pickAList ) 