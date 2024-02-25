import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import rest from './rest';
import { unsplashRest } from '../features/common/unsplash/unsplashRest';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rest.middleware) .concat(unsplashRest.middleware)
});

export default store; 