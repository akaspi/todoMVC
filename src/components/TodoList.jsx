import React from 'react';
import TodoItem from './TodoItem.jsx';

export default React.createClass({
    displayName: 'TodoList',
    propTypes: {
        todos: React.PropTypes.array.isRequired,
        onToggle: React.PropTypes.func.isRequired,
        onDestroy: React.PropTypes.func.isRequired,
        onEdit: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func.isRequired,
        editingId: React.PropTypes.string
    },
    render() {
        
        var todoItems = this.props.todos.map(function (todo) {
            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={() => this.props.onToggle(todo)}
                    onDestroy={() => this.props.onDestroy(todo)}
                    onEdit={() => this.props.onEdit(todo)}
                    editing={this.props.editingId === todo.id}
                    onSave={() => this.props.onSave(todo)}
                    onCancel={this.props.onCancel}
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