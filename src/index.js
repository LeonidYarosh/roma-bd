import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/configureStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
import App from './App';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider key="themeProvider">
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'),
);