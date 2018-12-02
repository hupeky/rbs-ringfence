import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import './index.css'
import App from './App'

import {BrowserRouter} from 'react-router-dom'
import { createStore, applyMiddleware,compose } from 'redux';
import siteReducer from './store/reducers/siteReducer'

import thunk from 'redux-thunk';
import { unregister } from './registerServiceWorker'
unregister()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore( siteReducer, composeEnhancers(
    applyMiddleware( thunk )
) );


const Root = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render( Root, document.getElementById( 'root' ) );
