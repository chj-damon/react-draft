import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import rootReducer from './reducers/index';

export default createStore(rootReducer, applyMiddleware(promise));