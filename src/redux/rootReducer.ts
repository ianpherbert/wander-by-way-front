import {combineReducers} from 'redux';
import {appSlice, AppState} from "./appSlice";
import rest from './rest';
import { unsplashRest } from '../features/common/unsplash/unsplashRest';


const rootReducer = combineReducers({
    appSlice: appSlice.reducer,
    [rest.reducerPath]: rest.reducer,
    [unsplashRest.reducerPath] : unsplashRest.reducer
});

declare module "react-redux" {
    interface RootState {
        appSlice: AppState,
        [rest.reducerPath]: typeof rest.reducer,
        [unsplashRest.reducerPath] : typeof unsplashRest.reducer
    }
}

export default rootReducer;