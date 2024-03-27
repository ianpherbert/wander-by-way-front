import Map from "../common/map/Map";
import { useCallback, useMemo, useState } from "react";
import { mapPointTypeToSearchItemType, searchItemTypeToMapPointType, searchItemTypeToMapPointTypeConnection } from "../common/SearchItemType";
import { useExploreContext } from "./hooks/useExploreContext";
import { MapPointType, Point } from "../common/map/Point";
import { Stack, Switch, Tooltip } from "@mui/material";
import NewSearchDialog from "./NewSearchDialog";
import { RouteSearchPlace } from "./RouteSearchResult";

type RouteSearchMapProps = {
    onLoad: () => void;
}

export default function ExploreMap({ onLoad }: RouteSearchMapProps) {
    const [autoZoom, setAutoZoom] = useState(true);
    const [selectedStop, setSelectedStop] = useState<Partial<RouteSearchPlace>>();

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
        setSelectedSearchGroup(match);
    }, [setSelectedSearchGroup, currentSearchResult]);

    const memoSelectedPoint = useMemo(() => {
        const allPoints = [...selectedRoutePoints, ...currentSearchPoints];
        const match = selectedSearchGroup ? allPoints.find(it => it.id === String(selectedSearchGroup.destination.id)) : undefined;
        return match;
    }, [selectedSearchGroup, selectedRoutePoints, currentSearchPoints,])

    const unselectSelectedStop = useCallback(() => setSelectedStop(undefined), [setSelectedStop]);

    const selectStop = useCallback((point?: Point) => {
        if (!point) {
            setSelectedStop(undefined);
            return;
        }
        const { id, label: name, longitude, latitude, type } = point;
        setSelectedStop({
            id: parseInt(id),
            name,
            longitude,
            latitude,
            type: mapPointTypeToSearchItemType[type],
        })
    }, [setSelectedStop])

    return (
        <>
            <NewSearchDialog stop={selectedStop} onClose={unselectSelectedStop} />
            <Map
                searchPoints={currentSearchPoints}
                routePoints={selectedRoutePoints}
                onSelectPoint={selectPoint}
                selectedPoint={memoSelectedPoint}
                flex={1}
                onLoad={onLoad}
                autoZoom={autoZoom}
                onPointHover={setHoveredPoint}
                markers={currentOriginPoint ? [currentOriginPoint] : undefined}
                onRoutePointLayerClick={selectStop}
            />
            <Stack position="absolute" bottom={0} right={0}>
                <Tooltip title="toggle autozoom">
                    <Switch color="success" checked={autoZoom} onChange={(_, checked) => setAutoZoom(checked)} />
                </Tooltip>
            </Stack>
        </>
    )
}