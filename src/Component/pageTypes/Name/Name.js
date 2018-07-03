import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as siteActions from '../../../store/actions/siteActions'

import pageClasses from '../Page.css'
import classes from './Name.css'

import axios from '../../../hoc/axios'

import ContentHolder from './../../../hoc/contentHolder/contentHolder'
import CentreContent from '../../../hoc/CentreContent/CentreContent'

import ButtonHolder from './../../../hoc/buttonHolder/buttonHolder'
import PageButton from '../../../UI/pageButton/pageButton'

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.gcss'

class name extends Component {
    state = {
        disabled: true,
        value: '',
        dropDown: {
            value: '',
            label: ''
        },
    }

    dropData = [
        {value: '', label: 'Select'},
        {value: 'CommunicationsMarketing', label: 'Communications & Marketing'},
        {value: 'CorporateGovernanceRegulatoryAffairs', label: 'Corporate Governance & Regulatory Affairs'},
        {value: 'HumanResources', label: 'Human Resources'},
        {value: 'InternalAudit', label: 'Internal Audit'},
        {value: 'Finance', label: 'Finance'},
        {value: 'Legal', label: 'Legal'},
        {value: 'NatWestMarkets', label: 'NatWest Markets'},
        {value: 'PersonalBusinessBanking', label: 'Personal & Business Banking'},
        {value: 'RiskConductRestructuring', label: 'Risk, Conduct & Restructuring'},
        {value: 'Services', label: 'Services'},
        {value: 'UlsterBank', label: 'Ulster Bank'},
        {value: 'WilliamsGlyn', label: 'Williams & Glyn'}
    ]



    nameChangeHandler = ( event ) => {
        this.setState( {value: event.target.value} )

        if ( this.state.dropDown.value.length > 0 && event.target.value.length > 0 ) {
            this.setState( {disabled: false} )
        } else {
            this.setState( {disabled: true} )
        }
    }

    areaChangeHandler ( data ) {
        console.log( 'data', data )
        this.setState( {dropDown: data} )
        if ( this.state.value.length > 0 && data.value.length > 0 ) {
            this.setState( {disabled: false} )
        } else {
            this.setState( {disabled: true} )
        }
    }

    submitNameHandler = ( answer, label ) => {
        this.props.setNameHandler( this.state.value )
        console.log( 'user select value', this.state.dropDown.value )

        /*         const keys = this.dropData.map((item, index) => { // build keys for lookup table in firebase
                    return item.value;
                })
        
                axios.post('/keys.json', keys)
                .then(response => console.log (response))
                .catch(error => console.log (error)) */

                let area = {value: this.state.dropDown.value}

                axios.post('/users.json', area)
                .then(response => console.log (response))
                .catch(error => console.log (error)) 


    }





    render () {
        let {buttonLabel, sliderRef} = {...this.props}
        return (
            <React.Fragment>
                <ContentHolder>
                    <CentreContent force={this.props.currentIndex} centre={this.props.centreContent}>

                        <h4 >Which area do you work in?</h4>
                        <Dropdown options={this.dropData} onChange={( data ) => this.areaChangeHandler( data )} value={this.state.dropDown.label} placeholder="Select an option" />

                        {this.props.subTitle ? <h4 className={classes.question}>{this.props.subTitle}</h4> : null}
                        <input tabIndex="-1" autoComplete="off" className={pageClasses.input} type="text" placeholder={'Enter your nickname'} value={this.state.value} onChange={this.nameChangeHandler} name="nickname" />

                    </CentreContent>
                </ContentHolder>
                <ButtonHolder>
                    <PageButton disabled={this.state.disabled} buttonLabel={buttonLabel} click={() => this.submitNameHandler()} sliderRef={sliderRef} nextPage={true} />
                </ButtonHolder>

            </React.Fragment >
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