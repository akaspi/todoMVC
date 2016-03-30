import _ from 'lodash';
import todosReducer from '../../src/reducers/todosReducer';

import { addTodo, removeTodo, toggleTodo, toggleAllTodos, clearCompleted } from '../../src/common/actionCreators';

describe('Todos Reducer Spec', () => {

    it('should return an initial state', () => {
        const nextState = todosReducer(undefined, {});

        expect(nextState).toEqual([]);
    });

    it('should add todo', () => {
        const currentState = [];
        const newTodo = {
            title: 'newTodo',
            completed: false
        };

        const nextState = todosReducer(currentState, addTodo(newTodo.title));

        expect([ _.omit(nextState[0], 'id') ]).toEqual([ newTodo ]);
    });

    it('should remove todo', () => {
        const firstTodo = { title: 'titleA', completed: false, id:'item_1' };
        const secondTodo = { title: 'titleB', completed: false, id:'item_2' };

        const currentState = [ firstTodo, secondTodo ];

        const nextState = todosReducer(currentState, removeTodo(firstTodo));

        expect(nextState).toEqual([ secondTodo ]);
    });

    it('should toggle todo', () => {
        const firstTodo = { title: 'titleA', completed: false, id:'item_1' };
        const secondTodo = { title: 'titleB', completed: false, id:'item_2' };

        const currentState = [ firstTodo, secondTodo ];

        const nextState = todosReducer(currentState, toggleTodo(firstTodo));

        expect(nextState[0].completed).toEqual(true);
        expect(nextState[1].completed).toEqual(false);
    });

    it('should toggle all todos', () => {
        const firstTodo = { title: 'titleA', completed: false, id:'item_1' };
        const secondTodo = { title: 'titleB', completed: false, id:'item_2' };

        const currentState = [ firstTodo, secondTodo ];

        const nextState = todosReducer(currentState, toggleAllTodos());

        expect(nextState[0].completed).toEqual(true);
        expect(nextState[0].completed).toEqual(true);
    });

    it('should toggle all todos', () => {
        const firstTodo = { title: 'titleA', completed: true, id:'item_1' };
        const secondTodo = { title: 'titleB', completed: false, id:'item_2' };

        const currentState = [ firstTodo, secondTodo ];

        const nextState = todosReducer(currentState, clearCompleted());

        expect(nextState).toEqual([ secondTodo ]);
    });

});