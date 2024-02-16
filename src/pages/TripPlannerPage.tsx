import { Box, Stack } from "@mui/material";
import useTripParams from "../features/tripPlanner/useTripParams";
import useRouteSearch from "../features/tripPlanner/useRouteSearch";
import { useCallback, useMemo, useState } from "react";
import Map from "../features/common/map/Map";
import { Point } from "../features/common/map/Point";
import { mapPointTypeToSearchItemType, searchItemTypeToMapPointType } from "../features/common/SearchItemType";
import { RouteSearchGroup } from "../features/tripPlanner/RouteSearchResult";

export default function TripPlannerPage() {
    const { originId, originType, destinationId, destinationType } = useTripParams();
    const [currentPoint, setCurrentPoint] = useState<Point>();
    const [trip, setTrip] = useState<Point[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<RouteSearchGroup>();

    const currentSearch = useMemo(() =>
        currentPoint ?
            { id: currentPoint.id, type: mapPointTypeToSearchItemType[currentPoint.type] } :
            { id: originId, type: originType }
        , [originId, originType, currentPoint]
    );

    const { origin: currentOrigin, routeQuery: currentSearchQuery } = useRouteSearch(currentSearch.id, currentSearch.type);
    // const { origin: destination, routeQuery: destinationRouteQuery } = useRouteSearch(destinationId, destinationType)

    const currentSearchPoints: Point[] = useMemo(() =>
        currentSearchQuery.data?.destinations.map(({ destination }) => ({
            id: String(destination.id),
            longitude: destination.longitude,
            latitude: destination.latitude,
            type: searchItemTypeToMapPointType[destination.type],
            label: destination.name
        })) ?? []
        , [currentSearchQuery])

    const selectPoint = useCallback((point?: Point) => {
        const match = point ? currentSearchQuery.data?.destinations.find((it) => String(it.destination.id) === point.id) : undefined;
        setSelectedPlace(match);
    }, [setSelectedPlace, currentSearchQuery])

    return <Stack direction="row">
        <h2>{currentOrigin?.name}</h2>
        <Map height={400} width={400} points={currentSearchPoints} onSelectPoint={selectPoint} />
        <Stack>
            <h2>{selectedPlace?.destination.name}</h2>
            <ul>
                {selectedPlace?.routes.map(it => <li>{it.durationMinutes}</li>)}
            </ul>
        </Stack>

    </Stack>
}