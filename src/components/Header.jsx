'use strict';

import React from 'react';

import { connect } from 'react-redux';
import { addTodo } from '../common/actionCreators';

import { ENTER_KEY } from '../common/constants';

function mapDispatchToProps(dispatch) {
    return {
        addTodo: (title) => dispatch(addTodo(title))
    };
}

export default connect(null, mapDispatchToProps)(React.createClass({
    displayName: 'Header',
    
    propTypes: {
        addTodo: React.PropTypes.func.isRequired
    },
    
    getInitialState() {
        return {
            newTodo: ''
        };
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
            this.props.addTodo(val);
            this.setState({
                newTodo: ''
            });
        }
    },
    
    render() {
        return (
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
        );
    }
}));