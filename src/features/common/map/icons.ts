import { MapPointType } from "./Point";

type MapIcons = {
    [key in MapPointType]: {name: string, path: string, scale: number}
}

export const mapIcons: MapIcons = {
    ORIGIN: {
        name: "home-point", path: "home.png", scale: 4
    }, SEARCH_ITEM: {
        name: "search",
        path: "search-point.png",  scale: 1
    }, DESTINATION: {
        name: "destination-point", path: "destination-point.png",  scale: 1
    }, INTERMEDIATE: {
        name: "intermediate",
        path: "intermediate-point.png", scale: 1
    }, SEARCH_ITEM_CONNECTION: {
        name: "connection-point", path: "connection-point.png", scale: 1 
    }, AIRPORT: {
        name: "plane-point", path: "plane-point.png",scale: 1
    },
    TRAIN_STATION: {
        name: "train-point", path: "train-point.png", scale: 1 
    },
    BUS_STATION: {
        name: "bus-point", path: "bus-point.png", scale: 1
    },
    PORT: {
        name: "ferry-point", path: "ferry-point.png", scale: 1 
    }, AIRPORT_CONNECTION: {
        name: "plane-point-connection", path: "plane-point-connection.png", scale: 1
    },
    TRAIN_STATION_CONNECTION: {
        name: "train-point-connection", path: "train-point-connection.png", scale: 1
    },
    BUS_STATION_CONNECTION: {
        name: "bus-point-connection", path: "bus-point-connection.png", scale: 1
    },
    PORT_CONNECTION: {
        name: "ferry-point-connection", path: "ferry-point-connection.png", scale: 1
    }
};