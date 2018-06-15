import React, {Component} from 'react'

import classes from './timer.css'

class timer extends Component {
    state = {
        timePassed: 0 
    }
    clock
    componentDidMount () {
        
        const increment = 100


        this.clock = setInterval(() => {
            this.setState({timePassed:this.state.timePassed + increment}) 
            if (this.state.timePassed === this.props.time) {
                clearTimeout(this.clock);
                console.log ('time out from timer')
                this.props.onTimeOut(true)
            }
        }, increment);              
    }

    componentWillUnmount() {
        clearTimeout(this.clock);
    }
    render () {
        
        return (
            this.props.notVisible ? null : <div className={classes.timer} >{this.state.timePassed}I am a timer {this.props.time}</div>
        )
    }
}

export default timer
