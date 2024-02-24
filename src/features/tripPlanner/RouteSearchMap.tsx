import Map from "../common/map/Map";
import { useMemo } from "react";
import { searchItemTypeToMapPointType, searchItemTypeToMapPointTypeConnection } from "../common/SearchItemType";
import { useTripPlannerContext } from "./hooks/useTripPlannerContext";
import { Point } from "../common/map/Point";

type RouteSearchMapProps = {
    onLoad: () => void;
}

export default function RouteSearchMap({ onLoad }: RouteSearchMapProps) {
    const { currentSearchResult, selectPoint, selectedRouteStops: selectedRouteStops } = useTripPlannerContext();
    const currentSearchPoints: Point[] = useMemo(() =>
        currentSearchResult?.destinations.map(({ destination }) => ({
            id: String(destination.id),
            longitude: destination.longitude,
            latitude: destination.latitude,
            type: searchItemTypeToMapPointType[destination.type],
            label: destination.name
        })) ?? []
        , [currentSearchResult])
    const selectedRoutePoints = useMemo(() => selectedRouteStops.map(({ id, longitude, latitude, type, name }) => ({
        id: String(id),
        longitude: longitude,
        latitude: latitude,
        type: searchItemTypeToMapPointTypeConnection[type],
        label: name
    })), [selectedRouteStops]);

    return (
        <Map searchPoints={currentSearchPoints} routePoints={selectedRoutePoints} onSelectPoint={selectPoint} flex={1} onLoad={onLoad} />
    )
}