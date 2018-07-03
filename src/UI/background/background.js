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
