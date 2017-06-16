var mockjs = require('mockjs');
module.exports = {
    'POST /api/test': mockjs.mock({
        "result": [{
            key: 1,
            name: 'a'
        }, {
            key: 2,
            name: 'b'
        }, {
            key: 3,
            name: 'c'
        }, {
            key: 4,
            name: 'd'
        }, {
            key: 5,
            name: 'e'
        }, {
            key: 6,
            name: 'f'
        }, {
            key: 7,
            name: 'g'
        }]
    }),
    'POST /api/test2': mockjs.mock({
        "result": [{
            key: 1,
            name: 'a2'
        }, {
            key: 2,
            name: 'b2'
        }, {
            key: 3,
            name: 'c2'
        }, {
            key: 4,
            name: 'd2'
        }, {
            key: 5,
            name: 'e2'
        }, {
            key: 6,
            name: 'f2'
        }, {
            key: 7,
            name: 'g2'
        }]
    })
}