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
            let difference = ( ( windowHeight - 50 ) - contentHeight ) / 2.5

            if ( difference > 0 ) {
                this.setState( {marginTop: difference} )
            }
        } else {
            this.setState( {marginTop: '50px'} )
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
