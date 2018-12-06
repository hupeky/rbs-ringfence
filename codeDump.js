///////////////// pageholder component
import React, {Component} from 'react'
import Slider from 'react-slick'

import * as siteActions from '../../store/actions/siteActions'
import {connect} from 'react-redux'

import "slick-carousel/slick/slick.gcss"
import "slick-carousel/slick/slick-theme.gcss"

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
                this.props.setNumberOfPages( numOfPages )
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
            accessibility: true,
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


////////////// centrecontent component
import React, {Component} from 'react'

import classes from './CentreContent.css'

class centreContent extends Component {
    state = {
        marginTop: 0
    }

    didOnce = false;

    centreContentHandler () {
        if ( this.props.centre !== false ) {
            let windowHeight = window.innerHeight;
            let contentHeight = this.contentWrapper.clientHeight
            let difference = ( ( windowHeight - 50 ) - contentHeight ) / 2

            if ( difference > 0 ) {
                this.setState( {marginTop: difference} )
            }
        } else {
            this.setState( {marginTop: '80px'} )
        }

    }

    componentDidMount () {
        this.centreContentHandler()
        window.addEventListener( 'resize', () => this.centreContentHandler() )

    }

    componentDidUpdate ( prevProps ) {
        if ( ( prevProps.force !== this.props.force ) && ( this.didOnce === false ) ) {
            this.centreContentHandler()
            this.didOnce = true
        }
    }
    render () {
        return (
            <section className={classes.CentreContent} style={{marginTop: this.state.marginTop}} ref={contentWrapper => this.contentWrapper = contentWrapper}>
                {this.props.children}
            </section>
        )
    }
}
export default centreContent

///////// site data handlers
import * as siteActions from '../actions/siteActions'

const initialState = {
    numOfPages: 10,
    fade: false,
    pageType: null,
    currentIndex: 0,
    questionData: {},
    resize: 0,
    windowHeight: 0,
    bonusData: {},
    itemsData: {
        whatRingFence: {
            questionLabel: 'whatRingFence',
            itemLabel: 'suit',
            selected: 'suit3',
            visible: false,
        }
    },
    isBonus: false,
    nickname: '',
}




const siteReducer = ( state = initialState, action ) => {
    let updatedQuestionData = null
    let updatedBonusData = null
    let updatedItemsData = null
    let correctAnswer = null
    let isCorrect = null
    switch ( action.type ) {
        case siteActions.SET_ITEM:
            updatedItemsData = {...state.itemsData}

            updatedItemsData[action.label] = {...state.itemsData[action.label]}
            updatedItemsData[action.label].visible = true

            return {
                ...state,
                itemsData: updatedItemsData
            }
        case siteActions.SET_BONUS_SELECTED:
        updatedBonusData = {...state.bonusData}
        updatedBonusData[action.label].selected = action.item

            return {
                ...state,
                bonusData: updatedBonusData
            }
        case siteActions.SET_ITEMS_DATA:
            updatedItemsData = {...state.itemsData}
            updatedItemsData[action.itemData.questionLabel] = action.itemData

            return {
                ...state,
                itemsData: updatedItemsData
            }

        case siteActions.SET_BONUS_DATA:
            updatedBonusData = {...state.bonusData}
            updatedBonusData[action.bonusData.bonusLabel] = action.bonusData
            return {
                ...state,
                bonusData: updatedBonusData
            }

        case siteActions.SET_IS_BONUS:
            return {

                ...state,
                isBonus: action.isBonus
            }
        case siteActions.SET_NICKNAME:
            return {
                ...state,
                nickname: action.nickname
            }
        case siteActions.SET_NUM_PAGES:
            return {
                ...state,
                numOfPages: action.numOfPages
            }
        case siteActions.SET_PAGE_TYPE:
            return {
                ...state,
                pageType: action.pageType
            }
        case siteActions.SET_CURRENT_INDEX:
            return {
                ...state,
                currentIndex: action.currentIndex
            }
        case siteActions.SET_QUESTION_DATA:
            updatedQuestionData = {...state.questionData}
            updatedQuestionData[action.questionData.label] = action.questionData
            return {
                ...state,
                questionData: updatedQuestionData
            }
        case siteActions.SET_BONUS_ANSWER:
            const bonusAnswer = action.answer
            updatedBonusData = {...state.bonusData}
            correctAnswer = state.questionData[action.label].correctAnswer

            isCorrect = bonusAnswer.every( ( item, index ) => item === correctAnswer[index] )   // check if every nswer is the same as correct and answer  
            updatedBonusData[action.bonusLabel].bonusCorrect = isCorrect

            return {
                ...state,
                bonusData: updatedBonusData
            }

        case siteActions.SET_ANSWER:
            const answer = action.answer
            correctAnswer = state.questionData[action.label].correctAnswer

            isCorrect = answer.every( ( item, index ) => item === correctAnswer[index] )   // check if every nswer is the same as correct and answer  
            if ( action.funny ) {
                isCorrect = 'funny'  // if funny in correct was given. change correct to funny. this will output a different response.
            }

            updatedQuestionData = {...state.questionData}
            updatedQuestionData[action.label].answer = action.answer
            updatedQuestionData[action.label].isCorrect = isCorrect
            updatedQuestionData[action.label].funny = action.funny
            return {
                ...state,
                questionData: updatedQuestionData
            }
        case siteActions.TRIGGER_RESIZE:
            return {
                ...state,
                resize: state.resize + 1,
                windowHeight: action.windowHeight

            }
        default:
            return state
    }
}

export default siteReducer


///////////////// carousel
import React, {Component} from 'react'
import Slider from 'react-slick'

import PrevArrow from '../../UI/prevArrow/prevArrow'
import NextArrow from '../../UI/nextArrow/nextArrow'

import "slick-carousel/slick/slick.gcss"
import "slick-carousel/slick/slick-theme.gcss"

class Carousel extends Component {
    state = {
        current: 0
    }

    render () {
        this.settings = {
            infinite: false,
            draggable: true,
            dots: true,
            swipe: true,
            speed: 400,
            nextArrow: <NextArrow visible={true} />,
            prevArrow: <PrevArrow visible={true} />,
            afterChange: index => {

            },
            beforeChange: ( current, next ) => {
                this.props.onUpdate(next)
            }
        }
        return (
            <Slider {...this.settings}>
                {this.props.children}
            </Slider>
        )
    }
}

export default Carousel

/////////////////// bonus page component
import React from 'react'
import {connect} from 'react-redux'
//import pageClasses from '../Page.css'
import classes from './BonusItems.css'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../hoc/CentreContent/CentreContent'

import Timer from '../../../Component/timer/timer'
import BonusItem from '../../../UI/bonusItem/bonusItem'

import LockIcon from '../../../assets/bonus/lock/lock'



const bonusItems = ( props ) => {
    const {bonusLabel, locked, unlocked} = {...props}

    let current = false;
    let bonusItemsList = [null]
    let bonusCorrect = null

    if ( (props.index === props.currentIndex || props.index === props.currentIndex-1)  ) { // if current is true
        current = true;
        bonusItemsList = Object.keys( props.bonusData ).map( ( item, index ) => {
            if ( props.bonusData[item].bonusCorrect === null ) {
                return <div key={index} className={classes.bonusItem}><LockIcon /></div>
            } else {
                let currentBonus = props.bonusData[item].bonusLabel === bonusLabel

                bonusCorrect = props.bonusData[item].bonusCorrect
                let BonusIcon = props.bonusData[item].icon

                return <div key={index} className={classes.bonusItem}>
                    <BonusItem selected={props.bonusData[item].selected} bonusCorrect={props.bonusData[item].bonusCorrect} icon={BonusIcon} label={item} correct={bonusCorrect} current={currentBonus} />
                </div>
            }
        } )
    } else { // build default lock list
        bonusItemsList = Object.keys( props.bonusData ).map( ( item, index ) => {return <div key={index} className={classes.bonusItem}><LockIcon /></div>} )
    }



    const onTimeOutHndler = () => {
        props.sliderRef.slickNext( 2 )
    }
    return (

        <React.Fragment>
            {current ? <Timer time={3500} notVisible={true} onTimeOut={onTimeOutHndler} /> : null}
            <ContentHolder>
                <CentreContent force={props.currentIndex} centre={props.centreContent}>
                    <div className={classes.bonusHolder}>
                        {props.bonusData[bonusLabel].bonusCorrect ?
                            <React.Fragment>
                                <h3 className={classes.subTitle} >{unlocked}</h3>
                            </React.Fragment>
                            :
                            <h3 className={classes.subTitle} >{locked}</h3>
                        }
                        {bonusItemsList}
                    </div>
                </CentreContent>
            </ContentHolder>
        </React.Fragment>

    )
}

const mapStateToProps = state => { // map redux state to class props
    return {
        currentIndex: state.currentIndex,
        bonusData: state.bonusData
    }
}

export default connect( mapStateToProps )( bonusItems ) 

///////////////////////

Tinder drag component
import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as siteActions from '../../../store/actions/siteActions'

import classes from './Drag.css'

import PageButton from '../../../UI/pageButton/pageButton'
import DragButton from '../../../UI/dragButton/dragButton'
import DragFeedback from '../../../UI/dragFeedback/dragFeedback'

import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'

import {TweenLite} from 'gsap'


class Info extends Component {
    state = {
        answer: [],
        isCorrect: null,
        collectedItems: {
            inside: [],
            outside: [],
        },
        pos: 0,
        maxPos: this.props.questionItems.reduce( ( acc, cur ) => {return acc = acc + 1}, -1 ),
        dragging: false,
        items: null,
        feedback: null,
        continue: false
    }

    currentDragRef = null

    mouseStats = {
        previousX: 0, previousY: 0,
        frameDeltaX: 0, frameDeltaY: 0,
        totalDeltaX: 0, totalDeltaY: 0,
        startX: 0, startY: 0,
        startLeft: 0, startTop: 0,
    }

    componentDidMount () {
        document.addEventListener( 'mousedown', this.mouseDown )
        document.addEventListener( 'mouseup', this.mouseUp )
        document.addEventListener( 'mousemove', this.mouseMove )

        document.addEventListener( 'touchstart', this.mouseDown )
        document.addEventListener( 'touchend', this.mouseUp )
        document.addEventListener( 'touchmove', this.mouseMove )
    }

    componentWillUnmount () {
        document.removeEventListener( 'mousedown', this.mouseDown )
        document.removeEventListener( 'mouseup', this.mouseUp )
        document.removeEventListener( 'mousemove', this.mouseMove )

        document.removeEventListener( 'touchstart', this.mouseDown )
        document.removeEventListener( 'touchend', this.mouseUp )
        document.removeEventListener( 'touchmove', this.mouseMove )
    }

    getClientXY = ( event ) => {
        let clientX, clientY = 0;
        switch ( event.type ) {
            case 'mousedown':
            case 'mousemove':
                clientX = event.clientX
                clientY = event.clientY
                return {X: clientX, Y: clientY}
            case 'touchstart':
            case 'touchmove':
                clientX = event.touches[0].clientX
                clientY = event.touches[0].clientY

                return {X: clientX, Y: clientY}
            default: break
        }
    }

    mouseUp = () => {
        if ( this.state.dragging ) {
            this.onObjectReleaseHandler()
            this.setState( {dragging: false} )
        }

    }

    onObjectReleaseHandler = () => {

        switch ( true ) {
            case ( this.mouseStats.totalDeltaY < -100 ):
                TweenLite.to( this.currentDragRef, 0.3, {top: '110%', onComplete: this.setNewButton} )
                this.checkCorrectHandler( 'outside', this.props.questionItems[this.state.pos] )

                break
            case ( this.mouseStats.totalDeltaY > 100 ):

                this.checkCorrectHandler( 'inside', this.props.questionItems[this.state.pos] )
                TweenLite.to( this.currentDragRef, 0.3, {top: '-20%', onComplete: this.setNewButton} )
                break
            default:

                TweenLite.to( this.currentDragRef, 0.3, {top: '45%'} )
                this.setState( {isCorrect: null} )
                break
        }
    }

    checkCorrectHandler = ( given, item ) => {

        let updatedAnswer = [...this.state.answer]
        let isCorrect = null;
        given === item.value ? isCorrect = true : isCorrect = false;
        updatedAnswer.push( isCorrect )
        let updatedCollectedItems = {...this.state.collectedItems}
        updatedCollectedItems.inside = [...this.state.collectedItems.inside]
        updatedCollectedItems.outside = [...this.state.collectedItems.outside]

        item.group.forEach( groupItem => {
            updatedCollectedItems[item.value].push( groupItem )
        } )
        this.setState( {
            answer: updatedAnswer,
            collectedItems: updatedCollectedItems,
            feedback: true,
            isCorrect: isCorrect,
        } )
    }

    setNewButton = () => {
        let canContinue = false
        if ( this.state.pos === this.state.maxPos ) {
            canContinue = true
            // this.props.sliderRef.slickNext()
        }
        this.setState( {
            pos: this.state.pos + 1,
            continue: canContinue } )
    }

    mouseDown = ( event ) => {
        let updatedMouseStats = {
            previousX: 0, previousY: 0,
            frameDeltaX: 0, frameDeltaY: 0,
            totalDeltaX: 0, totalDeltaY: 0,
            startX: 0, startY: 0,
            startLeft: this.mouseStats.startLeft,
            startTop: this.mouseStats.startTop,

        }
        this.mouseStats = {
            ...updatedMouseStats
        }

        const client = this.getClientXY( event )
        this.mouseStats.previousY = this.mouseStats.startY = client.Y
    }


    mouseMove = ( event ) => {
        const client = this.getClientXY( event )

        this.mouseStats.frameDeltaY = this.mouseStats.previousY - client.Y
        this.mouseStats.totalDeltaY = this.mouseStats.startY - client.Y
        this.mouseStats.previousY = client.Y
        if ( this.state.dragging ) {
            this.onObjectDraggingHandler()
        }

    }

    onObjectDraggingHandler = () => {

        let newTop = this.mouseStats.startTop - this.mouseStats.totalDeltaY
        this.currentDragRef.style.top = `${newTop}px`;

    }

    setRefHandler = ( ref ) => {
        this.currentDragRef = ref
        this.mouseStats.startLeft = ref.offsetLeft
        this.mouseStats.startTop = ref.offsetTop
    }

    onMouseDownHandler () {

        this.setState( {
            dragging: true,
            isCorrect: null
        } )
    }

    onPageClickHandler = (label) => {
        this.props.setAnswerHandler( this.state.answer, label)
    }


    buildDragButtonHandler () {
        let dragButtonsList = null;
        this.props.questionItems.forEach( ( item, index ) => {
            if ( index === this.state.pos ) {
                dragButtonsList = (
                    <DragButton key={index} release={this.onObjectReleaseHandler} mousedown={() => this.onMouseDownHandler()} setRef={( ref ) => this.setRefHandler( ref )} label={item.label}>
                        {item.group.map( ( groupItem, i ) => {
                            return <p key={i} className={classes.dragLabel} >{groupItem}</p>
                        } )}
                    </DragButton>
                )

            }
        } )

        return dragButtonsList;
    }

    buildCollectedItemsHandler ( areaLabel ) {
        let collectedItems = this.state.collectedItems[areaLabel].map( ( item, index ) => {
            return <div key={index} className={[classes.collectedItem, classes.fadeIn].join( " " )}>{item}</div>
        } )
        return collectedItems;
    }

    render () {
        let {buttonLabel, label, sliderRef} = this.props

        return (
            <React.Fragment>

                <div className={classes.dragHolder}>
                    <div className={classes.upper}>
                        <div className={classes.bg} />
                        <div className={[classes.label, classes.upperLabel].join( " " )}>
                            <p className={classes.label}>Inside</p>
                        </div>
                        <div className={classes.collectedItemsHolder}>
                            {this.buildCollectedItemsHandler( 'inside' )}

                        </div>

                    </div>

                    <div className={classes.lower}>
                        <div className={[classes.label, classes.lowerLabel].join( " " )}>
                            <p className={classes.label}>Outside</p>
                        </div>
                        <div className={classes.collectedItemsHolder}>
                            {this.buildCollectedItemsHandler( 'outside' )}
                        </div>

                    </div>
                    {
                        this.state.continue ? (
                            <ButtonHolder>
                                <PageButton buttonLabel={buttonLabel} click={() => this.onPageClickHandler(label)} sliderRef={sliderRef} nextPage={true} label={label} />
                            </ButtonHolder>
                        )
                            :
                            null
                    }

                    {this.buildDragButtonHandler()}
                    <div className={classes.feedbackInside}>
                    </div>
                    {this.state.answer.length === 0 ? null : <DragFeedback isCorrect={this.state.isCorrect} />}

                </div>


            </React.Fragment>
        )
    }
}

const mapStateToProps = state => { // map redux state to class props
    return {
        windowHeight: state.windowHeight,
        bonusData: state.bonusData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAnswerHandler: ( answer, label, funny ) => dispatch( {type: siteActions.SET_ANSWER, answer: answer, label: label, funny: funny} ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( Info ) 

//////////////// info page component
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
        let current = false
        let bonusCorrect = false
        let {buttonLabel, label, bonusLabel, sliderRef, locked, unlocked} = this.props
        if ( bonusLabel ) {
            bonusCorrect = this.props.bonusData[bonusLabel].bonusCorrect
        }
        if ( ( this.props.index === this.props.currentIndex || this.props.index === this.props.currentIndex - 1 ) ) { // if current is true
            current = true;
        }
        return (
            <React.Fragment>
                {this.props.fullScreenImage ?
                    <React.Fragment>
                        <div style={{background: `url(${this.props.fullScreenImage})`, backgroundSize: 'cover', backgroundPosition: 'center center'}} className={classes.fullScreenImage} />
                        {current ? <Character myStyle={{position: 'absolute', bottom: `${( this.props.windowHeight * this.props.imageHeight ) - 80}px`}} /> : null}
                    </React.Fragment>
                    :
                    null}
                {this.props.bottomImage ?
                    <React.Fragment>
                        <img style={{width:'100%', height: `${( this.props.windowHeight * 1 ) * this.props.imageHeight}px`}} className={classes.bottomImage} alt="" src={this.props.bottomImage} />
                        {current ? <Character myStyle={{position: 'absolute', bottom: `${( this.props.windowHeight * this.props.imageHeight ) - 100}px`}} /> : null}
                    </React.Fragment>
                    :
                    null}
                <ContentHolder>
                    <CentreContent force={this.props.currentIndex} centre={this.props.centreContent}>
                        {this.props.title ? <h2>{this.props.title}</h2> : null}
                        {this.props.subTitle ? <h3>{this.props.subTitle}</h3> : null}
                        {this.props.question ? <h3 className={classes.question}>{this.props.question}</h3> : null}
                        {this.props.subText ? <p className={classes.subText}>{this.props.subText}</p> : null}
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
        bonusData: state.bonusData
    }
}


export default connect( mapStateToProps )( Info ) 

////////////// mission ciomplete div(age="
import React from 'react'
import {connect} from 'react-redux'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../hoc/CentreContent/CentreContent'
import Timer from '../../../Component/timer/timer'

import MissionBar from '../../../UI/missionBar/missionBar'

const missionComplete = ( props ) => {
    const {percent} = {...props}

    let current = false;

    if ( props.index === props.currentIndex ) {
        current = true
    }

    const onTimeOutHndler = () => {
        props.sliderRef.slickNext()
    }
    return (
        <React.Fragment>
            {current ? <Timer time={2500} notVisible={true} onTimeOut={onTimeOutHndler} /> : null}
            <ContentHolder>
                <CentreContent force={props.currentIndex} centre={props.centreContent}>
                    <MissionBar current={current} percent={percent}/>
                </CentreContent>
            </ContentHolder>
        </React.Fragment>

    )
}

const mapStateToProps = state => { // map redux state to class props
    return {
        currentIndex: state.currentIndex,
    }
}

export default connect( mapStateToProps )( missionComplete )")


///////////// form page
import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as siteActions from '../../../store/actions/siteActions'

import pageClasses from '../Page.css'
import classes from './Name.css'

import axios from '../../../hoc/axios'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../hoc/CentreContent/CentreContent'

import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'
import PageButton from '../../../UI/pageButton/pageButton'

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.gcss'

class name extends Component {
    state = {
        disabled: true,
        value: '',
        dropDown: {
            value: '',
            label: ''
        },
    }

    dropData = [
        {value: '', label: 'Select'},
        {value: 'CommunicationsMarketing', label: 'Communications & Marketing'},
        {value: 'CorporateGovernanceRegulatoryAffairs', label: 'Corporate Governance & Regulatory Affairs'},
        {value: 'HumanResources', label: 'Human Resources'},
        {value: 'InternalAudit', label: 'Internal Audit'},
        {value: 'Finance', label: 'Finance'},
        {value: 'Legal', label: 'Legal'},
        {value: 'NatWestMarkets', label: 'NatWest Markets'},
        {value: 'PersonalBusinessBanking', label: 'Personal & Business Banking'},
        {value: 'RiskConductRestructuring', label: 'Risk, Conduct & Restructuring'},
        {value: 'Services', label: 'Services'},
        {value: 'UlsterBank', label: 'Ulster Bank'},
        {value: 'WilliamsGlyn', label: 'Williams & Glyn'}
    ]



    nameChangeHandler = ( event ) => {
        this.setState( {value: event.target.value} )

        if ( this.state.dropDown.value.length > 0 && event.target.value.length > 0 ) {
            this.setState( {disabled: false} )
        } else {
            this.setState( {disabled: true} )
        }
    }

    areaChangeHandler ( data ) {

        this.setState( {dropDown: data} )
        if ( this.state.value.length > 0 && data.value.length > 0 ) {
            this.setState( {disabled: false} )
        } else {
            this.setState( {disabled: true} )
        }
    }

    submitNameHandler = ( answer, label ) => {
        this.props.setNameHandler( this.state.value )
        /*         const keys = this.dropData.map((item, index) => { // build keys for lookup table in firebase
                    return item.value;
                })
        
                axios.post('/keys.json', keys)
                .then(response => console.log (response))
                .catch(error => console.log (error)) */

                let area = {value: this.state.dropDown.value}

                axios.post('/users.json', area)
                .then(response => {return response})
                .catch(error => {return error}) 


    }





    render () {
        let {buttonLabel, sliderRef} = {...this.props}
        return (
            <React.Fragment>
                <ContentHolder>
                    <CentreContent force={this.props.currentIndex} centre={this.props.centreContent}>

                        <h4 >Which area do you work in?</h4>
                        <Dropdown options={this.dropData} onChange={( data ) => this.areaChangeHandler( data )} value={this.state.dropDown.label} placeholder="Select an option" />

                        {this.props.subTitle ? <h4 className={classes.question}>{this.props.subTitle}</h4> : null}
                        <input tabIndex="-1" autoComplete="off" className={pageClasses.input} type="text" placeholder={'Enter your nickname'} value={this.state.value} onChange={this.nameChangeHandler} name="nickname" />

                    </CentreContent>
                </ContentHolder>
                <ButtonHolder>
                    <PageButton disabled={this.state.disabled} buttonLabel={buttonLabel} click={() => this.submitNameHandler()} sliderRef={sliderRef} nextPage={true} />
                </ButtonHolder>

            </React.Fragment >
        )
    }
}

const mapStateToProps = state => { // map redux state to class props
    return {
        currentIndex: state.currentIndex,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setNameHandler: ( nickname ) => dispatch( {type: siteActions.SET_NICKNAME, nickname: nickname} ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( name ) 


//////////////// pick a list component
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

        if (this.props.item && correct) {
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
        let {question, label, bonusLabel, questionItems, buttonLabel, sliderRef, preWrong, preRight, preFunny, answer, bonusQuestion, buttonType, singleSelect} = {...this.props};

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
            if ( buttonCount > 9 ) {
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

//////////////// share character
import React, {Component} from 'react'
import convertPNG from 'save-svg-as-png'

import 'innersvg-polyfill'
import classes from './Share.css'
import canvg from 'canvg-fixed'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../hoc/CentreContent/CentreContent'
import Character from '../../../assets/character/character'

import PageButton from '../../../UI/pageButton/pageButton'
import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'

import {connect} from 'react-redux'

class Share extends Component {
    state = {
        characterURI: false,
        current: false,
    }

    getUriHandler = () => {
        convertPNG.svgAsPngUri( document.getElementById( "character" ), {}, ( uri ) => {
            this.setState( {characterURI: uri} )
        } );
    }

    downloadHandler = () => {

        let character = document.getElementById( "character" )

        // let background = document.querySelectorAll( "#background" )

        // for ( var i = 0; i < background.length; i++ ) {
        //     background[i].style.opacity = 1
        // }

        canvg( document.getElementById( "canvas" ), `<svg version="1.1" id="character" x="0px" y="0px" viewBox="0 0 300 284.1" width="900" height="852"><rect x="-50" y="-50" width="1000" height="1000" style="fill:#3c4983;" />${character.innerHTML} </svg>` )
        let canvas = document.getElementById( "canvas" )


        if ( canvas.msToBlob ) { //for IE

            var blob = canvas.msToBlob();
            window.navigator.msSaveBlob( blob, 'character.png' );
        } else {
            /*   let img = document.createElement( "img" );
              img.src = canvas.toDataURL( "image/png" );
              img.download = "character.png";
  
              var a = document.createElement( 'a' );
              a.href = canvas.toDataURL( "image/png" )
              a.download = "character.png";
              document.body.appendChild( a );
              a.click();
              document.body.removeChild( a ); */
            convertPNG.saveSvgAsPng( document.getElementById( "character" ), "test.png",{scale: 3, backgroundColor: '#3c4983'} );

        }
    }

    render () {
        let {buttonLabel} = this.props
        return (
            <React.Fragment>
                <ContentHolder>
                    <canvas style={{display: 'none'}} id="canvas"></canvas>
                    <CentreContent centre={this.props.centreContent}>
                        {this.props.title ? <h2>{this.props.title}</h2> : null}
                        {this.props.subTitle ? <h3>{this.props.subTitle}</h3> : null}
                        {this.props.question ? <h3 className={classes.question}>{this.props.question}</h3> : null}
                        {this.props.subText ? <p className={classes.subText}>{this.props.subText}</p> : null}
                        {this.props.paragraph ? <p>{this.props.paragraph}</p> : null}
                        <Character />

                    </CentreContent>
                </ContentHolder>
                <ButtonHolder>
                    <PageButton buttonLabel={buttonLabel} click={this.downloadHandler} nextPage={false} />
                </ButtonHolder>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => { // map redux state to class props
    return {
        currentIndex: state.currentIndex,
        windowHeight: state.windowHeight,
        bonusData: state.bonusData
    }
}


export default connect( mapStateToProps )( Share ) 


////////// yes no handler
import React, {Component} from 'react'

import {connect} from 'react-redux'
import * as siteActions from '../../../store/actions/siteActions'

import pageClasses from '../Page.css'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../hoc/CentreContent/CentreContent'

import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'
import PageButton from '../../../UI/pageButton/pageButton'
import YesNoButton from '../../../UI/yesNoButton/yesNoButton'

import Timer from '../../timer/timer'

class yesNoQuestion extends Component {
    state = {
        selected: this.props.questionData[this.props.label].questionItems.map( ( item ) => {return false} ),

    }

    buildQuestionHandler ( title, question, subText ) {
        return (
            <React.Fragment>
                <h3 className={pageClasses.question} >{question}</h3>
                <p className={pageClasses.subText} >{subText}</p>
            </React.Fragment>
        )
    }

    buildAnswerHandler ( isCorrect, preRight, preWrong, answer ) {
        return (
            <React.Fragment>
                <h3>{isCorrect ? preRight : preWrong}</h3>
                <p>{answer}</p>
            </React.Fragment>
        )
    }

    selectYesNoHandler = ( answer, label, sliderRef, index, bonusLabel ) => {
        let currentSelected = this.state.selected.map( item => false )
        currentSelected[index] = !currentSelected[index]
        this.setState( {selected: currentSelected} )

        let isCorrect = this.props.questionData[label].questionItems[index].value === this.props.questionData[label].correctAnswer[0]

        this.props.setAnswerHandler( answer, label )
        if ( bonusLabel ) {
            this.props.setBonusAnswerHandler( answer, label, bonusLabel )
            if (this.props.item && isCorrect) {
                this.props.setItemHandler( label )
            }
        } else {
            if (this.props.item) {
                this.props.setItemHandler( label )
            }
        }
        sliderRef.slickNext()

    }

    buildYesNoNuttonsHandler = ( question, label, sliderRef, bonusLabel ) => {
        return this.props.questionData[label].questionItems.map( ( item, index ) => {
            return question ?
                <YesNoButton key={index} label={item.label} active={this.state.selected[index]} click={() => this.selectYesNoHandler( [item.value], label, sliderRef, index, bonusLabel )} />
                :
                <YesNoButton key={index} answer={true} label={item.label} active={this.props.questionData[label].questionItems[index].value} />
        } )
    }
    bonusTimedoutHandler = ( didTimeOut, label, bonusLabel, sliderRef ) => {
        if ( didTimeOut ) {
            this.props.setBonusAnswerHandler( [false], label, bonusLabel )
            this.props.setAnswerHandler( [false], label )
            sliderRef.slickNext()
        }

    }

    render () {
        let current = false;
        let {title, question, label, preWrong, preRight, answer, sliderRef, buttonLabel, bonusLabel, bonusQuestion, subText} = {...this.props};

        let isCorrect = null;
        isCorrect = this.props.questionData[label].isCorrect

        if ( this.props.index === this.props.currentIndex ) {
            current = true
        }

        return (
            <React.Fragment>
                {( bonusQuestion && current ) ? <Timer time={this.props.bonusData[bonusLabel].bonusTime} start={current} onTimeOut={( didTimeOut ) => this.bonusTimedoutHandler( didTimeOut, label, bonusLabel, sliderRef )} /> : null}
                <ContentHolder>
                    <CentreContent centre={this.props.centreContent}>
                        {question ?
                            this.buildQuestionHandler( title, question, subText )
                            :
                            this.buildAnswerHandler( isCorrect, preRight, preWrong, answer )
                        }
                        {this.buildYesNoNuttonsHandler( question, label, sliderRef, bonusLabel )}
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
        setItemHandler: ( label ) => dispatch( {type: siteActions.SET_ITEM, label: label} ),
        setAnswerHandler: ( answer, label ) => dispatch( {type: siteActions.SET_ANSWER, answer: answer, label: label} ),
        setBonusAnswerHandler: ( answer, label, bonusLabel ) => dispatch( {type: siteActions.SET_BONUS_ANSWER, answer: answer, label: label, bonusLabel: bonusLabel} ),


    }
}

export default connect( mapStateToProps, mapDispatchToProps )( yesNoQuestion ) 

////////// background component
import React, {Component} from 'react';
import classes from './background.css'

import {connect} from 'react-redux'

import stars from '../../assets/background/stars.svg'
import normal from '../../assets/background/normal.svg'
import bonus from '../../assets/background/bonus.svg'


class Background extends Component {
    state = {

    }
    transitionStep = 0

    calculateTransitionStep () {
        //console.log ('window.clientWidth', window.innerWidth,'this.svgRef.clientWidth', this.svgRef.clientWidth, 'this.props.numOfPages', this.props.numOfPages)
        this.transitionStep = ( (this.svgRef.clientWidth - 400) - window.innerWidth ) / this.props.numOfPages
        // console.log (this.transitionStep)
    }


    componentDidMount () {

        this.calculateTransitionStep()

    }

    componentDidUpdate () {

        //console.log ('this.svgRef.width.', this.svgRef.clientWidth)
    }

    render () {
        if ( this.svgRef ) {
            this.calculateTransitionStep()
        }

        let xPositionBG = this.transitionStep * this.props.currentIndex
        return (

            <div className={classes.screenClip} >
                <img ref={svg => this.svgRef = svg} style={{transform: `translateX(${-xPositionBG}px)`}} className={[classes.background, classes.normal].join(" ")} src={normal} alt="" />
                <img style={{transform: `translateX(${-xPositionBG}px)`, opacity: this.props.isBonus ? 1 : 0}} className={[classes.background, classes.bonus].join(" ")} src={bonus} alt="" />
                <img style={{transform: `translateX(${-xPositionBG}px)`}} className={[classes.background, classes.stars].join(" ")}src={stars} alt="" />
            </div>
        )
    }
}

const mapStateToProps = state => { // map redux state to class props
    return {
        isBonus: state.isBonus,
        resize: state.resize,
        currentIndex: state.currentIndex,
        numOfPages: state.numOfPages
    }
}

export default connect( mapStateToProps )( Background ) 

/////////////// bonus item compnent

import React, {Component} from 'react'

// import classes from './bonusItem.css'

class bonusItem extends Component {
    MyComponent = <div></div>
    shouldComponentUpdate ( nextProps ) {
        if ( this.props.bonusCorrect === null ) {
            return false
        } else {
            return true
        }

    }
    componentDidMount () {
        let icon = document.getElementById( this.props.label )
        let redBar = document.querySelector( `#${this.props.label} #redBar` )
        let selectedItem = document.querySelector( `#${this.props.label} #${this.props.selected}` )
        selectedItem.style.display = 'block'
        if ( this.props.current ) {
            if ( icon ) {
                icon.style.opacity = 1
            }
        }
        if ( !this.props.current ) {
            if ( icon ) {
                icon.style.opacity = 0.5
            }
        }
        if ( this.props.correct ) {
            if ( redBar ) {
                redBar.style.display = 'block'
                redBar.style.opacity = 0
            }
        }
        if ( !this.props.correct ) {
            if ( redBar ) {
                redBar.style.display = 'block'
                redBar.style.opacity = 1
            }
        }

    }

    render () {



        let MyComponent = this.props.icon
        return (
            <MyComponent />
        )
    }

}

export default bonusItem 

/////// drag button

import React, {Component} from 'react'
import classes from './dragButton.css'
class DragButton extends Component {
    componentDidMount () {
        this.props.setRef(this.ref)
    }
    render () {
        return <div ref={(ref) => {this.ref = ref}} onTouchStart={this.props.mousedown} onMouseDown={this.props.mousedown} className={classes.dragger}>{this.props.children}</div>
    }
}

export default DragButton

////////////// page data 

import React, {Component} from 'react'

import * as planets from './../../assets/planets/planets'
import * as carousels from './../../assets/carousel/carousel'
import * as banks from './../../assets/banks/banks'

import * as bonusIcons from './../../assets/bonus/icons'

import {connect} from 'react-redux'
import planetStandBlue from '../../assets/planets/planetStandBlue.png'
import planetStandPurple from '../../assets/planets/planetStandPurple.png'
import finalImage from '../../assets/background/finalScreen.png'

import PrintName from './../../UI/printName/printName'

import swipeUpDown from '../../assets/imgs/swipeUpDown.png'


class pageData extends Component {
    static pages = [
        {
            type: 'Info',
            centreContent: false,
            subTitle: 'Hey there… can you help?',
            paragraph: 'I’m Ringo, guardian of the ring-fence. I’m travelling to planet Robos but I’ve lost all my belongings on the way. Can you help me find them and complete my mission?',
            buttonLabel: 'Get Started',
            imageHeight: 0.4,
            bottomImage: planetStandBlue,
        },
        {
            type: 'Name',
            subTitle: 'Almost forgot, what should I call you?',
            buttonLabel: 'Continue'
        },
        {
            type: 'Info',
            centreContent: false,
            subTitle: <span> Glad you’re willing to help <PrintName />, ready to start the mission?</span>,
            subText: 'Select start to begin',
            buttonLabel: 'Start',
            imageHeight: 0.4,
            bottomImage: planetStandBlue,
        },
        {
            type: 'MissionComplete',
            percent: '14%'
        },


        //////// Question 1 //////////////
        {
            type: 'PickAListQuestion',
            question: 'What is ring-fencing intended to do?',
            subText: 'Click all that you think apply:',
            label: 'whatRingFence',
            item: 'suitGroup',
            availableItems: ['suit1', 'suit2', 'suit3', 'suit4', 'suit5'],
            questionItems: [
                {label: 'Separate everyday banking services from investment banking services'}, // , funny: true        // if you want to have a funny answer also
                {label: 'Support the UK Government\'s response to the financial crisis'},
                {label: 'It\'s intended to help strengthen the UK financial system'},
                {label: 'It\'s intended to help protect the UK economy'},
                {label: 'It\'s intended to help reduce the risk to one part of the bank from failure in another'},
            ],
            buttonType: 'list', // image
            buttonLabel: 'Continue',
            correctAnswer: [true, true, true, true, true],

        },
        {
            type: 'PickAListQuestion',
            label: 'whatRingFence',
            preWrong: 'Not quite right!',
            isVisible: false,
            current: false,
            selected: 'suit1',
            preRight: 'Correct!',
            answer: 'They all apply',
            buttonLabel: 'Continue',
        },
        {
            type: 'Info',
            label: 'whatRingFence',
            centreContent: true,
            subTitle: 'More info',
            paragraph: 'Ring-fencing legislation means that we must make changes to the way our group is structured and how we operate when working with and providing services to customers. The basic rules are that retail banking services are inside the ring-fence and investment banking services are outside the ring-fence. Some activities, notably banking for larger companies, may be on either side.',
            buttonLabel: 'Continue',
        },
        {
            type: 'Info',
            label: 'whatRingFence',
            centreContent: false,
            subTitle: 'Brilliant, you\'ve found my suit',
            paragraph: 'Gorgeous colour!!',
            buttonLabel: 'Next Question',
            imageHeight: 0.4,
            bottomImage: planetStandBlue,
        },
        //////// Question 2 //////////////
        {
            type: 'PickAListQuestion',
            question: 'When does ring-fencing come into effect?',
            subText: 'Select the date you think is correct, then confirm:',
            singleSelect: true,
            item: 'hairGroup',
            availableItems: ['hair1', 'hair2', 'hair3', 'hair4', 'hair5'],
            label: 'ringDate',
            questionItems: [

                {label: '24th December 2018'},
                {label: '1st January 2019'},
                {label: '31st August 2021'},
                {label: '5th March 2023'},
                {label: '7th September 2024'}, // , funny: true        // if you want to have a funny answer also

            ],
            buttonType: 'list', // image
            buttonLabel: 'Continue',
            correctAnswer: [false, true, false, false, false]
        },
        {
            type: 'PickAListQuestion',
            label: 'ringDate',
            preWrong: 'Not quite right!',
            preRight: 'Correct!',
            answer: '1st January 2019',
            buttonLabel: 'Continue',
        },
        {
            type: 'Info',
            label: 'ringDate',
            centreContent: false,
            subTitle: 'I love my new hair',
            paragraph: 'I totally rock this look!',
            buttonLabel: 'Continue',
            imageHeight: 0.4,
            bottomImage: planetStandBlue,
        },
        {
            type: 'MissionComplete',
            percent: '30%'
        },
        //////// Question 3 //////////////
        {
            type: 'PickAListQuestion',
            question: 'How many licensed banks will be inside the ring-fence once it\'s in place?',
            subText: 'Click the number of planets you think the number is:',
            label: 'howManyBanks',
            questionItems: [
                {label: '', image: planets.planet1}, // , funny: true if you want to have a funny answer also
                {label: '', image: planets.planet2},
                {label: '', image: planets.planet3},
                {label: '', image: planets.planet4},
                {label: '', image: planets.planet5},
            ],
            buttonType: 'image', // image
            buttonLabel: 'Confirm?',
            correctAnswer: [true, true, true, true, true],
        },
        {
            type: 'PickAListQuestion',
            label: 'howManyBanks',
            preWrong: 'Not quite right!',
            preRight: 'Correct!',
            answer: 'There will be 5 licensed banks within the ring-fence, with the most employees sitting within NatWest Bank Plc',
            buttonLabel: 'Continue',
        },

        // bonus 1 selectAll5 ////////////////////
        {
            type: 'Info',
            bonusLabel: 'bonus1',
            centreContent: false,
            buttonLabel: 'Go',
            subTitle: 'Bonus round',
            paragraph: <span>This is exciting, you can help me unlock one of my treasured items, let's go.<br />We have 15 seconds.</span>,
            imageHeight: 0.4,
            bottomImage: planetStandPurple,
        },
        {
            bonusQuestion: true,
            centreContent: true,
            icon: bonusIcons.bonus1SVG,
            bonusTime: 15000,
            bonusLabel: 'bonus1',
            question: 'Can you list all 5 banks INSIDE the ring-fence?',
            type: 'PickAListQuestion',
            label: 'selectAll5',
            item: 'headwearGroup',
            availableItems: ['headwear1', 'headwear2', 'headwear3', 'headwear4', 'headwear5'],
            questionItems: [
                {label: 'The Royal Bank of Scotland plc', image: banks.rbs},
                {label: 'Adam & Company', image: banks.adamCompany}, // , funny: true if you want to have a funny answer also
                {label: 'Child & Company', image: banks.childCo},
                {label: 'Ulster Bank Ireland DAC', image: banks.ulster},
                {label: 'National Westminster Bank Plc', image: banks.natwest},


                {label: 'Isle of Man Bank', image: banks.green},
                {label: 'Coutts and Co', image: banks.couttsDependancies},
                {label: 'Holts', image: banks.holts},
                {label: 'Lombard', image: banks.lombard},
                {label: 'Ulster Bank Limited', image: banks.ulster},
            ],
            buttonType: 'image', // image
            buttonLabel: 'Continue?',
            correctAnswer: [true, false, false, true, true, false, true, false, false, true],
        },
        {
            type: 'PickAListQuestion',
            bonusLabel: 'bonus1',
            label: 'selectAll5',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes, that\'s right!',
            answer: 'These are the 5 banks inside the ring-fence',
            buttonLabel: 'More Info',
        },
        {
            type: 'Info',
            label: 'selectAll5',
            bonusLabel: 'bonus1',
            subTitle: 'More info',
            paragraph: <span>The banks inside the ring-fence are: The Royal Bank of Scotland plc, National Westminster Bank Plc, Ulster Bank Ireland DAC, Ulster Bank Limited, Coutts and Company<br /><br /><b>Did you know: </b>Adam and Company are not a licensed bank but are in fact a brand? You can find more information on this on the intranet. </span>,
            buttonLabel: 'Continue',
        },
        {
            type: 'BonusItems',
            bonusLabel: 'bonus1',
            locked: 'Sorry, you didn\'t unlock my headwear',
            unlocked: 'Hey, you\'ve unlocked my headwear',
            buttonLabel: 'Continue',
        },
        {
            type: 'Info',
            bonusLabel: 'bonus1',
            centreContent: false,
            buttonLabel: 'Next Question',
            unlocked: 'Oh wow, this looks great on me!',
            locked: 'Ah, never mind, let\'s try for the next thing',
            imageHeight: 0.4,
            bottomImage: planetStandPurple,
        },

        // Question 4 ///////////// drag drop 
        {
            type: 'Info',
            centreContent: true,
            subTitle: 'Which of the following list of brands sit within our ring-fenced bank and which sit outside?',
            paragraph: 'If you think a brand sits inside the ring-fence, drag up on your screen, and if you think a brand sits outside the ring-fence, drag down',
            buttonLabel: 'Continue',
            image: swipeUpDown,
        },
        {
            type: 'Drag',
            label: 'dragDrop',
            question: 'Which brands are inside the ring-fence? (Swipe up or down)',
            questionItems: [
                {
                    label: 'Group 1', image: planets.planet1, value: 'inside', caption: 'This is inside', 
                    group: [
                        'RBS plc',
                        'NatWest Bank Plc',
                        'Ulster Bank'
                    ]
                },
                {
                    label: 'Group 4', image: planets.planet4, value: 'outside', caption: 'This is outside',
                    group: [
                        'NatWest Markets',
                        'RBS International',
                    ]
                },

                {
                    label: 'Group 3', image: planets.planet3, value: 'inside', caption: 'This is inside',
                    group: [
                        'Adam & Company',
                        'Holt\'s',
                        'Drummonds'
                    ]
                },
                {
                    label: 'Group 2', image: planets.planet2, value: 'inside', caption: 'This is inside',
                    group: [
                        'Coutts',
                        'Lombard',
                        'Child & Co'
                    ]
                },
                {
                    label: 'Group 5', image: planets.planet5, value: 'outside', caption: 'This is outside',
                    group: [
                        'Coutts Dependencies ',
                        ' Isle of Man Bank'
                    ]
                },

            ],
            buttonType: 'image', // image
            buttonLabel: 'Confirm?',
            correctAnswer: [true, true, true, true, true],
        },
        {
            type: 'DragAnswer',
            label: 'dragDrop',
            subTitle: 'Nice try',
            preWrong: 'Not quite right',
            preRight: 'Well done!',
            paragraph: 'These are the brands within the ring-fence: The Royal Bank of Scotland, National Westminster Bank, Ulster Bank, Coutts, Lombard, Child & Co, Adam & Company, Holt\'s, Drummonds',
            buttonLabel: 'Continue',
        },
        {
            type: 'MissionComplete',
            percent: '60%'
        },

        // Question 5 /////////////////////////////////////

        {
            type: 'PickAListQuestion',
            question: 'What changes will our personal customers notice to their banking services once ring-fencing comes into force?',
            subText: 'Click all that you think apply:',
            item: 'eyeGroup',
            availableItems: ['eye1', 'eye2', 'eye3', 'eye4', 'eye5'],
            label: 'customersNotice',
            questionItems: [
                {label: 'New sort code'}, // , funny: true if you want to have a funny answer also
                {label: 'New bank logo on their statements and cheque books'},
                {label: 'Different colleagues dealing with their requests'},
                {label: 'No material changes'}
            ],
            buttonType: 'list', // image
            buttonLabel: 'Am I right?',
            correctAnswer: [false, false, false, true]
        },
        {
            type: 'PickAListQuestion',
            label: 'customersNotice',
            preWrong: 'Not quite right!',
            preRight: 'Correct!',
            buttonLabel: 'More info',
        },
        {
            type: 'Info',
            label: 'customersNotice',
            subTitle: 'More info',
            paragraph: 'There\'ll be no change to how personal bank account holders bank with us or the level of service we provide them. We\'ll still be the same bank they know and are used to dealing with.',
            buttonLabel: 'Continue',
        },
        {
            type: 'Info',
            label: 'customersNotice',
            centreContent: false,
            subTitle: 'Oh nice, you\'ve found my goggles',
            paragraph: 'Hey, I\'m looking good!!',
            buttonLabel: 'Continue',
            imageHeight: 0.4,
            bottomImage: planetStandBlue,
        },
        // Bonus 2 ///////////////////////////////////////////////
        {
            type: 'Info',
            bonusLabel: 'bonus2',
            centreContent: false,
            buttonLabel: 'Go',
            subTitle: 'Bonus round',
            paragraph: 'Aha, you can help me unlock another one of my treasured items, let\'s go',
            imageHeight: 0.4,
            bottomImage: planetStandPurple,
        },
        {
            bonusQuestion: true,
            bonusLabel: 'bonus2',
            item: 'tailGroup',
            availableItems: ['tail1', 'tail2', 'tail3', 'tail4', 'tail5'],
            icon: bonusIcons.bonus2SVG,
            bonusTime: 10000,
            type: 'YesNoQuestion',
            label: 'canCollaborate',
            question: 'Can people in Personal & Business Banking (PBB) collaborate with colleagues in NatWest Markets (NWM)?',
            correctAnswer: [true],
            subText: 'Select yes or no to continue',
            questionItems: [
                {label: 'Yes', value: true},
                {label: 'No', value: false},
            ],
        },
        {
            bonusLabel: 'bonus2',
            type: 'YesNoQuestion',
            label: 'canCollaborate',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes, that\'s right!',
            buttonLabel: 'More info',
        },
        {
            type: 'Info',
            label: 'canCollaborate',
            bonusLabel: 'bonus2',
            subTitle: 'More info',
            paragraph: 'Yes, they can, but probably won’t need to do so very often. An example of collaboration is when a PBB employee may need to speak with a colleague in NWM if the PBB customer wants to carry out a Spot FX trade - this is possible as we’re still one RBS, one team.',
            buttonLabel: 'Continue',
        },
        {
            type: 'BonusItems',
            bonusLabel: 'bonus2',
            buttonLabel: 'Continue',
            locked: 'Sorry, you didn\'t unlock my tail',
            unlocked: 'Great, you\'ve unlocked my tail',
        },
        {
            type: 'Info',
            bonusLabel: 'bonus2',
            centreContent: false,
            buttonLabel: 'Next Question',
            unlocked: 'Oh yeah, I look awesome',
            locked: 'Ah, never mind, let\'s try the next thing',
            imageHeight: 0.4,
            bottomImage: planetStandPurple,
        },

        // Questoion 6 ////////////////////////////////////////////////////////                                         

        {
            type: 'PickAListQuestion',
            question: 'How are our ring-fencing plans different to our competitors? ',
            subText: 'Click arrows or swipe carousel to select',
            item: 'shoeGroup',
            availableItems: ['shoe1', 'shoe2', 'shoe3', 'shoe4', 'shoe5'],
            label: 'spotDifference',
            questionItems: [
                {label: 'No difference', image: carousels.carousel1}, // , funny: true if you want to have a funny answer also
                {label: 'Some difference', image: carousels.carousel2},
                {label: 'It will all be different ', image: carousels.carousel3},
            ],
            buttonType: 'carousel', // image
            buttonLabel: 'Confirm',
            correctAnswer: [false, true, false]
        },
        {
            type: 'PickAListQuestion',
            label: 'spotDifference',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes, that\'s right!',
            answer: 'There will be some difference because of our business model. The way in which individual banks are going about ring-fencing depends upon the type of business carried out by those banks, including the business mix between retail and other banking activities, and their current structure. Most won\'t see any changes, and for those who do, we have kept them updated along the way.',
            buttonLabel: 'Continue',
        },
        {
            type: 'Info',
            label: 'spotDifference',
            itemLabel: 'shoes',
            centreContent: false,
            subTitle: 'Oooh, you\'ve found my shoes',
            paragraph: 'I\'ll be taking these out for spin tonight!!',
            buttonLabel: 'Next Question',
            imageHeight: 0.4,
            bottomImage: planetStandBlue,
        },

        // Questoion 7 ////////////////////////////////////////////////////////

        {
            type: 'YesNoQuestion',
            label: 'workDifferent',
            question: 'Does ring-fencing mean that we\'ll need to work differently?',
            item: 'shoeGroup',
            availableItems: ['shoe1', 'shoe2', 'shoe3', 'shoe4', 'shoe5'],
            correctAnswer: [true],
            subText: 'Select yes or no to continue',
            questionItems: [
                {label: 'Yes', value: true},
                {label: 'No', value: false},
            ],
        },
        {
            type: 'Info',
            label: 'workDifferent',
            centreContent: true,
            subTitle: 'Oooops, trick question. The answer is yes and no.',
            paragraph: 'We\'re all still part of RBS Group and there will be no changes to our ambition. However, there will be some administrative changes needed to meet ring-fencing requirements. For example, we\'ll change our internal operations, systems and processes to comply with ring-fencing rules.',
            buttonLabel: 'Continue',
        },
        {
            type: 'MissionComplete',
            percent: '70%'
        },

        // Question 8 /////////////////////////////////////

        {
            type: 'PickAListQuestion',
            question: 'Does ring-fencing mean that contracts of employment will change in any way? ',
            subText: 'Click all that you think apply:',
            item: 'patternGroup',
            availableItems: ['pattern1', 'pattern2', 'pattern3', 'pattern4', 'pattern5'],
            label: 'contractsChange',
            questionItems: [
                {label: 'Terms and conditions'}, // , funny: true if you want to have a funny answer also
                {label: 'RBS brand on payslips'},
                {label: 'Employer legal entity'},
                {label: 'Pay and benefits'},
                {label: 'No changes'},
            ],
            buttonType: 'list', // image
            buttonLabel: 'Confirm',
            correctAnswer: [false, false, true, false, false]
        },
        {
            type: 'PickAListQuestion',
            label: 'contractsChange',
            preWrong: 'Not quite right!',
            preRight: 'Correct!',
            buttonLabel: 'More info',
        },
        {
            type: 'Info',
            label: 'contractsChange',
            subTitle: 'More info',
            paragraph: 'The only changes will be to what\'s called the employer legal entity (i.e. the entity that holds the employee contract). Although for some colleagues, their employer legal entity has not changed at all. If your employer legal entity has changed, you will have received a message in January confirming what this means for you.  In the new structure, the NatWest Bank Plc legal entity will be the main operating company within the ring-fenced group. Conditions of employment, including pay and benefits stay the same. And you\'ll still see the RBS brand on payslips and other communications.',
            buttonLabel: 'Continue',
        },
        {
            type: 'Info',
            label: 'contractsChange',
            centreContent: false,
            subTitle: 'Amazing! how cool do I look now?',
            paragraph: 'I feel so fab!!',
            buttonLabel: 'Next Question',
            imageHeight: 0.4,
            bottomImage: planetStandBlue,
        },

        // Question 9 ////////////////////////////////////////////////////////

        {
            type: 'YesNoQuestion',
            label: 'canColleagues',
            question: 'Can colleagues who work within the ring-fenced bank provide services to the non-ring-fenced bank?',
            correctAnswer: [true],
            subText: 'Select yes or no to continue',
            questionItems: [
                {label: 'Yes', value: true},
                {label: 'No', value: false},
            ],
        },
        {
            type: 'YesNoQuestion',
            label: 'canColleagues',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes, that\'s right!',
            buttonLabel: 'More info',
        },
        {
            type: 'Info',
            centreContent: true,
            subTitle: 'More info',
            paragraph: 'The rules of ring-fencing say that, if you\'re in the ring-fence, it’s ok to provide services to colleagues on both sides of the ring-fence. But it’s a one-way thing – NatWest Markets (for example) can’t provide services to colleagues who are inside the ring-fenced bank. ',
            buttonLabel: 'Continue',
        },
        //////// Bonus 3 //////////////
        {
            type: 'Info',
            bonusLabel: 'bonus3',
            centreContent: false,
            buttonLabel: 'Go',
            subTitle: 'Bonus round',
            paragraph: 'You\'ve got a chance to unlock a lovely new gift for me, let\'s go',
            imageHeight: 0.4,
            bottomImage: planetStandPurple,
        },
        {
            type: 'PickAListQuestion',
            bonusQuestion: true,
            icon: bonusIcons.bonus3SVG,
            bonusTime: 10000,
            bonusLabel: 'bonus3',
            item: 'neckGroup',
            availableItems: ['neck1', 'neck2', 'neck3', 'neck4', 'neck5'],
            question: 'How will Risk work with colleagues inside and outside the ring-fence?',
            subText: 'Click all that you think apply:',
            label: 'riskWork',
            questionItems: [
                {label: 'Risk will just work inside the ring-fence'}, // , funny: true        // if you want to have a funny answer also
                {label: 'Risk will work across both areas'},
                {label: 'Risk will just work outside the ring fence'}
            ],
            buttonType: 'list', // image
            buttonLabel: 'Confirm',
            correctAnswer: [false, true, false]
        },
        {
            bonusLabel: 'bonus3',
            type: 'PickAListQuestion',
            label: 'riskWork',
            preWrong: 'Not quite right!',
            preRight: 'Correct!',
            buttonLabel: 'More info',
        },
        {
            type: 'Info',
            bonusLabel: 'bonus3',
            centreContent: true,
            subTitle: 'More info',
            paragraph: 'Risk has teams that work inside the ring-fence and outside the ring-fence, working collaboratively to provide advice and guidance across the ring-fence for a bank-wide, holistic view for businesses to make informed decisions',
            buttonLabel: 'Continue',
        },
        {
            type: 'BonusItems',
            bonusLabel: 'bonus3',
            locked: 'Sorry, you didn\'t unlock your special item',
            unlocked: 'Hey, you\'ve unlocked your special item',
            buttonLabel: 'Continue'
        },
        {
            type: 'Info',
            bonusLabel: 'bonus3',
            centreContent: false,
            buttonLabel: 'Next Question',
            unlocked: 'I love my new gift',
            locked: 'Ah, never mind, let\'s go for the next item.',
            imageHeight: 0.4,
            bottomImage: planetStandPurple,
        },
        {
            type: 'MissionComplete',
            percent: '80%'
        },
        // Questoion 10 ////////////////////////////////////////////////////////

        {
            type: 'YesNoQuestion',
            label: 'marketTraders',
            question: 'Can a NatWest Markets (NWM) trader or banker collaborate with colleagues in Commercial & Private Banking (CPB) to deliver a service to customers?',
            correctAnswer: [true],
            subText: 'Select yes or no to continue',
            questionItems: [
                {label: 'Yes', value: true},
                {label: 'No', value: false},
            ],
        },
        {
            type: 'YesNoQuestion',
            label: 'marketTraders',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes, that\'s right!',
            buttonLabel: 'More info',
        },
        {
            type: 'Info',
            label: 'marketTraders',
            centreContent: true,
            subTitle: 'More info',
            paragraph: 'NWM employees who work with customers needing products and services that sit inside the ring-fence will work with colleagues in CPB to help them access these . The same would apply if customers need products and services that are available both from inside and outside the ring-fence. For example, 1) a NWM trader can offer Derivatives or FX Options to a CPB customer after referral from a CPB Relationship Manager or, 2) a NWM banker can introduce a Banking or Insurance sector customer to CPB to support the customer\'s day to day payment needs.',
            buttonLabel: 'Continue',
        },

        // Question 11 /////////////////////////////////////

        {
            type: 'PickAListQuestion',
            question: 'How does ring-fencing affect Commercial & Private Banking (CPB) customers?',
            subText: 'Click all that you think apply:',
            label: 'affectCPB',
            questionItems: [
                {label: 'No changes'}, // , funny: true if you want to have a funny answer also
                {label: 'A change to the brand they will see on literature'},
                {label: 'Some changes dependant on the products and services they need'},
                {label: 'Everything will change'}
            ],
            buttonType: 'list', // image
            buttonLabel: 'Confirm',
            correctAnswer: [false, false, true, false]
        },
        {
            type: 'PickAListQuestion',
            label: 'affectCPB',
            preWrong: 'Not quite right!',
            preRight: 'Correct!',
            buttonLabel: 'More info',
        },
        {
            type: 'Info',
            label: 'affectCPB',
            subTitle: 'More info',
            paragraph: 'Some customers will receive certain products or services from NatWest Markets Plc (NWM), but their main relationship will stay with CPB. For example, Structured Deposits can be offered by NWM to a CPB customer after referral from a CPB Relationship Manager. Access to products may also change, for example,  a Relevant Financial Institution (RFI) customer in CPB who wants a credit card can only have a charge card with the balance repayable within 7 days.',
            buttonLabel: 'Continue',
        },
        // {
        //     type: 'Info',
        //     label: 'affectCPB',
        //     centreContent: false,
        //     subTitle: 'Congratulations, you\'ve landed in your new destination',
        //     paragraph: 'Hey, I love this new place !!',
        //     buttonLabel: 'Continue',
        //     imageHeight: 0.4,
        //     bottomImage: planetStandBlue,
        // },
        {
            type: 'MissionComplete',
            percent: '90%'
        },

        // Bonus 4 ///////////////////////////////////////////////
        {
            type: 'Info',
            bonusLabel: 'bonus4',
            centreContent: false,
            buttonLabel: 'Go',
            subTitle: 'Bonus round',
            paragraph: 'I\'ve lost my best buddy, help me find him!! You\'ve got eight seconds to answer.',
            imageHeight: 0.4,
            bottomImage: planetStandPurple,
        },
        {
            bonusQuestion: true,
            bonusLabel: 'bonus4',
            icon: bonusIcons.bonus4SVG,
            bonusTime: 8000,
            item: 'petGroup',
            availableItems: ['pet1', 'pet2', 'pet3', 'pet4', 'pet5'],
            type: 'YesNoQuestion',
            label: 'supportFunction',
            question: 'If you work within a support function, like HR, Finance or Legal, can you work across the ring-fence?',
            correctAnswer: [true],
            subText: 'Select yes or no to continue',
            questionItems: [
                {label: 'Yes', value: true},
                {label: 'No', value: false},
            ],
        },
        {
            type: 'YesNoQuestion',
            bonusLabel: 'bonus4',
            label: 'supportFunction',
            preWrong: 'Not quite right on that one',
            preRight: 'Yes, that\'s right!',
            buttonLabel: 'More info',
        },
        {
            bonusLabel: 'bonus4',
            type: 'Info',
            label: 'supportFunction',
            subTitle: 'More info',
            paragraph: 'Colleagues in Services and Function teams will provide some shared services to the whole bank, meaning that, even though employed by NatWest Bank Plc, they can work with colleagues on both sides of the ring-fence. There will be intra-group agreements in place to formally document these arrangements.',
            buttonLabel: 'Continue',
        },
        {
            type: 'BonusItems',
            bonusLabel: 'bonus4',
            locked: 'Sorry, you didn\'t find my best buddy',
            unlocked: 'Hey, you\'ve found my best buddy',
            buttonLabel: 'Continue'
        },
        {
            type: 'Info',
            bonusLabel: 'bonus4',
            centreContent: false,
            buttonLabel: 'Continue',
            unlocked: 'Nice, I got my best buddy back',
            locked: 'Oh no, I\'m sure we\'ll find my best buddy soon',
            imageHeight: 0.4,
            bottomImage: planetStandPurple,
        },
        {
            type: 'Info',
            centreContent: false,
            buttonLabel: 'Continue',
            subTitle: <span> Thank you <PrintName />, We are all one RBS – one team.</span>,
            imageHeight: 0.4,
            fullScreenImage: finalImage
        },
        {
            type: 'Share',
            centreContent: false,
            buttonLabel: 'Download character',
            imageHeight: 0.4,
            subTitle: 'Download your character',
            paragraph: 'Once you have downloaded your character, please refer to the \'Add Photo/Video\' instructions on Workplace and share your results.',
            bottomImage: planetStandPurple,
        },

    ]
    render () {
        return null
    }
}

const mapStateToProps = state => { // map redux state to class props
    return {
        nickname: state.nickname
    }
}

export default connect( mapStateToProps )( pageData )