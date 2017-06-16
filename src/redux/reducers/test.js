import { handleActions } from 'redux-actions';
import { FETCH_TEST, FETCH_TEST2 } from '../actions/test.js';

const defaultState = {
    list: [],
    list2: []
};
export default handleActions({
    FETCH_TEST: (state, action) => {
        let payload = action.payload;

        return Object.assign({}, state, {
            list: payload.list
        });
    },
    FETCH_TEST2: (state, action) => {
        let payload = action.payload;

        return Object.assign({}, state, {
            list2: payload.list
        });
    }
}, defaultState);