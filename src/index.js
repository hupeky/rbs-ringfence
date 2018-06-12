import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import {BrowserRouter} from 'react-router-dom'
import {createStore} from 'redux'
import siteReducer from './store/reducers/siteReducer'

const store = createStore( siteReducer )

const Root = (
    <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
    </Provider>
)

ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();
