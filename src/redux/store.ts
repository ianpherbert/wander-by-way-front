import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import rest from './rest';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rest.middleware) 
});

export default store; 