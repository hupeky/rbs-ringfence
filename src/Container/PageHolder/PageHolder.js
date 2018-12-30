import React, {Component} from 'react'
import Slider from 'react-slick'

import * as siteActions from '../../store/actions/siteActions'
import {connect} from 'react-redux'

import "../../assets/module_css/slick.gcss"
import "../../assets/module_css/slick-theme.gcss"

import Page from '../../Component/pageTypes/Page'

import classes from './PageHolder.css'
import pageData from '../../Component/pageTypes/pageData'

import Background from '../../UI/background/background'
import PrevArrow from '../../UI/prevArrow/prevArrow'
import NextArrow from '../../UI/nextArrow/nextArrow'

import Info from '../../Component/pageTypes/Info/Info'
import PickAListQuestion from '../../Component/pageTypes/PickAList/PickAListQuestion'
import MissionComplete from '../../Component/pageTypes/MissionComplete/MissionComplete'
import Name from '../../Component/pageTypes/Name/Name'
import YesNoQuestion from '../../Component/pageTypes/YesNoQuestion/YesNoQuestion'
import BonusItems from '../../Component/pageTypes/BonusItems/BonusItems'
import Share from '../../Component/pageTypes/Share/Share'
import Drag from '../../Component/pageTypes/Drag/Drag'
import DragAnswer from '../../Component/pageTypes/Drag/DragAnswer'

import backgroundHack from '../../assets/background/backgroundHack.jpg'

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
        let processedQuestionData = {}
        pageData.pages.forEach( ( page, index ) => {
            numOfPages++
            if ( page.question ) {
                let questionData = {
                    label: page.label,
                    questionNumber: page.questionNumber,
                    correctAnswer: page.correctAnswer,
                    answer: [],
                    isCorrect: null,
                    question: page.question,
                    questionItems: page.questionItems,
                    buttonType: page.buttonType
                }
                this.props.setQuestionDataHandler( questionData )
                this.props.setNumberOfPages( numOfPages )
                processedQuestionData[page.questionNumber] = {
                    correct: 0,
                    question: page.question,
                }

            }

            if ( page.bonusQuestion ) {
                let bonusData = {
                    bonusLabel: page.bonusLabel,
                    bonusTime: page.bonusTime,
                    bonusCorrect: null,
                    icon: page.icon,
                    selected: null
                }
                this.props.setBonusDataHandler( bonusData )
            }
            if ( page.item ) {
                let randomNumber = Math.floor( ( Math.random() * 5 ) )

                let itemData = {
                    selected: page.availableItems[randomNumber],
                    visible: false,
                    questionLabel: page.label,
                    itemLabel: page.item
                }
                if ( page.bonusLabel ) {

                    this.props.setBonusSelectedHandler( page.bonusLabel, page.availableItems[randomNumber] )
                }
                this.props.setItemsDataHandler( itemData )
            }

        } )
        console.log (processedQuestionData)

    }

    componentDidMount () {
        document.addEventListener( 'touchmove', function ( event ) {
            event = event.originalEvent || event;
            if ( event.scale !== 1 ) {
                event.preventDefault();
            }
        }, false );

        var lastTouchEnd = 0;
        document.addEventListener( 'touchend', function ( event ) {
            var now = ( new Date() ).getTime();
            if ( now - lastTouchEnd <= 300 ) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false );
        document.addEventListener( 'gesturestart', function ( e ) {
            e.preventDefault();
        } );
    }

    render () {
        this.settings = {
            dots: false,
            infinite: false,
            draggable: false,
            swipe: false,
            accessibility: false,
            speed: 400,
            nextArrow: <NextArrow visible={false} />,
            prevArrow: <PrevArrow visible={false} />,
            afterChange: index => {

            },
            beforeChange: ( current, next ) => {
                this.props.setIsBonusRoundHandler( pageData.pages[next].bonusLabel )
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
                case 'MissionComplete':
                    return <MissionComplete {...page} sliderRef={this.slider} index={index} />
                case 'Name':
                    return <Name {...page} sliderRef={this.slider} index={index} />
                case 'BonusItems':
                    return <BonusItems {...page} sliderRef={this.slider} index={index} />
                case 'Share':
                    return <Share {...page} sliderRef={this.slider} index={index} />
                case 'Drag':
                    return <Drag {...page} sliderRef={this.slider} index={index} />
                case 'DragAnswer':
                    return <DragAnswer {...page} sliderRef={this.slider} index={index} />
                default: return <div>default</div>

            }
        }
        )

        return (
            <React.Fragment>
                <img alt="" src={backgroundHack} className={classes.backgroundHack}></img>
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
        setBonusDataHandler: ( bonusData ) => dispatch( {type: siteActions.SET_BONUS_DATA, bonusData: bonusData} ),
        setBonusSelectedHandler: ( label, item ) => dispatch( {type: siteActions.SET_BONUS_SELECTED, label: label, item: item} ),
        setItemsDataHandler: ( itemData ) => dispatch( {type: siteActions.SET_ITEMS_DATA, itemData: itemData} ),
        setIsBonusRoundHandler: ( isBonus ) => dispatch( {type: siteActions.SET_IS_BONUS, isBonus: isBonus} ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( PageHolder ) 