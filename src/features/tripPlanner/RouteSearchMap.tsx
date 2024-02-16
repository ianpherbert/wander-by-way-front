import Map from "../common/map/Map";
import { useMemo } from "react";
import { searchItemTypeToMapPointType } from "../common/SearchItemType";
import { useTripPlannerContext } from "./useTripPlannerContext";
import { Point } from "../common/map/Point";

export default function RouteSearchMap() {
    const { currentSearchResult, selectPoint } = useTripPlannerContext();
    const currentSearchPoints: Point[] = useMemo(() =>
        currentSearchResult?.destinations.map(({ destination }) => ({
            id: String(destination.id),
            longitude: destination.longitude,
            latitude: destination.latitude,
            type: searchItemTypeToMapPointType[destination.type],
            label: destination.name
        })) ?? []
        , [currentSearchResult])
    return (
        <Map points={currentSearchPoints} onSelectPoint={selectPoint} flex={1} />
    )
}