import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App'
import { GuideContextProvider } from './components/Context/GuideContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GuideContextProvider>
      <App />
    </GuideContextProvider>
  </React.StrictMode>
);
