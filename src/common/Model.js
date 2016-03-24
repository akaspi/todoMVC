import _ from 'lodash';
import { store, uuid } from './utils';

function Model(key) {
    this.key = key;
    this.todos = store(key);
    this.onChanges = [];
}

Model.prototype.subscribe = function (onChange) {
    this.onChanges.push(onChange);
};

Model.prototype.inform = function () {
    store(this.key, this.todos);
    this.onChanges.forEach(function (cb) { cb(); });
};

Model.prototype.addTodo = function (title) {
    this.todos = this.todos.concat({
        id: uuid(),
        title: title,
        completed: false
    });

    this.inform();
};

Model.prototype.toggleAll = function (checked) {
    // Note: it's usually better to use immutable data structures since they're
    // easier to reason about and React works very well with them. That's why
    // we use map() and filter() everywhere instead of mutating the array or
    // todo items themselves.
    this.todos = this.todos.map(function (todo) {
        return _.assign({}, todo, {completed: checked});
    });

    this.inform();
};

Model.prototype.toggle = function (todoToToggle) {
    this.todos = this.todos.map(function (todo) {
        return todo !== todoToToggle ?
            todo :
            _.assign({}, todo, {completed: !todo.completed});
    });

    this.inform();
};

Model.prototype.destroy = function (todo) {
    this.todos = this.todos.filter(function (candidate) {
        return candidate !== todo;
    });

    this.inform();
};

Model.prototype.save = function (todoToSave, text) {
    this.todos = this.todos.map(function (todo) {
        return todo !== todoToSave ? todo : _.assign({}, todo, {title: text});
    });

    this.inform();
};

Model.prototype.clearCompleted = function () {
    this.todos = this.todos.filter(function (todo) {
        return !todo.completed;
    });

    this.inform();
};


export default Model;
