import React, {Component} from 'react'
import MySVG from './../../../assets/character/charTemp.svgi'
import convertPNG from 'save-svg-as-png'

import 'innersvg-polyfill'
import classes from './Share.css'
import canvg from 'canvg-fixed'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../hoc/CentreContent/CentreContent'
import Character from '../../../assets/character/character'

class Share extends Component {
    state = {
        characterURI: false
    }
    componentDidMount () {}



    getUriHandler = () => {
        convertPNG.svgAsPngUri( document.getElementById( "character" ), {}, ( uri ) => {
            this.setState( {characterURI: uri} )
        } );
    }

    downloadHandler = () => {
        // convertPNG.saveSvgAsPng( document.getElementById( "character" ), "./myarm.png" );
        let character = document.getElementById( "character" )
        console.log (character.innerHTML)
        canvg( document.getElementById( "canvas" ), `<svg version="1.1" id="character" x="0px" y="0px" viewBox="0 0 300 284.1" width="300" height="284">${character.innerHTML} </svg>` )
        let canvas = document.getElementById( "canvas" )


        if ( canvas.msToBlob ) { //for IE

            var blob = canvas.msToBlob();
            console.log (blob)
            window.navigator.msSaveBlob( blob, 'character.png' );
        } else {
            let img = document.createElement( "img" );
            //other browsers

            img.src = canvas.toDataURL( "image/png" );
            img.download = "character.png";

            var a = document.createElement( 'a' );
            a.href = canvas.toDataURL( "image/png" )
            a.download = "character.png";
            document.body.appendChild( a );
            a.click();
            document.body.removeChild( a );
        }
    }


    render () {

        return (
            <React.Fragment>
                <ContentHolder>
                    <canvas style={{display:'none'}} id="canvas"></canvas>
                    <CentreContent centre={this.props.centreContent}>
                        {this.props.title ? <h2>{this.props.title}</h2> : null}
                        {this.props.subTitle ? <h3>{this.props.subTitle}</h3> : null}
                        {this.props.question ? <h3 className={classes.question}>{this.props.question}</h3> : null}
                        {this.props.subText ? <p className={classes.subText}>{this.props.subText}</p> : null}
                        {this.props.paragraph ? <p>{this.props.paragraph}</p> : null}
                        <Character /> <br />
                        <button onClick={this.downloadHandler} >download file</button>
                    </CentreContent>
                </ContentHolder>
            </React.Fragment>
        )
    }
}

export default Share
