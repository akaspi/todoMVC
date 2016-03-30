import filterReducer from '../../src/reducers/filterReducer';

import { setFilter } from '../../src/common/actionCreators';
import { ALL_TODOS, ACTIVE_TODOS } from '../../src/common/constants';

describe('Filter Reducer Spec', () => {

    it('should return an initial state', () => {
        const nextState = filterReducer(undefined, {});

        expect(nextState).toEqual(ALL_TODOS);
    });

    it('should set the given filter', () => {
        const currentState = ALL_TODOS;

        const nextState = filterReducer(currentState, setFilter(ACTIVE_TODOS));

        expect(nextState).toEqual(ACTIVE_TODOS);
    });

});