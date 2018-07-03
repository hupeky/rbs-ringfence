import React, {Component} from 'react'
import MySVG from './../../../assets/character/charTemp.svgi'
import convertPNG from 'save-svg-as-png'

import 'innersvg-polyfill'
import classes from './Share.css'
import canvg from 'canvg-fixed'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../hoc/CentreContent/CentreContent'
import Character from '../../../assets/character/character'

import PageButton from '../../../UI/pageButton/pageButton'
import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'

import {connect} from 'react-redux'

class Share extends Component {
    state = {
        characterURI: false,
        current: false,
    }

    getUriHandler = () => {
        convertPNG.svgAsPngUri( document.getElementById( "character" ), {}, ( uri ) => {
            this.setState( {characterURI: uri} )
        } );
    }

    downloadHandler = () => {

        let character = document.getElementById( "character" )

        // let background = document.querySelectorAll( "#background" )

        // for ( var i = 0; i < background.length; i++ ) {
        //     background[i].style.opacity = 1
        // }

        console.log( character.innerHTML )
        canvg( document.getElementById( "canvas" ), `<svg version="1.1" id="character" x="0px" y="0px" viewBox="0 0 300 284.1" width="900" height="852"><rect x="-50" y="-50" width="1000" height="1000" style="fill:#3c4983;" />${character.innerHTML} </svg>` )
        let canvas = document.getElementById( "canvas" )


        if ( canvas.msToBlob ) { //for IE

            var blob = canvas.msToBlob();
            console.log( blob )
            window.navigator.msSaveBlob( blob, 'character.png' );
        } else {
            /*   let img = document.createElement( "img" );
              img.src = canvas.toDataURL( "image/png" );
              img.download = "character.png";
  
              var a = document.createElement( 'a' );
              a.href = canvas.toDataURL( "image/png" )
              a.download = "character.png";
              document.body.appendChild( a );
              a.click();
              document.body.removeChild( a ); */
            convertPNG.saveSvgAsPng( document.getElementById( "character" ), "test.png",{scale: 3, backgroundColor: 'red'} );

        }
    }

    render () {
        let current = false;
        if ( ( this.props.index === this.props.currentIndex ) ) { // if current is true
            current = true;
        }
        let {buttonLabel} = this.props
        return (
            <React.Fragment>
                <ContentHolder>
                    <canvas style={{display: 'none'}} id="canvas"></canvas>
                    <CentreContent centre={this.props.centreContent}>
                        {this.props.title ? <h2>{this.props.title}</h2> : null}
                        {this.props.subTitle ? <h3>{this.props.subTitle}</h3> : null}
                        {this.props.question ? <h3 className={classes.question}>{this.props.question}</h3> : null}
                        {this.props.subText ? <p className={classes.subText}>{this.props.subText}</p> : null}
                        {this.props.paragraph ? <p>{this.props.paragraph}</p> : null}
                        <Character />

                    </CentreContent>
                </ContentHolder>
                <ButtonHolder>
                    <PageButton buttonLabel={buttonLabel} click={this.downloadHandler} nextPage={false} />
                </ButtonHolder>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => { // map redux state to class props
    return {
        currentIndex: state.currentIndex,
        windowHeight: state.windowHeight,
        bonusData: state.bonusData
    }
}


export default connect( mapStateToProps )( Share ) 
