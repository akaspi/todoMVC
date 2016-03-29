import { createStore, combineReducers, applyMiddleware } from 'redux';

import todosReducer from '../reducers/todosReducer';
import filterReducer from '../reducers/filterReducer';

import logMiddleware from '../middleware/logMiddleware';

export const makeStore = () => {

    const reducers = combineReducers({
        todos: todosReducer,
        filter: filterReducer
    });

    const middleware = applyMiddleware(
        logMiddleware
    );

    return createStore(reducers, undefined, middleware);
};
