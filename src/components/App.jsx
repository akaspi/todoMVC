'use strict';

import React from 'react';
import _ from 'lodash';

import TodoFooter from './TodoFooter.jsx';
import TodoItem from './TodoItem.jsx';

import { Router } from 'director';

import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from '../common/constants';

export default React.createClass({
    getInitialState() {
        return {
            todos: [],
            nowShowing: ALL_TODOS,
            editing: null,
            newTodo: ''
        };
    },
    componentDidMount() {
        var setState = this.setState;
        var router = Router({
            '/': setState.bind(this, {nowShowing: ALL_TODOS}),
            '/active': setState.bind(this, {nowShowing: ACTIVE_TODOS}),
            '/completed': setState.bind(this, {nowShowing: COMPLETED_TODOS})
        });
        router.init('/');
    },
    handleChange(event) {
        this.setState({newTodo: event.target.value});
    },
    handleNewTodoKeyDown(event) {
        if (event.keyCode !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        var val = this.state.newTodo.trim();

        if (val) {
            var newTodos = _.clone(this.state.todos);
            newTodos.push({
                title: val,
                completed: false,
                id: _.uniqueId('item')
            });

            this.setState({
                newTodo: '',
                todos: newTodos
            });
        }
    },

    toggleAll(event) {
        var checked = event.target.checked;
        var newTodos = this.state.todos.map(function (todo) {
            return _.assign({}, todo, {completed: checked});
        });

        this.setState({ todos: newTodos });
    },

    toggle(todoToToggle) {
        var newTodos = this.state.todos.map(function (todo) {
            return todo !== todoToToggle ?
                todo :
                _.assign({}, todo, {completed: !todo.completed});
        });

        this.setState({ todos: newTodos });

    },

    destroy(todo) {
        var newTodos = _.reject(this.state.todos, todo);

        this.setState({ todos: newTodos });
    },

    edit(todo) {
        this.setState({editing: todo.id});
    },

    save(todoToSave, text) {
        var newTodos = this.state.todos.map(function (todo) {
            return todo !== todoToSave ? todo : _.assign({}, todo, {title: text});
        });

        this.setState({editing: null, todos: newTodos});
    },

    cancel() {
        this.setState({editing: null});
    },

    clearCompleted() {
        var newTodos = _.reject(this.state.todos, 'completed');

        this.setState({ todos: newTodos });
    },
    render() {
        var footer;
        var main;
        var todos = this.state.todos;

        var shownTodos = todos.filter(function (todo) {
            switch (this.state.nowShowing) {
                case ACTIVE_TODOS:
                    return !todo.completed;
                case COMPLETED_TODOS:
                    return todo.completed;
                default:
                    return true;
            }
        }, this);

        var todoItems = shownTodos.map(function (todo) {
            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={this.toggle.bind(this, todo)}
                    onDestroy={this.destroy.bind(this, todo)}
                    onEdit={this.edit.bind(this, todo)}
                    editing={this.state.editing === todo.id}
                    onSave={this.save.bind(this, todo)}
                    onCancel={this.cancel}
                />
            );
        }, this);

        var activeTodoCount = todos.reduce(function (accum, todo) {
            return todo.completed ? accum : accum + 1;
        }, 0);

        var completedCount = todos.length - activeTodoCount;

        if (activeTodoCount || completedCount) {
            footer =
                <TodoFooter
                    count={activeTodoCount}
                    completedCount={completedCount}
                    nowShowing={this.state.nowShowing}
                    onClearCompleted={this.clearCompleted}
                />;
        }

        if (todos.length) {
            main = (
                <section className="main">
                    <input
                        className="toggle-all"
                        type="checkbox"
                        onChange={this.toggleAll}
                        checked={activeTodoCount === 0}
                    />
                    <ul className="todo-list">
                        {todoItems}
                    </ul>
                </section>
            );
        }

        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                        value={this.state.newTodo}
                        onKeyDown={this.handleNewTodoKeyDown}
                        onChange={this.handleChange}
                        autoFocus={true}
                    />
                </header>
                {main}
                {footer}
            </div>
        );
    }
});