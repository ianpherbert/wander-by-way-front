import {combineReducers} from 'redux';
import {appSlice, AppState} from "./appSlice";


const rootReducer = combineReducers({
    appSlice: appSlice.reducer,
});

declare module "react-redux" {
    interface RootState {
        appSlice: AppState,
    }
}

export default rootReducer;