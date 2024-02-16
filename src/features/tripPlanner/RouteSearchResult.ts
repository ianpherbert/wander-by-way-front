import { SearchItemType } from "../common/SearchItemType"

export type RouteSearchPlace = {
    name: string,
    id: number,
    type: SearchItemType,
    longitude: number,
    latitude: number,
    country: string,
    iata: string | null,
    dbId: string | null
}

export type RouteSearchGroup = {
    destination: RouteSearchPlace;
    averageTime: number;
    routes: RouteSearchRoute[];
}

export enum RouteSearchRouteType {
    TRAIN = "TRAIN",
    PLANE = "PLANE",
    BUS = "BUS",
    FERRY = "FERRY",
    OTHER = "OTHER"
}

export type RouteSearchRoute = {
    type: RouteSearchRouteType;
    origin: RouteSearchPlace;
    destination: RouteSearchPlace;
    durationMinutes: number;
    destinationIata: string | null;
    destinationDbId: string | null;
}

export type RouteSearchResult = {
    routeCount: number;
    destinationCount: number;
    destinations: RouteSearchGroup[];
    origin: RouteSearchPlace;
}