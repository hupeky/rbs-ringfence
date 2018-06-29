import React, {Component} from 'react'
import {connect} from 'react-redux'

import classes from './Drag.css'

import PageButton from '../../../UI/pageButton/pageButton'
import DragButton from '../../../UI/dragButton/dragButton'

import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'


class Info extends Component {
    state = {
        pos: 0,
        maxPos: this.props.questionItems.reduce( ( acc, cur ) => {return acc = acc + 1}, -1 ),
        dragging: false,
        startTop: 0,
        startLeft: 0
    }

    mouseStats = {
        previousX: 0, previousY: 0,
        frameDeltaX: 0, frameDeltaY: 0,
        totalDeltaX: 0, totalDeltaY: 0,
        startX: 0, startY: 0,
    }

    componentDidMount () {
        document.addEventListener( 'mousedown', this.mouseDown )
        document.addEventListener( 'mouseup', this.mouseUp )
        document.addEventListener( 'mousemove', this.mouseDrag )

        document.addEventListener( 'touchstart', this.mouseDown )
        document.addEventListener( 'touchend', this.mouseUp )
        document.addEventListener( 'touchmove', this.mouseDrag )
    }

    componentWillUnmount () {
        document.removeEventListener( 'mousedown', this.mouseDown )
        document.removeEventListener( 'mouseup', this.mouseUp )
        document.removeEventListener( 'mousemove', this.mouseDrag )

        document.removeEventListener( 'touchstart', this.mouseDown )
        document.removeEventListener( 'touchend', this.mouseUp )
        document.removeEventListener( 'touchmove', this.mouseDrag ) 
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
        this.setState({dragging: false}) 
    }

    mouseDown = ( event ) => {
        this.mouseStats = {
            previousX: 0, previousY: 0,
            frameDeltaX: 0, frameDeltaY: 0,
            totalDeltaX: 0, totalDeltaY: 0,
            startX: 0, startY: 0,
            
        }
        const client = this.getClientXY( event )
        
        this.mouseStats.previousX = this.mouseStats.startX = client.X
        this.mouseStats.previousY = this.mouseStats.startY = client.Y
        console.log( this.mouseStats )
    }


    mouseDrag = ( event ) => {
        const client = this.getClientXY( event )

        this.mouseStats.frameDeltaX = this.mouseStats.previousX - client.X
        this.mouseStats.frameDeltaY = this.mouseStats.previousY - client.Y

        this.mouseStats.totalDeltaX = this.mouseStats.startX - client.X
        this.mouseStats.totalDeltaY = this.mouseStats.startY - client.Y

        console.log (this.mouseStats)
        this.mouseStats.previousX = client.X
        this.mouseStats.previousY = client.Y

        if ( this.state.dragging ) {
                this.onDraggingHandler()
        }

    }

    onDraggingHandler = () => {
        let newLeft = this.mouseStats.startLeft - this.mouseStats.totalDeltaX
        let newTop = this.mouseStats.startTop - this.mouseStats.totalDeltaY

        let updatedWindowSetup = {...this.state.windowSetup}
        updatedWindowSetup.top = newTop
        updatedWindowSetup.left = newLeft

        document.body.style.cursor = 'move'
    }

    onClickHandler = (ref) => {
        console.log ('left', ref.offsetLeft, 'top', ref.offsetTop)
        this.setState({dragging: true}) 
    }

    render () {
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
                    </div>

                        <DragButton myClick={ref => () => this.onClickHandler(ref)} />  

                    
                    <div className={classes.lower}>
                    </div>
                </div>

                <ButtonHolder>
                    <PageButton buttonLabel={buttonLabel} sliderRef={sliderRef} nextPage={true} label={label} />
                </ButtonHolder>
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


export default connect( mapStateToProps )( Info ) 