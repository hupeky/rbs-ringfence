import React, {Component} from 'react'
import {connect} from 'react-redux'

import PageButton from '../../../UI/pageButton/pageButton'
import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../Component/CentreContent/CentreContent'
import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'

import YesNoButton from '../../../UI/yesNoButton/yesNoButton'

class yesNoAnswer extends Component {

    render () {
        let {preWrong, preRight, answer, label, buttonLabel} = {...this.props};


        let isCorrect = null;
        isCorrect = this.props.questionData[label].isCorrect

        return (
            <React.Fragment>
                <ContentHolder>
                    <CentreContent>
                        <p>{isCorrect ? preRight : preWrong} {answer}</p>
                        {this.props.questionData[label].questionItems.map( ( item, index ) => {
                            return <YesNoButton key={index} label={item.label} active={this.props.questionData[label].questionItems[index].value} />
                        } )
                        }
                    </CentreContent>
                </ContentHolder>

                <ButtonHolder>
                    <PageButton buttonLabel={buttonLabel} nextPage={true} sliderRef={this.props.sliderRef} label={label} />
                </ButtonHolder>

            </React.Fragment>
        )
    }

}

/* { // the formt of object being spread to pto   rops
    type: 'YesNoAnswer', 
    label: 'question1',
    preWrong: 'Not quite right on that one',
    preRight: 'Yes thats right!',
    answer: 'This is the answer, Another paragraph here',
    yesNoLabel: ['Yes', 'No']
}, */


const mapStateToProps = state => { // map redux state to class props
    return {
        questionData: state.questionData, // access the aScene reducer slice from global state
        currentIndex: state.currentIndex
    }
}

export default connect( mapStateToProps )( yesNoAnswer ) 