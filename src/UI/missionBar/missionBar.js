import React from 'react'

import TimelineLite from 'gsap/src/uncompressed/TimelineLite.js'
import 'gsap/src/plugins/DrawSVGPlugin.js'

// import {Elastic} from 'gsap/src/uncompressed/easing/EasePack.js'

import classes from './missionBar.css'

const missionBar = ( props ) => {
    if ( props.current ) {
        let tl = new TimelineLite()

        tl.set( `#percent`, {drawSVG: "0% 0%"}, 0 )
        tl.to( `#percent`, 2, {drawSVG: `0% ${props.percent}`} )

    }
    return (
        <div className={classes.missionBarHolder}>
            <svg version="1.1" id="Layer_1" className={classes.missionBar} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="400px" height="300px" viewBox="0 0 400 300" >
                <circle id="base" className={classes.base} cx="200" cy="150" r="130" />
                <circle id="percent" className={classes.percent} cx="200" cy="150" r="130" />
            </svg>
            <p>Mission is {props.percent} complete</p>
        </div>
    )
}

export default missionBar