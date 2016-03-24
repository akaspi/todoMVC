'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Model from './common/Model';
import App from './components/App.jsx';

const model = new Model('react-todos');

const render = () => {
    ReactDOM.render(<App model={model}/>, document.getElementById('app'));
};

model.subscribe(render);

render();