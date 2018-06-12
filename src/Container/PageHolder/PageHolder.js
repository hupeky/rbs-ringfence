import React, {Component} from 'react'
import Slider from 'react-slick'

import * as siteActions from '../../store/actions/siteActions'
import {connect} from 'react-redux'

/* import "./slick.gcss"
import "./slick-theme.gcss" */

import "slick-carousel/slick/slick.gcss"
import "slick-carousel/slick/slick-theme.gcss"

import Page from '../../Component/pageTypes/Page'

import classes from './PageHolder.css'
import pageData from '../../Component/pageTypes/pageData'

import Background from '../../UI/background/background'

import Info from '../../Component/pageTypes/Info/Info'
import PickAListQuestion from '../../Component/pageTypes/PickAList/PickAListQuestion'

import YesNoQuestion from '../../Component/pageTypes/YesNoQuestion/YesNoQuestion'


function NextArrow ( props ) {
    const {className, style, onClick} = props;
    return (
        props.visible ? <div
            className={className}
            style={{...style, display: "block", right: '15px'}}
            onClick={onClick}
        /> : null
    )
}

function PrevArrow ( props ) {
    const {className, style, onClick} = props;
    return (
        props.visible ? <div
            className={className}
            style={{...style, display: "block", left: '10px'}}
            onClick={onClick}
        /> : null
    )
}

class PageHolder extends Component {
    state = {
        fade: pageData.pages[0].transitionFade,
        inTransition: null,
        currentIndex: 0,
        currentSlideType: pageData.pages[0].type,
        nextSlideResults: null,
        yesNoResponse: null,
        canContinue: []

    }

    continue = () => {
        this.slider.slickNext()
    }

    componentWillMount () {
        let numOfPages = 0
        pageData.pages.forEach( ( page, index ) => {
            numOfPages++
            if ( page.question ) {
                let questionData = {
                    label: page.label,
                    correctAnswer: page.correctAnswer,
                    answer: [],
                    isCorrect: null,
                    question: page.question,
                    questionItems: page.questionItems,
                    buttonType: page.buttonType
                }
                this.props.setQuestionDataHandler( questionData )
                this.props.setNumberOfPages (numOfPages)    
            }

        } )
    }

    render () {
        this.settings = {
            dots: false,
            infinite: true,
            fade: this.props.fade,
            draggable: true,
            accessibility: true,
            speed: 400,
            nextArrow: <NextArrow visible={false} />,
            prevArrow: <PrevArrow visible={false} />,
            afterChange: index => {
            },
            beforeChange: ( current, next ) => {
                this.props.setCurrentIndex( next )

            },
            appendDots: dots => (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        height: '50px',
                        borderRadius: "10px",
                        padding: "10px",
                        boxSizing: 'border-box'
                    }}
                >
                    <ul style={{margin: "0px"}}> {dots} </ul>
                </div>
            )
        }


        let Pages = pageData.pages.map( ( page, index ) => {
            switch ( page.type ) {
                case 'Info':
                    return (
                        <Info index={index} sliderRef={this.slider} {...page} />
                    )
                case 'YesNoQuestion':
                    return <YesNoQuestion {...page} sliderRef={this.slider} index={index} />
                case 'PickAListQuestion':
                    return <PickAListQuestion {...page} sliderRef={this.slider} label={page.label} index={index} />
                default: return <div>default</div>

            }
        }
        )

        return (
            <React.Fragment>
                <Background />
                <Slider ref={slider => ( this.slider = slider )} className={classes.Slider} {...this.settings}>
                    {Pages.map( ( page, index ) => {
                        return (
                            <Page
                                inTransition={index === this.state.inTransition ? true : false}
                                current={index === this.props.currentIndex ? true : false} key={index}>
                                {page}
                            </Page>
                        )
                    } )}
                </Slider >
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => { // map redux state to class props
    return {
        pageType: state.pageType,
        questionData: state.questionData,
        currentIndex: state.currentIndex,
        fade: state.fade,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setNumberOfPages: ( numOfPages ) => dispatch( {type: siteActions.SET_NUM_PAGES, numOfPages: numOfPages} ),
        setPageType: ( pageType ) => dispatch( {type: siteActions.SET_PAGE_TYPE, pageType: pageType} ),
        setCurrentIndex: ( currentIndex ) => dispatch( {type: siteActions.SET_CURRENT_INDEX, currentIndex: currentIndex} ),
        setQuestionDataHandler: ( questionData ) => dispatch( {type: siteActions.SET_QUESTION_DATA, questionData: questionData} ),
        setAnswerHandler: ( answer, label ) => dispatch( {type: siteActions.SET_ANSWER, answer: answer, label: label} ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( PageHolder ) 