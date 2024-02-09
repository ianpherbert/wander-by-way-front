import { SearchOptions } from "../features/search/SearchResult"
import { TranslationLabel, TranslationLabelObject, Languages } from "./global"

const SearchOptionsLabelEn: TranslationLabel<SearchOptions> = {
    airport: "Airport",
    train: "Train Station", 
    city: "City", 
    port: "Sea Port", 
    bus: "Bus Station"
}

const SearchOptionsLabelFr: TranslationLabel<SearchOptions>= {
    airport: "Aéroport",
    train: "Gare", 
    city: "Ville", 
    port: "Port", 
    bus: "Gare Routière"
}


export const SearchOptionLabels: TranslationLabelObject<TranslationLabel<SearchOptions>> = {
    [Languages.EN]: SearchOptionsLabelEn,
    [Languages.FR]: SearchOptionsLabelFr
}