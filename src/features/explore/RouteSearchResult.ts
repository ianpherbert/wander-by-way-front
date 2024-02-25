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
    departureTime: string,
    arrivalTime: string,
    carriers: string[]
    routeId: string,
}

export type RouteSearchResult = {
    routeCount: number;
    destinationCount: number;
    destinations: RouteSearchGroup[];
    origin: RouteSearchPlace;
}

export type RouteStop = {
    stop: RouteSearchPlace,
    arrival: string | null,
    plannedArrival: string | null,
    arrivalDelay: string | null,
    arrivalPlatform: string | null,
    plannedDeparture: string,
    departureDelay: string | null,
    dbId: string
}

export type Route = {
    origin: RouteSearchPlace,
    destination: RouteSearchPlace,
    departure: string,
    arrival: string,
    duration: number,
    routeId: string,
    type: RouteSearchRouteType,
    stops: RouteStop[]
}