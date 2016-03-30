import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import { clearCompleted, setFilter } from '../common/actionCreators';
import { getFilteredTodos } from '../common/utils';

import classNames from 'classnames';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../common/constants';

function mapStateToProps(state) {
    return {
        todos: state.todos,
        filter: state.filter
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clearCompleted: () => dispatch(clearCompleted()),
        setFilter: (filter) => dispatch(setFilter(filter))
    };
}

const pluralize = (count, word) => {
    return count === 1 ? word : word + 's';
};

export default connect(mapStateToProps, mapDispatchToProps)(React.createClass({
    displayName: 'Footer',
    
    propTypes: {
        filter: React.PropTypes.string.isRequired,
        setFilter: React.PropTypes.func.isRequired,
        clearCompleted: React.PropTypes.func
    },
    
    render() {
        var count = getFilteredTodos(this.props.todos, this.props.filter).length;
        var activeTodoWord = pluralize(count, 'item');
        var clearButton = null;

        if (_.any(this.props.todos, 'completed')) {
            clearButton = (
                <button
                    className="clear-completed"
                    onClick={this.props.clearCompleted}>
                    Clear completed
                </button>
            );
        }

        return (
            <footer className="footer">
					<span className="todo-count">
						<strong>{count}</strong> {activeTodoWord} left
					</span>
                <ul className="filters">
                    <li>
                        <a
                            onClick={() => this.props.setFilter(ALL_TODOS)}
                            className={classNames({selected: this.props.filter === ALL_TODOS})}>
                            All
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            onClick={() => this.props.setFilter(ACTIVE_TODOS)}
                            className={classNames({selected: this.props.filter === ACTIVE_TODOS})}>
                            Active
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            onClick={() => this.props.setFilter(COMPLETED_TODOS)}
                            className={classNames({selected: this.props.filter === COMPLETED_TODOS})}>
                            Completed
                        </a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        );
    }
}));