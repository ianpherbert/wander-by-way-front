export interface PointInfo {
    icon: string;
    scale: number;
    body?: string;
}

export interface Point {
    id: string;
    longitude: number;
    latitude: number;
    type: MapPointType;
    label: string;
    match?: boolean
}

export enum MapPointType {
    ORIGIN = "ORIGIN",
    DESTINATION = "DESTINATION",
    INTERMEDIATE = "INTERMEDIATE",
    PORT = "PORT",
    AIRPORT = "AIRPORT",
    BUS_STATION = "BUS_STATION",
    TRAIN_STATION = "TRAIN_STATION",
    PORT_CONNECTION = "PORT_CONNECTION",
    AIRPORT_CONNECTION = "AIRPORT_CONNECTION",
    BUS_STATION_CONNECTION = "BUS_STATION_CONNECTION",
    TRAIN_STATION_CONNECTION = "TRAIN_STATION_CONNECTION",
    SEARCH_ITEM = "SEARCH_ITEM",
    SEARCH_ITEM_CONNECTION = "SEARCH_ITEM_CONNECTION"
}
