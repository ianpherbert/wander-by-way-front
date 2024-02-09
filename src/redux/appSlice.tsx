import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState, useSelector } from "react-redux";
import { Languages } from "../translations/global";

export interface AppState {
    language: Languages
}

const initialState: AppState = {
    language: Languages.EN
};

export const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setLanguage: (state: AppState, action: PayloadAction<Languages>) => {
            state.language = action.payload;
        },
    }
});

export const {setLanguage} = appSlice.actions;

export const useAppLanguage = () => {
    return useSelector((state: RootState)=>{
        return state.appSlice.language;
    });
};