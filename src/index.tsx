import React from 'react';
import ReactDOM from 'react-dom/client';
import firebase from './firebase';

import App from './components/App';
console.log('firebase: ', firebase);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

