import React from 'react';
import TodoItem from './TodoItem.jsx';

export default React.createClass({
    displayName: 'TodoList',
    propTypes: {
        todos: React.PropTypes.array.isRequired,
        onToggle: React.PropTypes.func.isRequired,
        onDestroy: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            editing: null
        };
    },
    edit(todo) {
        this.setState({editing: todo.id});
    },
    save(todo, text) {
        this.props.onSave(todo, text);
        this.setState({editing: null});
    },
    cancel() {
        this.setState({editing: null});
    },

    render() {
        
        var todoItems = this.props.todos.map(function (todo) {
            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={() => this.props.onToggle(todo)}
                    onDestroy={() => this.props.onDestroy(todo)}
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
});