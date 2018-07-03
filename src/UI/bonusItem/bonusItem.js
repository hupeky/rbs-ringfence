import React, {Component} from 'react'

// import classes from './bonusItem.css'

class bonusItem extends Component {
    MyComponent = <div></div>
    shouldComponentUpdate ( nextProps ) {
        if ( this.props.bonusCorrect === null ) {
            return false
        } else {
            return true
        }

    }
    componentDidMount () {
        let icon = document.getElementById( this.props.label )
        let redBar = document.querySelector( `#${this.props.label} #redBar` )
        let selectedItem = document.querySelector( `#${this.props.label} #${this.props.selected}` )
        selectedItem.style.display = 'block'
        if ( this.props.current ) {
            if ( icon ) {
                icon.style.opacity = 1
            }
        }
        if ( !this.props.current ) {
            if ( icon ) {
                icon.style.opacity = 0.5
            }
        }
        if ( this.props.correct ) {
            if ( redBar ) {
                redBar.style.display = 'block'
                redBar.style.opacity = 0
            }
        }
        if ( !this.props.correct ) {
            if ( redBar ) {
                redBar.style.display = 'block'
                redBar.style.opacity = 1
            }
        }

    }

    render () {



        let MyComponent = this.props.icon
        return (
            <MyComponent />
        )
    }

}

export default bonusItem 