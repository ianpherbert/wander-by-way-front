import Map from "../common/map/Map";
import { useCallback, useEffect, useMemo, useState } from "react";
import { searchItemTypeToMapPointType, searchItemTypeToMapPointTypeConnection } from "../common/SearchItemType";
import { useExploreContext } from "./hooks/useExploreContext";
import { MapPointType, Point } from "../common/map/Point";

type RouteSearchMapProps = {
    onLoad: () => void;
}

export default function ExploreMap({ onLoad }: RouteSearchMapProps) {
    const [selectedPoint, setSelectedPoint] = useState<Point>()
    const { currentSearchResult, selectedRouteStops: selectedRouteStops, setSelectedSearchGroup, selectedSearchGroup, setHoveredPoint } = useExploreContext();

    const currentSearchPoints: Point[] = useMemo(() =>
        currentSearchResult?.destinations.map(({ destination }) => ({
            id: String(destination.id),
            longitude: destination.longitude,
            latitude: destination.latitude,
            type: searchItemTypeToMapPointType[destination.type],
            label: destination.name,
            selectionnable: true
        })) ?? [], [currentSearchResult]);

    const currentOriginPoint: Point | undefined = useMemo(() => currentSearchResult?.origin ? ({
        id: String(currentSearchResult?.origin.id),
        longitude: currentSearchResult?.origin.longitude,
        latitude: currentSearchResult?.origin.latitude,
        type: MapPointType.ORIGIN,
        label: currentSearchResult?.origin.name,
        selectionnable: false
    }) : undefined, [currentSearchResult])

    const selectedRoutePoints = useMemo(() => selectedRouteStops.map(({ id, longitude, latitude, type, name }) => ({
        id: String(id),
        longitude: longitude,
        latitude: latitude,
        type: searchItemTypeToMapPointTypeConnection[type],
        label: name,
        selectionnable: false
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
            searchPoints={currentSearchPoints.concat(currentOriginPoint ?? [])}
            routePoints={selectedRoutePoints}
            onSelectPoint={selectPoint}
            selectedPoint={selectedPoint}
            flex={1}
            onLoad={onLoad}
            autoZoom={true}
            onPointHover={setHoveredPoint}
        />
    )
}