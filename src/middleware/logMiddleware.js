'use strict';

export default store => next => action => {
    console.log('Performing action:', action);
    return next(action);
};