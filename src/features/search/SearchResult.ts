import { CountryCode } from "../../translations/countries";

export type SearchOptions = {
    airport: boolean,
    train: boolean,
    city: boolean,
    port: boolean,
    bus: boolean,
}

export enum SearchItemType {
    AIRPORT = "AIRPORT",
    PORT = "PORT",
    BUS_STATION = "BUS_STATION",
    CITY = "CITY",
    TRAIN_STATION = "TRAIN_STATION"
}

export type SearchItem = {
    id: number;
    name: string,
    slug: string,
    type: SearchItemType,
    country: CountryCode,
    children: SearchItem[]
}

export type SearchResult = {
    count: number,
    options: SearchOptions,
    results: SearchItem[]
}