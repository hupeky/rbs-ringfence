import React, {Component} from 'react'
import {connect} from 'react-redux'

import classes from '../Page.css'

import PageButton from '../../../UI/pageButton/pageButton'

import Character from '../../../assets/character/character'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../hoc/CentreContent/CentreContent'
import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'


class Info extends Component {
    state = {
        active: false
    }

    buildBonusResponseHandler ( bonusCorrect, locked, unlocked ) {
        return bonusCorrect ? <h3>{unlocked}</h3> : <h3>{locked}</h3>
    }

    render () {
        let current = false
        let bonusCorrect = false
        let {buttonLabel, label, bonusLabel, sliderRef, locked, unlocked} = this.props
        if ( bonusLabel ) {
            bonusCorrect = this.props.bonusData[bonusLabel].bonusCorrect
        }
        if ( ( this.props.index === this.props.currentIndex || this.props.index === this.props.currentIndex - 1 ) ) { // if current is true
            current = true;
        }
        return (
            <React.Fragment>
                {this.props.fullScreenImage ?
                    <React.Fragment>
                        <div style={{background: `url(${this.props.fullScreenImage})`, backgroundSize: 'cover', backgroundPosition: 'center center'}} className={classes.fullScreenImage} />
                        {current ? <Character myStyle={{position: 'absolute', bottom: `${( this.props.windowHeight * this.props.imageHeight * 1 ) - 80}px`}} /> : null}
                    </React.Fragment>
                    :
                    null}
                {this.props.bottomImage ?
                    <React.Fragment>
                        <img style={{height: `${( this.props.windowHeight * 1.2 ) * this.props.imageHeight}px`}} className={classes.bottomImage} alt="" src={this.props.bottomImage} />
                        {current ? <Character myStyle={{position: 'absolute', bottom: `${( this.props.windowHeight * this.props.imageHeight * 1 ) - 80}px`}} /> : null}
                    </React.Fragment>
                    :
                    null}
                <ContentHolder>
                    <CentreContent centre={this.props.centreContent}>
                        {this.props.title ? <h2>{this.props.title}</h2> : null}
                        {this.props.subTitle ? <h3>{this.props.subTitle}</h3> : null}
                        {this.props.question ? <h3 className={classes.question}>{this.props.question}</h3> : null}
                        {this.props.subText ? <p className={classes.subText}>{this.props.subText}</p> : null}
                        {this.props.paragraph ? <p>{this.props.paragraph}</p> : null}
                        {bonusLabel ? this.buildBonusResponseHandler( bonusCorrect, locked, unlocked ) : null}
                    </CentreContent>
                </ContentHolder>

                <ButtonHolder>
                    <PageButton buttonLabel={buttonLabel} sliderRef={sliderRef} nextPage={true} label={label} />
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


export default connect( mapStateToProps )( Info ) 