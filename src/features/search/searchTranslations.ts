import { SearchOptions } from "./SearchResult"
import { TranslationLabel, TranslationLabelObject, Languages } from "../../translations/global"

const searchOptionsLabelEn: TranslationLabel<SearchOptions> = {
    airport: "Airport",
    train: "Train Station", 
    city: "City", 
    port: "Sea Port", 
    bus: "Bus Station"
}

const searchOptionsLabelFr: TranslationLabel<SearchOptions>= {
    airport: "Aéroport",
    train: "Gare", 
    city: "Ville", 
    port: "Port", 
    bus: "Gare Routière"
}


export const searchOptionLabels: TranslationLabelObject<TranslationLabel<SearchOptions>> = {
    [Languages.EN]: searchOptionsLabelEn,
    [Languages.FR]: searchOptionsLabelFr
}

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

export const originErrorLabel: TranslationLabelObject<string> = {
    [Languages.EN]: "Select an origin",
    [Languages.FR]: "Veuillez selectionner un point de départ"
}