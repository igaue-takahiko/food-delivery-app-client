import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import 'swiper/swiper.min.css'

import store from './redux/store/store';
import { themeFile } from './utils/theme';

let theme = createMuiTheme(themeFile)
theme = responsiveFontSizes(theme)
const helmetContext = {};

ReactDOM.render(
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
