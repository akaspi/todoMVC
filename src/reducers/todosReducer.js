import _ from 'lodash';
import { ADD_TODO, EDIT_TODO, REMOVE_TODO, TOGGLE_TODO, TOGGLE_ALL_TODOS, CLEAR_COMPLETED } from '../common/actionTypes';

const initialState = [];

function toggleComplete(todo) {
    const toggledTodo = _.clone(todo);
    toggledTodo.completed = !todo.completed;
    return toggledTodo;
}

export default function todosReducer(state = initialState, action = {}) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([{ title: action.title, completed: false, id: action.id }]);

        case EDIT_TODO:
            var todoIndex = _.findIndex(state, action.todo);
            return [...state.slice(0, todoIndex), _.assign({}, action.todo, { title: action.title }), ...state.slice(todoIndex + 1)];

        case REMOVE_TODO:
            return _.reject(state, action.todo);

        case TOGGLE_TODO:
            var todoIndex = _.findIndex(state, action.todo);
            return [...state.slice(0, todoIndex), toggleComplete(action.todo), ...state.slice(todoIndex + 1)];

        case TOGGLE_ALL_TODOS:
            return _.map(state, toggleComplete);

        case CLEAR_COMPLETED:
            return _.reject(state, 'completed');

        default:
            return state;
    }
}

