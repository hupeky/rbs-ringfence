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
                console.log( {X: clientX, Y: clientY} )
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
        let changePos = null
        switch ( true ) {
            case ( this.mouseStats.totalDeltaY < -100 ):
                changePos = TweenLite.to( this.currentDragRef, 0.3, {top: '110%', onComplete: this.setNewButton} )
                this.checkCorrectHandler( 'outside', this.props.questionItems[this.state.pos] )
                console.log( 'placed below' )
                break
            case ( this.mouseStats.totalDeltaY > 100 ):
                console.log( 'placed above' )
                this.checkCorrectHandler( 'inside', this.props.questionItems[this.state.pos] )
                changePos = TweenLite.to( this.currentDragRef, 0.3, {top: '-20%', onComplete: this.setNewButton} )
                break
            default:
                console.log( 'reset' )
                changePos = TweenLite.to( this.currentDragRef, 0.3, {top: '45%'} )
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
        console.log ('answer', this.state.answer)
        console.log ('correct answer', this.props.correctAnswer)
        console.log ('label',label)
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
        console.log( 'this.state.answer.length ', this.state.answer.length )
        let current = false
        let bonusCorrect = false
        let {buttonLabel, label, bonusLabel, sliderRef} = this.props
        if ( bonusLabel ) {
            bonusCorrect = this.props.bonusData[bonusLabel].bonusCorrect
            console.log( bonusCorrect )
        }
        if ( ( this.props.index === this.props.currentIndex || this.props.index === this.props.currentIndex - 1 ) ) { // if current is true
            current = true;
        }
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