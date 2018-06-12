import React, {Component} from 'react'

import {connect} from 'react-redux'
import * as siteActions from '../../../store/actions/siteActions'

import pageClasses from '../Page.css'

import ListButton from '../../../UI/listButton/listButton'
import ImageButton from '../../../UI/imageButton/imageButton'

import PageButton from '../../../UI/pageButton/pageButton'
import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../Component/CentreContent/CentreContent'
import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'

class pickAList extends Component {
    state = {
        selected: this.props.questionData[this.props.label].questionItems.map( ( item ) => {return false} ),
        funny: false,
        disabled: 'disabled'
    }

    selectListHandler ( index, items ) {

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
    }

    submitListHandler = ( answer, label ) => {
        this.props.setAnswerHandler( answer, label, this.state.funny )
        this.props.sliderRef.slickNext()
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

    render () {
        let {title, question, label, questionItems, buttonLabel, sliderRef, preWrong, preRight, preFunny, answer, } = {...this.props};
        let isCorrect = null;
        isCorrect = this.props.questionData[label].isCorrect    
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

            let list = []
            list = this.props.questionData[label].questionItems.map( ( item, index ) => {
                let button = null
                switch ( buttonType ) {
                    case 'list':
                        return question ?
                            button = <ListButton click={() => this.selectListHandler( index, questionItems )} key={index} active={this.state.selected[index]} label={item.label} /> 
                            :
                            button = <ListButton key={index} active={this.props.questionData[label].correctAnswer[index]} label={item.label} /> 
                    case 'image':
                        return question ?
                            button = <ImageButton click={() => this.selectListHandler( index, questionItems )} columns={buttonColumns} image={item.image} key={index} active={this.state.selected[index]} label={item.label} /> 
                            :
                            button = <ImageButton columns={buttonColumns} image={item.image} key={index} active={this.props.questionData[label].correctAnswer[index]} label={item.label} />
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
                <ContentHolder>
                    <CentreContent force={this.props.currentIndex}>
                    <h2>{title}</h2>

                    {question ? <p className={pageClasses} >{question}</p> : null}
                    {!question ? this.buildAnswerText( preRight, preWrong, preFunny, answer, isCorrect ) : null}

                    {buildPageButtonsHandler()}
                    </CentreContent>
                </ContentHolder>
                <ButtonHolder>
                    {question ?
                        <PageButton disabled={this.state.disabled} click={() => this.submitListHandler( this.state.selected, label )} buttonLabel={buttonLabel} sliderRef={sliderRef} nextPage={true} label={label} />
                        :
                        <PageButton buttonLabel={buttonLabel} sliderRef={sliderRef} nextPage={true} label={label} />
                    }
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
    */

const mapStateToProps = state => { // map redux state to class props
    return {
        currentIndex: state.currentIndex,
        questionData: state.questionData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAnswerHandler: ( answer, label, funny ) => dispatch( {type: siteActions.SET_ANSWER, answer: answer, label: label, funny: funny} ),

    }
}

export default connect( mapStateToProps, mapDispatchToProps )( pickAList ) 