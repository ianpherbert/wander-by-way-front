type SearchOptions = {
    airport: boolean,
    train: boolean,
    city: boolean,
    port: boolean,
    bus: boolean,
}

enum SearchItemType {
    AIRPORT = "AIRPORT",
    PORT = "PORT",
    BUS_STATION = "BUS_STATION",
    CITY = "CITY",
    TRAIN_STATION = "TRAIN_STATION"
}

type SearchItem = {
    id: number;
    name: string,
    slug: string,
    type: SearchItemType,
    country: string,
    children: SearchItem[]
}

type SearchResult = {
    count: number,
    options: SearchOptions,
    results: SearchItem[]
}