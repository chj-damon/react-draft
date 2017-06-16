import './index.html';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import MyEditor from './components/MyEditor';
import store from './redux/store';

render(
    <Provider store={store}>
        <MyEditor />
    </Provider>,
    document.getElementById('app')
);