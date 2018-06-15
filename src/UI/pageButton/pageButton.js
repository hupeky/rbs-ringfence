import React, {Component} from 'react'

import classes from './pageButton.css'

class PageButton extends Component {
    state = {
        active: false
    }
    clickHandler = ( fade ) => {
        if ( !this.props.disabled ) {
            this.setState( {active: !this.state.active} )
            if ( this.props.nextPage ) {
                this.props.sliderRef.slickNext()
            }
            if ( this.props.click ) {
                this.props.click()
            }
        }

    }
    render () {
        const buildClassHandler = () => {
            if ( !this.props.disabled ) {
                    return this.state.active ? classes.active : null
                }
            else {
                return classes.disabled
            }
        }
        return (
            <button disabled={this.props.disabled} onClick={() => this.clickHandler()} className={[classes.pageButton, buildClassHandler].join( " " )}>{this.props.buttonLabel}</button>
        )
    }
}

export default PageButton