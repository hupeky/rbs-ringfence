import React, {Component} from 'react'

import {connect} from 'react-redux'
import * as siteActions from '../../../store/actions/siteActions'

import pageClasses from '../Page.css'

import ListButton from '../../../UI/listButton/listButton'
import ImageButton from '../../../UI/imageButton/imageButton'

import Carousel from '../../../Component/Carousel/Carousel'
import CarouselItem from '../../../UI/carouselItem/carouselItem'

import PageButton from '../../../UI/pageButton/pageButton'
import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../hoc/CentreContent/CentreContent'
import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'

import Timer from '../../timer/timer'

class pickAList extends Component {
    state = {
        selected: this.props.questionData[this.props.label].questionItems.map( ( item ) => {return false} ),
        funny: false,
        disabled: true,
        totalCount: this.props.questionData[this.props.label].questionItems.reduce( ( acc, cur ) => {return acc = acc + 1}, 0 ),
        count: 0,
    }

    selectListHandler ( index, items, bonusQuestion, label, bonusLabel, singleSelect ) {
        let updatedFunny = this.state.funny;
        let currentSelected = [...this.state.selected]
        let count = 0

        if ( items[index].funny === true ) {
            updatedFunny = !updatedFunny;
            this.setState( {
                funny: updatedFunny,
            } )
        }

        if ( singleSelect ) {
            currentSelected = currentSelected.map( ( item, index ) => false )
        }


        if ( this.props.buttonType === 'carousel' ) {
            currentSelected = currentSelected.map( ( item, index ) => false )
            currentSelected[index] = true;
            this.setState( {
                selected: currentSelected,
                disabled: false
            } )

        } else {
            currentSelected[index] = !currentSelected[index]

            currentSelected.forEach( item => {
                if ( item ) {
                    count++
                }
            } )


            this.setState( {
                selected: currentSelected,
                disabled: false,
                count: count,
            } )
        }


        if ( bonusQuestion ) {
            let isCorrect = currentSelected.every( ( item, index ) => item === this.props.questionData[label].correctAnswer[index] )
            if ( isCorrect ) {
                this.props.setBonusAnswerHandler( currentSelected, label, bonusLabel )
                this.submitListHandler( currentSelected, label, true )
            }

        }
    }

    submitListHandler = ( answer, label, correct ) => {
        this.props.setAnswerHandler( answer, label, this.state.funny )
        console.log ('this.props.item',this.props.item)

        if (this.props.item && correct) {
            console.log ('false',correct, 'this.props.item', this.props.item )
            this.props.setItemHandler( label )
        }
        this.props.sliderRef.slickNext()
    }

    buildPageButtonHandler ( question, label, buttonLabel, sliderRef, bonusQuestion, singleSelect,buttonType ) {
        let button
        if ( question ) {
            button = <PageButton singleSelect={singleSelect} count={this.state.count} totalCount={this.state.totalCount} disabled={buttonType === 'carousel' ? false : this.state.disabled} click={() => this.submitListHandler( this.state.selected, label, true )} buttonLabel={buttonLabel} sliderRef={sliderRef} nextPage={true} label={label} />
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
                    <h3 className={pageClasses.subTitle}>{preRight} </h3>
                    <p>{answer}</p>
                </React.Fragment>
            )
            case false: return (
                <React.Fragment>
                    <h3 className={pageClasses.subTitle}>{preWrong} </h3>
                    <p>{answer}</p>
                </React.Fragment>
            )
            case 'funny': return (
                <React.Fragment>
                    <p>{preFunny}{answer}</p>
                </React.Fragment>
            )
            default: return <div><h3 className={pageClasses.subTitle}>&nbsp;</h3><p>{answer}</p></div>
        }
    }

    bonusTimedoutHandler = ( didTimeOut, label, bonusLabel ) => {
        if ( didTimeOut ) {
            this.props.setBonusAnswerHandler( this.state.selected, label, bonusLabel )
            this.submitListHandler( this.state.selected, label, false)
        }
    }

    render () {
        let current = false;
        let {title, question, label, bonusLabel, questionItems, buttonLabel, sliderRef, preWrong, preRight, preFunny, answer, bonusQuestion, buttonType, singleSelect} = {...this.props};

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
                            button = <ListButton click={() => this.selectListHandler( index, questionItems, bonusQuestion, label, bonusLabel, singleSelect )} key={index} active={this.state.selected[index]} label={item.label} />
                            :
                            button = <ListButton key={index} answer={true} active={this.props.questionData[label].correctAnswer[index]} label={item.label} />
                    case 'image':
                        return question ?
                            button = <ImageButton click={() => this.selectListHandler( index, questionItems, bonusQuestion, label, bonusLabel, singleSelect )} columns={buttonColumns} image={item.image} key={index} active={this.state.selected[index]} label={item.label} />
                            :
                            button = <ImageButton columns={buttonColumns} image={item.image} key={index} active={this.props.questionData[label].correctAnswer[index]} label={item.label} >sadasd</ImageButton>
                    case 'carousel':
                        return question ?
                            <CarouselItem key={index} alt='' image={item.image} label={item.label} />
                            :
                            <CarouselItem key={index} alt='' answer={true} active={this.props.questionData[label].correctAnswer[index]} image={item.image} />
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
                    <CentreContent force={this.props.currentIndex} centre={this.props.centreContent}>
                        {this.props.title ? <h2>{this.props.title}</h2> : null}
                        {this.props.subTitle ? <h3>{this.props.subTitle}</h3> : null}
                        {this.props.question ? <h3 className={pageClasses.question}>{this.props.question}</h3> : null}
                        {this.props.subText ? <p className={pageClasses.subText}>{this.props.subText}</p> : null}
                        {this.props.paragraph ? <p>{this.props.paragraph}</p> : null}
                        {!question ? this.buildAnswerText( preRight, preWrong, preFunny, answer, isCorrect ) : null}

                        {buttonType === 'carousel' ? <Carousel onUpdate={( index ) => this.selectListHandler( index, questionItems, bonusQuestion, label, bonusLabel )} > {buildPageButtonsHandler()} </Carousel> : buildPageButtonsHandler()}
                    </CentreContent>
                </ContentHolder>
                <ButtonHolder>
                    {this.buildPageButtonHandler( question, label, buttonLabel, sliderRef, bonusQuestion, singleSelect,buttonType )}
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
        setItemHandler: ( label) => dispatch( {type: siteActions.SET_ITEM, label: label} ),
        setAnswerHandler: ( answer, label, funny ) => dispatch( {type: siteActions.SET_ANSWER, answer: answer, label: label, funny: funny} ),
        setBonusAnswerHandler: ( answer, label, bonusLabel ) => dispatch( {type: siteActions.SET_BONUS_ANSWER, answer: answer, label: label, bonusLabel: bonusLabel} ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( pickAList ) 