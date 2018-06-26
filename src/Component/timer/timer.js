import React, {Component} from 'react'

import classes from './timer.css'

class timer extends Component {
    state = {
        timeRemaining: this.props.time
    }
    clock
    componentDidMount () {
        
        const increment = 100

        this.clock = setInterval(() => {
            this.setState({timeRemaining:this.state.timeRemaining - increment}) 
            if (this.state.timeRemaining === 0) {
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
            this.props.notVisible ? null : <div className={classes.timer} >00:{(this.state.timeRemaining / 1000).toFixed(1)}</div>
        )
    }
}

export default timer
