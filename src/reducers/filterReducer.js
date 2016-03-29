import { SET_FILTER } from '../common/actionTypes';
import { ALL_TODOS } from '../common/constants';

const initialState = ALL_TODOS;

export default function filterReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_FILTER:
            return action.filter;
        default:
            return state;
    }
}


