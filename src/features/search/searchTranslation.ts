import { Languages, TranslationLabelObject } from "../../translations/global";

type InputLabels = {
    to: string;
    from: string;
    submit: string;
}

const inputLabelsEn = {
    to: "To",
    from: "From",
    submit: "Let's go!"
}

const inputLabelsFr = {
    to: "Déstination",
    from: "Origin",
    submit: "Allons-y !"
}


export const inputLabels: TranslationLabelObject<InputLabels> = {
    [Languages.EN]: inputLabelsEn,
    [Languages.FR]: inputLabelsFr
}