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

export function routeSearchRouteToSimpleRouteStopList(route: RouteSearchRoute){
    const origin: RouteStop = {
        stop: route.origin,
        arrival: null,
        plannedArrival: null,
        arrivalDelay: null,
        arrivalPlatform: null,
        plannedDeparture: route.departureTime,
        departureDelay: null,
        dbId: route.origin.dbId
    };
    const destination: RouteStop = {
        stop: route.destination,
        arrival: route.arrivalTime,
        plannedArrival: route.arrivalTime,
        arrivalDelay: null,
        arrivalPlatform: null,
        plannedDeparture: null,
        departureDelay: null,
        dbId: route.origin.dbId
    }
    return [origin, destination]
}

export type RouteSearchResult = {
    routeCount: number;
    destinationCount: number;
    destinations: RouteSearchGroup[];
    origin: RouteSearchPlace;
}

export type RouteStop = {
    stop: RouteSearchPlace;
    arrival: string | null;
    plannedArrival: string | null;
    arrivalDelay: string | null;
    arrivalPlatform: string | null;
    plannedDeparture: string | null;
    departureDelay: string | null;
    dbId: string  | null;
}

export type Route = {
    origin: RouteSearchPlace;
    destination: RouteSearchPlace;
    departure: string;
    arrival: string;
    duration: number;
    routeId: string;
    type: RouteSearchRouteType;
    stops: RouteStop[];
}