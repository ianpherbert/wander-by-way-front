import Map from "../common/map/Map";
import { useCallback, useEffect, useMemo, useState } from "react";
import { searchItemTypeToMapPointType, searchItemTypeToMapPointTypeConnection } from "../common/SearchItemType";
import { useTripPlannerContext } from "./hooks/useTripPlannerContext";
import { Point } from "../common/map/Point";

type RouteSearchMapProps = {
    onLoad: () => void;
}

export default function ExploreMap({ onLoad }: RouteSearchMapProps) {
    const [selectedPoint, setSelectedPoint] = useState<Point>()
    const { currentSearchResult, selectedRouteStops: selectedRouteStops, setSelectedSearchGroup, selectedSearchGroup } = useTripPlannerContext();

    const currentSearchPoints: Point[] = useMemo(() =>
        currentSearchResult?.destinations.map(({ destination }) => ({
            id: String(destination.id),
            longitude: destination.longitude,
            latitude: destination.latitude,
            type: searchItemTypeToMapPointType[destination.type],
            label: destination.name
        })) ?? [], [currentSearchResult]);

    const selectedRoutePoints = useMemo(() => selectedRouteStops.map(({ id, longitude, latitude, type, name }) => ({
        id: String(id),
        longitude: longitude,
        latitude: latitude,
        type: searchItemTypeToMapPointTypeConnection[type],
        label: name
    })), [selectedRouteStops]);

    const selectPoint = useCallback((point?: Point) => {
        const match = point ? currentSearchResult?.destinations.find((it) => String(it.destination.id) === point.id) : undefined;
        setSelectedPoint(point);
        setSelectedSearchGroup(match);
    }, [setSelectedPoint, setSelectedSearchGroup, currentSearchResult]);

    useEffect(() => {
        const allPoints = [...selectedRoutePoints, ...currentSearchPoints];
        const match = selectedSearchGroup ? allPoints.find(it => it.id === String(selectedSearchGroup.destination.id)) : undefined;
        setSelectedPoint(match);
    }, [selectedSearchGroup, selectedRoutePoints, currentSearchPoints, setSelectedPoint])

    return (
        <Map
            searchPoints={currentSearchPoints}
            routePoints={selectedRoutePoints}
            onSelectPoint={selectPoint}
            selectedPoint={selectedPoint}
            flex={1}
            onLoad={onLoad}
            autoZoom={true}
        />
    )
}