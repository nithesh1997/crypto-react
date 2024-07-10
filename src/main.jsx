import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App'
import './index.css'
import { Provider } from 'react-redux';
// import store from "./slice/Store";
import { configureStore } from '@reduxjs/toolkit';
// import langReducer from "store/languageSlice";
import languageSlice from './store/languageSlice';
import userSlice from 'store/userSlice';

// React Router
import { RouterProvider } from "react-router-dom";
import rootRouter from "routes/root"



/* i18next localization */
import "./i18n";



/* Add Buffer Polyfills */
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;


const store = configureStore({
  reducer: {
    language:languageSlice,
    user:userSlice
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
    <RouterProvider router={rootRouter}>
    <App />
    </RouterProvider>
    </Provider>
  </React.StrictMode>,
)