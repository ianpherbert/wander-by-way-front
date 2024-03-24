import { MapPointType } from "./map/Point"

export enum SearchItemType {
    AIRPORT = "AIRPORT",
    PORT = "PORT",
    BUS_STATION = "BUS_STATION",
    CITY = "CITY",
    TRAIN_STATION = "TRAIN_STATION"
}

export const searchItemTypeToMapPointType: { [key in SearchItemType]: MapPointType } = {
    [SearchItemType.AIRPORT]: MapPointType.AIRPORT,
    [SearchItemType.BUS_STATION]: MapPointType.BUS_STATION,
    [SearchItemType.CITY]: MapPointType.SEARCH_ITEM,
    [SearchItemType.TRAIN_STATION]: MapPointType.TRAIN_STATION,
    [SearchItemType.PORT]: MapPointType.PORT,
}


export const searchItemTypeToMapPointTypeConnection: { [key in SearchItemType]: MapPointType } = {
    [SearchItemType.AIRPORT]: MapPointType.AIRPORT_CONNECTION,
    [SearchItemType.BUS_STATION]: MapPointType.BUS_STATION_CONNECTION,
    [SearchItemType.CITY]: MapPointType.SEARCH_ITEM_CONNECTION,
    [SearchItemType.TRAIN_STATION]: MapPointType.TRAIN_STATION_CONNECTION,
    [SearchItemType.PORT]: MapPointType.PORT_CONNECTION,
}

export const mapPointTypeToSearchItemType: { [key in Partial<MapPointType>]: SearchItemType } = {
    [MapPointType.AIRPORT]: SearchItemType.AIRPORT,
    [MapPointType.BUS_STATION]: SearchItemType.BUS_STATION,
    [MapPointType.SEARCH_ITEM]: SearchItemType.CITY,
    [MapPointType.TRAIN_STATION]: SearchItemType.TRAIN_STATION,
    [MapPointType.PORT]: SearchItemType.PORT,
    [MapPointType.ORIGIN]: SearchItemType.CITY,
    [MapPointType.DESTINATION]: SearchItemType.CITY,
    [MapPointType.INTERMEDIATE]: SearchItemType.CITY,
    [MapPointType.PORT_CONNECTION]: SearchItemType.PORT,
    [MapPointType.AIRPORT_CONNECTION]: SearchItemType.AIRPORT,
    [MapPointType.BUS_STATION_CONNECTION]: SearchItemType.BUS_STATION,
    [MapPointType.TRAIN_STATION_CONNECTION]: SearchItemType.TRAIN_STATION,
    [MapPointType.SEARCH_ITEM_CONNECTION]: SearchItemType.CITY
}