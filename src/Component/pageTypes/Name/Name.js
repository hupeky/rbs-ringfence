import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as siteActions from '../../../store/actions/siteActions'

import pageClasses from '../Page.css'
import classes from './Name.css'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../hoc/CentreContent/CentreContent'

import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'
import PageButton from '../../../UI/pageButton/pageButton'

class name extends Component {
    state = {
        disabled: true,
        value: ''
    }

    nameChangeHandler = ( event ) => {
        this.setState( {value: event.target.value} )
        event.target.value.length > 0 ? this.setState( {disabled: false} ) : this.setState( {disabled: true} )
    }

    submitNameHandler = ( answer, label ) => {
        this.props.setNameHandler( this.state.value )
        console.log( this.state.value )
    }


    render () {
        let {buttonLabel, sliderRef} = {...this.props};
        return (
            <React.Fragment>
                <ContentHolder>
                    <CentreContent force={this.props.currentIndex} centre={this.props.centreContent}>
                        {this.props.question ? <h3 className={classes.question}>{this.props.question}</h3> : null}
                        <form>
                            <input tabIndex="-1" autoComplete="off" className={pageClasses.input} type="text" placeholder={'Enter your nickname'} value={this.state.value} onChange={this.nameChangeHandler} name="nickname" />

                        </form>
                    </CentreContent>
                </ContentHolder>
                <ButtonHolder>
                    <PageButton disabled={this.state.disabled} buttonLabel={buttonLabel} click={() => this.submitNameHandler()} sliderRef={sliderRef} nextPage={true} />
                </ButtonHolder>

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => { // map redux state to class props
    return {
        currentIndex: state.currentIndex,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setNameHandler: ( nickname ) => dispatch( {type: siteActions.SET_NICKNAME, nickname: nickname} ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( name ) 