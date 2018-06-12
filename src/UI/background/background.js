import React, {Component} from 'react';
import classes from './background.css'

import {connect} from 'react-redux'


class Background extends Component {
    state = {
        
    }
    transitionStep = 0

    calculateTransitionStep () {
        //console.log ('window.clientWidth', window.innerWidth,'this.svgRef.clientWidth', this.svgRef.clientWidth, 'this.props.numOfPages', this.props.numOfPages)
        this.transitionStep = (this.svgRef.clientWidth - window.innerWidth ) / this.props.numOfPages
       // console.log (this.transitionStep)
    }


    componentDidMount() {

        this.calculateTransitionStep()
        
    }

    componentDidUpdate() {

        //console.log ('this.svgRef.width.', this.svgRef.clientWidth)
    }

    render () {
        if (this.svgRef) {
            this.calculateTransitionStep()
        }

        let xPositionBG = this.transitionStep * this.props.currentIndex
        return (
            
            <div className={classes.screenClip} >
            <svg style={{transform:`translateX(${-xPositionBG}px)`}} className={classes.background} ref={svg => this.svgRef = svg} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 5000 1000" >
                <g className={classes.normal}>
                <rect className={classes.normalBG} x="-17" y="-0.7" width="5015" height="1000" />
                    <g id="backgroundText">
                        <text transform="matrix(1 0 0 1 428.3333 498.04)" className={[classes.st2 , classes.st3 ,  classes.st4].join(" ") }>500px</text>
                        <text transform="matrix(1 0 0 1 918.3333 498.04)" className={[classes.st2 , classes.st3 ,  classes.st4].join(" ") }>1000px</text>
                        <text transform="matrix(1 0 0 1 1440.3333 498.04)" className={[classes.st2 , classes.st3 ,  classes.st4].join(" ") }>1500px</text>
                        <text transform="matrix(1 0 0 1 1930.3333 498.04)" className={[classes.st2 , classes.st3 ,  classes.st4].join(" ") }>2000px</text>
                        <text transform="matrix(1 0 0 1 2469.6711 498.04)" className={[classes.st2 , classes.st3 ,  classes.st4].join(" ") }>2500px</text>
                        <text transform="matrix(1 0 0 1 2959.6711 498.04)" className={[classes.st2 , classes.st3 ,  classes.st4].join(" ") }>3000px</text>
                        <text transform="matrix(1 0 0 1 3481.6711 498.04)" className={[classes.st2 , classes.st3 ,  classes.st4].join(" ") }>3500px</text>
                        <text transform="matrix(1 0 0 1 3976.6465 498.04)" className={[classes.st2 , classes.st3 ,  classes.st4].join(" ") }>4000px</text>
                        <text transform="matrix(1 0 0 1 4501.0044 494.04)" className={[classes.st2 , classes.st3 ,  classes.st4].join(" ") }>4500px</text>
                    </g>
                </g>
                <g className={classes.bonus}>
                    <linearGradient id="bg_1_" gradientUnits="userSpaceOnUse" x1="2490.5" y1="968.3333" x2="2490.5" y2="-193.6512">
                        <stop offset={0} className={classes.bonusGradientTop} />
                        <stop offset={1     } className={classes.bonusGradientBottom}/>
                    </linearGradient>
                    <rect id="bg" x="-17" y="-0.7" className={classes.st6} width="5015" height="1000" />
                    <g id="text" className="st7">
                        <text transform="matrix(1 0 0 1 428.3333 498.04)" className={[classes.st8 , classes.st3 ,  classes.st4].join(" ") }>500px</text>
                        <text transform="matrix(1 0 0 1 918.3333 498.04)" className={[classes.st8 , classes.st3 ,  classes.st4].join(" ") }>1000px</text>
                        <text transform="matrix(1 0 0 1 1440.3333 498.04)" className={[classes.st8 , classes.st3 ,  classes.st4].join(" ") }>1500px</text>
                        <text transform="matrix(1 0 0 1 1930.3333 498.04)" className={[classes.st8 , classes.st3 ,  classes.st4].join(" ") }>2000px</text>
                        <text transform="matrix(1 0 0 1 2469.6711 498.04)" className={[classes.st8 , classes.st3 ,  classes.st4].join(" ") }>2500px</text>
                        <text transform="matrix(1 0 0 1 2959.6711 498.04)" className={[classes.st8 , classes.st3 ,  classes.st4].join(" ") }>3000px</text>
                        <text transform="matrix(1 0 0 1 3481.6711 498.04)" className={[classes.st8 , classes.st3 ,  classes.st4].join(" ") }>3500px</text>
                        <text transform="matrix(1 0 0 1 3976.6465 498.04)" className={[classes.st8 , classes.st3 ,  classes.st4].join(" ") }>4000px</text>
                        <text transform="matrix(1 0 0 1 4501.0044 494.04)" className={[classes.st8 , classes.st3 ,  classes.st4].join(" ") }>4500px</text>
                    </g>
                </g>
                <g id="Layer_2">
                </g>
            </svg>
            </div>
        )
    }
}

const mapStateToProps = state => { // map redux state to class props
    return {
        resize: state.resize,
        currentIndex: state.currentIndex,
        numOfPages: state.numOfPages
    }
}

export default connect( mapStateToProps )( Background ) 
