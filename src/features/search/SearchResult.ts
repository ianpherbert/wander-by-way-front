import { CountryCode } from "../../translations/countries";
import { SearchItemType } from "../common/SearchItemType";

export type SearchOptions = {
    airport: boolean,
    train: boolean,
    city: boolean,
    // port: boolean,
    // bus: boolean,
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