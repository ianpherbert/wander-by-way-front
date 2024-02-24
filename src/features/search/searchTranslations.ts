import { SearchOptions } from "./SearchResult"
import { TranslationLabel, TranslationLabelObject, Languages } from "../../translations/global"

const searchOptionsLabelEn: TranslationLabel<SearchOptions> = {
    airport: "Airport",
    train: "Train Station",
    city: "City",
    port: "Sea Port",
    bus: "Bus Station"
}

const searchOptionsLabelFr: TranslationLabel<SearchOptions> = {
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

export const searchLabels: TranslationLabelObject<{
    searchOptions: {
        from: string;
        startDate: string;
        endDate: string;
        submit: string
    },
    errors: {
        origin: string,
        startDate: string,
        endDate: string
    }
}> = {
    [Languages.EN]: {
        searchOptions: {
            from: "From",
            startDate: "Start date",
            endDate: "End Date",
            submit: "let's go!"
        }, errors: {
            origin: "Select an origin",
            startDate: "Select a date to search from",
            endDate: "Select a date to search to"
        }
    },
    [Languages.FR]: {
        searchOptions: {
            from: "Origin",
            startDate: "Date de début",
            endDate: "Date de fin",
            submit: "Allons-y !"
        },
        errors: {
            origin: "Sélectionnez une origine",
            startDate: "Sélectionnez une date de début de recherche",
            endDate: "Sélectionnez une date de fin de recherche"
        }
    }
}

export const originErrorLabel: TranslationLabelObject<{ origin: string, startDate: string, endDate: string }> = {
    [Languages.EN]: {
        origin: "Select an origin",
        startDate: "Select a date to search from",
        endDate: "Select a date to search to"
    },
    [Languages.FR]: {
        origin: "Sélectionnez une origine",
        startDate: "Sélectionnez une date de début de recherche",
        endDate: "Sélectionnez une date de fin de recherche"
    }
}