import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState, useSelector } from "react-redux";
import { Languages } from "../translations/global";
import { getLanguage } from "../utils/languageUtils";
import { LocalStorageItem, writeLocalStorageItem } from "../assets/localStorage";

export interface AppState {
    language: Languages
}

const initialState: AppState = {
    language: getLanguage()
};

export const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setLanguage: (state: AppState, action: PayloadAction<Languages>) => {
            writeLocalStorageItem(LocalStorageItem.LANGUAGE_PREFERENCE, action.payload);
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