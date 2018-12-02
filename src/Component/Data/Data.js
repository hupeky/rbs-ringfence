import React, {Component} from 'react';

import axios from '../../hoc/axios'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class DataPage extends Component {
    componentWillMount = () => {
        axios.get( '/answers.json' )
            .then( response => {
                console.log ('could access answers',response ) 
            } )
            .catch( error => {
                console.log ('error', error )
            } );
    }

    render () {
        return (
            <div>
                <h1>Data page</h1>
                <p>Can we access data.</p>


            </div>
        );
    }
}

export default ( withErrorHandler( DataPage, axios ) );
