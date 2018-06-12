import React, {Component} from 'react'

import {connect} from 'react-redux'

import PageButton from '../../../UI/pageButton/pageButton'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'

import ListButton from '../../../UI/listButton/listButton'
import ImageButton from '../../../UI/imageButton/imageButton'

class PickAListAnswer extends Component {
    render () {
        let {preWrong, preRight, preFunny, answer, label, buttonLabel, sliderRef} = {...this.props};
        let isCorrect = null;
        if ( this.props.index === this.props.currentIndex ) {
            isCorrect = this.props.questionData[label].isCorrect
        }

        const buildResultsText = () => {
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

        const buildPageButtonsHandler = () => {
            const buttonType = this.props.questionData[label].buttonType
            const buttonCount = Object.keys(this.props.questionData[label].questionItems).length

            let buttonColumns = 3
            if (buttonCount > 5) {
                buttonColumns = 3
            }
            if (buttonCount > 10) {
                buttonColumns = 4
            }

            let list = []
            this.props.questionData[label].questionItems.map( ( item, index ) => {
                switch ( buttonType ) {
                    case 'list':
                        list.push( <ListButton key={index} active={this.props.questionData[label].correctAnswer[index]} label={item.label} /> )
                        break
                    case 'image':
                        list.push( <ImageButton columns={buttonColumns} image={item.image} key={index} active={this.props.questionData[label].correctAnswer[index]} label={item.label} /> )
                        break
                    default:
                        list.push(<p>Sorry error creating buttons</p>)
                        break   
                }
     
            } )
            return list

        }


        return (
            <React.Fragment>
                <ContentHolder>
                    {buildResultsText()}
                    {buildPageButtonsHandler()}
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
        questionData: state.questionData
    }
}


export default connect( mapStateToProps )( PickAListAnswer ) 