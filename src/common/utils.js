import _ from 'lodash';

import { ACTIVE_TODOS, COMPLETED_TODOS } from '../common/constants';

export const getFilteredTodos = (todos, filterType) => {
    if (filterType === ACTIVE_TODOS) {
        return _.reject(todos, 'completed');
    } else if (filterType === COMPLETED_TODOS) {
        return _.filter(todos, 'completed');
    }
    return todos;
};