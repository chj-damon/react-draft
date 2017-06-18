import './index.html';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import MyEditor from './components/MyEditor';
import MyEntity from './components/entity/MyEntity';

render(
    <Provider store={store}>
        <MyEntity />
    </Provider>,
    document.getElementById('app')
);