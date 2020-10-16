import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// @ts-ignore
if (module.hot) module.hot.accept();

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
