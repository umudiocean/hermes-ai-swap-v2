import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Force CSS reload on development
if (process.env.NODE_ENV === 'development') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/index.css?v=' + Date.now();
  document.head.appendChild(link);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 