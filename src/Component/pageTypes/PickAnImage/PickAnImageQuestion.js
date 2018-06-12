import React, {Component} from 'react'
import classes from './PickAList.css'

import {connect} from 'react-redux'
import * as siteActions from '../../../store/actions/siteActions'

import pageClasses from '../Page.css'

import PageButton from '../../../UI/pageButton/pageButton'
import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'

class PickAnImageQuestion extends Component {
    state = {
        selected: this.props.questionItems.map( ( item ) => {return false} ),
        funny: false
    }

    selectListHandler ( index, items ) {
        let currentSelected = [...this.state.selected]
        currentSelected[index] = !currentSelected[index]
        this.setState( {
            selected: currentSelected,
        } )
    }

    submitListHandler = ( answer, label ) => {
        this.props.setAnswerHandler( answer, label )
        this.props.sliderRef.slickNext()
    }

    render () {
        let {title, question, label, questionItems, buttonLabel, sliderRef} = {...this.props};
        return (
            <React.Fragment>
                <ContentHolder>
                    <h2>{title}</h2>
                    <p className={pageClasses} >{question}</p>
                    <ul>
                        {this.props.questionData[label].questionItems.map( ( item, index ) => {
                            return <li key={index} className={this.state.selected[index] ? classes.selected : classes.notSelected} onClick={() => this.selectListHandler( index, questionItems )}>{item.label}</li>
                        } )
                        }
                    </ul>
                </ContentHolder>
                <ButtonHolder>
                    <PageButton click={() => this.submitListHandler(this.state.selected, label) } buttonLabel={buttonLabel} sliderRef={sliderRef} nextPage={true} label={label} />
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
        questionData: state.questionData, // access the aScene reducer slice from global state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAnswerHandler: ( answer, label, funny ) => dispatch( {type: siteActions.SET_ANSWER, answer: answer, label: label} ),

    }
}

export default connect( mapStateToProps, mapDispatchToProps )( PickAnImageQuestion ) 