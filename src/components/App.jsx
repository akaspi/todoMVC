'use strict';

import React from 'react';

import Header from './Header.jsx';
import TodoList from './TodoList.jsx';
import Footer from './Footer.jsx';

export default React.createClass({
    render() {
        return (
            <div>
                <Header />

                <section className="main">
                    <TodoList />
                </section>

                <Footer />
            </div>
        );
    }
});