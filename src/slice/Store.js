import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../languageSlice';

const store = configureStore({
  reducer: rootReducer,
});

export default store;