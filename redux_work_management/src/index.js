import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import Provider từ react-redux
import store from './store'; // Import store từ file store.js
import App from './App';

ReactDOM.render(
  <Provider store={store}> {/* Bọc ứng dụng trong Provider để sử dụng Redux */}
    <App />
  </Provider>,
  document.getElementById('root')
);
