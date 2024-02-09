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