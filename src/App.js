import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import Layout from './hoc/Layout/Layout'

import PageHolder from './Container/PageHolder/PageHolder'
import WindowResize from './Component/windowResize/windowResize'
import './App.css';

import 'core-js'


class App extends Component {
    render () {
        return (
            < Layout >
            <WindowResize />
                <Switch>
                    {/* <Route path="/other" component={CV} /> */}
                    <Route path="/" render={() => <PageHolder {...this.props} />} />
                    < Route render={() => <h1>Not found</h1>} />
                </Switch>
            </Layout >
        )
    }
}

    export default App;
