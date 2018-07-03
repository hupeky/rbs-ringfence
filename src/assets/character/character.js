import React, {Component} from 'react'
import {connect} from 'react-redux'

import CharacterSVG from '../character/finalCharacter.svgi'
import classes from './character.css'

class Character extends Component {

    componentDidMount() {
        Object.keys(this.props.itemsData).forEach((key, index) => {
            let layer = this.props.itemsData[key].itemLabel
            let selected = this.props.itemsData[key].selected
            let visible = this.props.itemsData[key].visible

            if (visible) {
                let svgLayer = document.querySelectorAll(`#${layer} #${selected}`)

                for(var i=0;i<svgLayer.length;i++) {
                    svgLayer[i].style.display = 'block'
                }  
            }
        })
        
    }

    render () {
        return (
            <div  className={classes.Character} style={this.props.myStyle}>
                <CharacterSVG  />
            </div>
        )
    }
}

const mapStateToProps = state => { // map redux state to class props
    return {
        itemsData: state.itemsData,
    }
}

export default connect( mapStateToProps )( Character ) 
