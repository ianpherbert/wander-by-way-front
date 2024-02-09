import {combineReducers} from 'redux';
import {appSlice, AppState} from "./appSlice";
import rest from './rest';


const rootReducer = combineReducers({
    appSlice: appSlice.reducer,
    [rest.reducerPath]: rest.reducer,
});

declare module "react-redux" {
    interface RootState {
        appSlice: AppState,
        [rest.reducerPath]: typeof rest.reducer,
    }
}

export default rootReducer;