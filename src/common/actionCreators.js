import _ from 'lodash';
import * as actionTypes from './actionTypes';

export const addTodo = (title) => {
    return {
        type: actionTypes.ADD_TODO,
        title,
        id: _.uniqueId('todo')
    };
};

export const editTodo = (todo, title) => {
    return {
        type: actionTypes.EDIT_TODO,
        todo,
        title
    };
};

export const removeTodo = (todo) => {
    return {
        type: actionTypes.REMOVE_TODO,
        todo
    };
};

export const toggleTodo = (todo) => {
    return {
        type: actionTypes.TOGGLE_TODO,
        todo
    };
};

export const toggleAllTodos = () => {
    return {
        type: actionTypes.TOGGLE_ALL_TODOS
    };
};

export const clearCompleted = () => {
    return {
        type: actionTypes.CLEAR_COMPLETED
    };
};

export const setFilter = (filter) => {
    return {
        type: actionTypes.SET_FILTER,
        filter
    };
};
