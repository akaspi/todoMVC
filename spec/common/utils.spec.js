import * as utils from '../../src/common/utils';

import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../../src/common/constants';

describe('Utils Spec', () => {

    describe('filter todos', () => {

        const firstTodo = { title: 'titleA', completed: false, id:'item_1' };
        const secondTodo = { title: 'titleB', completed: true, id:'item_2' };
        const thirdTodo = { title: 'titleC', completed: false, id:'item_2' };

        const todos = [ firstTodo, secondTodo, thirdTodo ];

        it('should not filter', () => {
            const filteredTodos = utils.getFilteredTodos(todos, ALL_TODOS);

            expect(filteredTodos).toEqual(todos);
        });

        it('should filter all but active todos', () => {
            const filteredTodos = utils.getFilteredTodos(todos, ACTIVE_TODOS);

            expect(filteredTodos).toEqual([ firstTodo, thirdTodo ]);
        });

        it('should filter all but completed todos', () => {
            const filteredTodos = utils.getFilteredTodos(todos, COMPLETED_TODOS);

            expect(filteredTodos).toEqual([ secondTodo ]);
        });

    })

});