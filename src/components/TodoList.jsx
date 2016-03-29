import React from 'react';

import { connect } from 'react-redux';
import { editTodo, removeTodo, toggleTodo } from '../common/actionCreators';
import { getFilteredTodos } from '../common/utils';

import TodoItem from './TodoItem.jsx';

function mapStateToProps(state) {
    return {
        todos: state.todos,
        filter: state.filter
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removeTodo: (todo) => dispatch(removeTodo(todo)),
        toggleTodo: (todo) => dispatch(toggleTodo(todo)),
        editTodo: (todo, title) => dispatch(editTodo(todo, title))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(React.createClass({
    displayName: 'TodoList',
    propTypes: {
        todos: React.PropTypes.array.isRequired,
        toggleTodo: React.PropTypes.func.isRequired,
        removeTodo: React.PropTypes.func.isRequired,
        editTodo: React.PropTypes.func.isRequired,
        filter: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return {
            editing: null
        };
    },
    edit(todo) {
        this.setState({editing: todo.id});
    },
    save(todo, title) {
        this.props.editTodo(todo, title);
        this.setState({editing: null});
    },
    cancel() {
        this.setState({editing: null});
    },
    render() {

        var todoItems = getFilteredTodos(this.props.todos, this.props.filter).map(function (todo) {
            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={() => this.props.toggleTodo(todo)}
                    onDestroy={() => this.props.removeTodo(todo)}
                    onEdit={() => this.edit(todo)}
                    editing={this.state.editing === todo.id}
                    onSave={(text) => this.save(todo, text)}
                    onCancel={this.cancel}
                />
            );
        }, this);

        return (
            <ul className="todo-list">
                {todoItems}
            </ul>
        );
    }
}));