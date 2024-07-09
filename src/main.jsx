import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App'
import './index.css'
import { Provider } from 'react-redux';
// import store from "./slice/Store";
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "src/store/languageSlice.jsx";

// React Router
import { RouterProvider } from "react-router-dom";
import rootRouter from "routes/root"



/* i18next localization */
import "./i18n";


const store = configureStore({
  reducer: rootReducer,
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