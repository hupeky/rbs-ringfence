import React from 'react'

import classes from './bonus1.css'

const bonus1 = (props) => {

    return (
        <svg className={[classes.bonus1, props.current ? classes.current : classes.notCurrent, props.correct ? classes.correct : classes.notCorrect].join(" ")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 123 122" space="preserve">
            <g id="bonus1" transform="translate(-16 6)">
                <path id="Fill_1" data-name="Fill 1" className={classes.cls1} d="M41.288,38.665C36.674,73,24.07,99.652,13.138,98.185S-2.918,67.691,1.7,33.351,16.139-1.009,27.072.458,45.9,4.325,41.288,38.665" transform="translate(88.942 26.224)" />
                <path id="Fill_3" data-name="Fill 3" className={classes.cls2} d="M27.7,41.769c-2.964,22.058-11.334,39.138-18.7,38.15S-1.92,60.249,1.043,38.191,12.378-.947,19.74.041,30.667,19.711,27.7,41.769" transform="translate(94.922 25.482)" />
                <path id="Fill_5" data-name="Fill 5" className={classes.cls3} d="M0,1.392s22.109-8.081,34.655,14.7c0,0-29.564-14.284-34.655-14.7" transform="translate(89.022 83.558)" />
                <path id="Fill_7" data-name="Fill 7" className={classes.cls4} d="M41.521,59.252c5.019,34.282.241,63.368-10.674,64.964S7.015,99.315,1.995,65.033,1.754,1.665,12.669.068,36.5,24.969,41.521,59.252" transform="translate(28.693 0.089)" />
                <path id="Fill_9" data-name="Fill 9" className={classes.cls2} d="M27.843,37.975c3.224,22.021-.12,40.744-7.469,41.819S4.452,63.889,1.228,41.867,1.348,1.123,8.7.048,24.619,15.954,27.843,37.975" transform="translate(36.401 25.629)" />
                <path id="Fill_13" data-name="Fill 13" className={classes.cls5} d="M2.561.017A.9.9,0,0,0,1.513.823c-.69,5.624-6.088,32.406,8.836,35.069,0,0,17.411,5.326,21.031-29.064a.962.962,0,0,0-.716-1.068Z" transform="translate(99.972 26.041)" />
                <path id="Fill_15" data-name="Fill 15" className={classes.cls4} d="M2.873.018A.993.993,0,0,0,1.7.862c-.775,5.887-6.829,33.925,9.91,36.713,0,0,19.529,5.576,23.591-30.426a1.014,1.014,0,0,0-.8-1.118Z" transform="translate(97.43 20.474)" />
                <rect id="bg" className={classes.cls6} width="136" height="136" transform="translate(16 -6)" />
                <rect id="redBar" className={classes.redBar} width="10" height="200" transform="rotate(45 0 0) translate(90 -100)" />
            </g>
        </svg>
    )
}

export default bonus1
