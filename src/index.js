import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import ThemeAppProvider from './Components/AppThemeProvider/ThemeProvider';
import AuthProvider from './utils/AuthContext';
import { OpenProvider } from './utils/OpenContext';
import { ProductProvider } from './utils/ProductContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <OpenProvider>
  <AuthProvider>

  <ThemeAppProvider>
  
    <ProductProvider><App/></ProductProvider>
</ThemeAppProvider> 
   
  </AuthProvider>
  </OpenProvider>
  

    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
