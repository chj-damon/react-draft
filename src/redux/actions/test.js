import { createActions } from 'redux-actions';
import post from '../fetchData';

export const { fetchTest, fetchTest2 } = createActions({
    FETCH_TEST: async () => {
        try {
            const response = await post('http://localhost:8989/api/test');
            return {
                list: response.data
            };
        } catch (error) {
            console.log(error);
        }
    },
    FETCH_TEST2: async () => {
        try {
            const response = await post('http://localhost:8989/api/test2');
            return {
                list: response.data
            };
        } catch (error) {
            console.log(error);
        }
    }
});