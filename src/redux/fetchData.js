import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformResponse: [function (data) {
        return {
            result: JSON.parse(data).result
        };
    }]
});

export default function post(url, params) {
    return instance.post(`${url}`, qs.stringify(params));
}