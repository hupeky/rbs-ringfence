import React, {Component} from 'react'
import MySVG from './../../../assets/character/charTemp.svgi'
import convertPNG from 'save-svg-as-png'

class Svg extends Component {
    state = {
        characterURI: false
        
    }
    componentDidMount () {
        let myArm = document.getElementById( 'character' );
        myArm.style.transform = 'rotate(5deg)';
        myArm.style.opacity = 0.5;
        // convertPNG.saveSvgAsPng( myArm, "./myarm.png" );


    }

    getUriHandler = () => {
        convertPNG.svgAsPngUri( document.getElementById( "character" ), {}, ( uri ) => {
            this.setState({characterURI:uri})
        } );
    }
    render () {
        return (
            <React.Fragment>
                <MySVG /> <br />    
                <button onClick={this.getUriHandler} >click</button>
                {this.state.characterURI ? <img alt="" src={this.state.characterURI } /> : null}
            </React.Fragment>
        )
    }
}

export default Svg
