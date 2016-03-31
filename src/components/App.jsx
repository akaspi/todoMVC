'use strict';

import _ from 'lodash';
import React from 'react';

import Header from './Header.jsx';
import TodoList from './TodoList.jsx';
import Footer from './Footer.jsx';

import {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS} from '../common/constants';

export default React.createClass({
    displayName: 'App',

    getInitialState() {
        return {
            todos: [],
            nowShowing: ALL_TODOS
        };
    },

    addItem(itemTitle) {
        var newTodos = _.clone(this.state.todos);
        newTodos.push({
            title: itemTitle,
            completed: false,
            id: _.uniqueId('item')
        });

        this.setState({
            todos: newTodos
        });
    },

    toggle(todoToToggle) {
        var newTodos = this.state.todos.map(function (todo) {
            return todo !== todoToToggle ?
                todo :
                _.assign({}, todo, {completed: !todo.completed});
        });

        this.setState({todos: newTodos});

    },

    destroy(todo) {
        var newTodos = _.reject(this.state.todos, todo);

        this.setState({todos: newTodos});
    },

    save(todoToSave, text) {
        var newTodos = this.state.todos.map(function (todo) {
            return todo !== todoToSave ? todo : _.assign({}, todo, {title: text});
        });

        this.setState({todos: newTodos});
    },

    clearCompleted() {
        var newTodos = _.reject(this.state.todos, 'completed');

        this.setState({todos: newTodos});
    },

    render() {
        var todos = this.state.todos.filter(function (todo) {
            switch (this.state.nowShowing) {
                case ACTIVE_TODOS:
                    return !todo.completed;
                case COMPLETED_TODOS:
                    return todo.completed;
                default:
                    return true;
            }
        }, this);

        return (
            <div>
                <Header onAdd={this.addItem}/>
                <section className="main">
                    <TodoList todos={todos}
                              onToggle={this.toggle}
                              onDestroy={this.destroy}
                              onEdit={this.edit}
                              onSave={this.save}
                              onCancel={this.cancel}
                    />
                </section>
                <Footer
                    nowShowing={this.state.nowShowing}
                    setNowShowing={(nowShowing) => this.setState({ nowShowing: nowShowing})}
                    showClearCompleted={_.any(this.state.todos, 'completed')}
                    onClearCompleted={this.clearCompleted}
                />
            </div>
        );
    }

});