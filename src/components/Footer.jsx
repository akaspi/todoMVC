import React from 'react';
import classNames from 'classnames';

import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../common/constants';

const pluralize = (count, word) => {
    return count === 1 ? word : word + 's';
};

export default React.createClass({
    displayName: 'Footer',
    
    propTypes: {
        nowShowing: React.PropTypes.string.isRequired,
        setNowShowing: React.PropTypes.func.isRequired,
        count: React.PropTypes.number,
        completedCount: React.PropTypes.number,
        onClearCompleted: React.PropTypes.func
    },
    
    render() {
        var activeTodoWord = pluralize(this.props.count, 'item');
        var clearButton = null;

        if (this.props.completedCount > 0) {
            clearButton = (
                <button
                    className="clear-completed"
                    onClick={this.props.onClearCompleted}>
                    Clear completed
                </button>
            );
        }

        var nowShowing = this.props.nowShowing;
        return (
            <footer className="footer">
					<span className="todo-count">
						<strong>{this.props.count}</strong> {activeTodoWord} left
					</span>
                <ul className="filters">
                    <li>
                        <a
                            onClick={() => this.props.setNowShowing(ALL_TODOS)}
                            className={classNames({selected: nowShowing === ALL_TODOS})}>
                            All
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            onClick={() => this.props.setNowShowing(ACTIVE_TODOS)}
                            className={classNames({selected: nowShowing === ACTIVE_TODOS})}>
                            Active
                        </a>
                    </li>
                    {' '}
                    <li>
                        <a
                            onClick={() => this.props.setNowShowing(COMPLETED_TODOS)}
                            className={classNames({selected: nowShowing === COMPLETED_TODOS})}>
                            Completed
                        </a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        );
    }
});
