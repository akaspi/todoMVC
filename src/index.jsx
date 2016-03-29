'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { makeStore } from './common/makeStore';

import App from './components/App.jsx';

ReactDOM.render(
    <Provider store={makeStore()}>
        <App />
    </Provider>
    , document.getElementById('app'));