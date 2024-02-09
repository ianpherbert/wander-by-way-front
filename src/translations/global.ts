export enum Languages{
    EN = "EN",
    FR = "FR"
};

export type TranslationLabel<T> = {[key in keyof T] : string};

export type TranslationLabelObject<T> = {[key in Languages] : T}

export const languageLabel: TranslationLabelObject<string> = {
    [Languages.EN]: "English",
    [Languages.FR]: "Français"
}