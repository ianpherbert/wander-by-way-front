import useExploreParams from "../features/explore/hooks/useExploreParams";
import useRouteSearch from "../features/explore/hooks/useRouteSearch";
import { createContext, useCallback, useEffect, useState } from "react";
import { Point } from "../features/common/map/Point";
import { RouteSearchGroup, RouteSearchPlace, RouteSearchResult } from "../features/explore/RouteSearchResult";
import { SearchItem } from "../features/search/SearchResult";
import Explore from "../features/explore/Explore";


type TripPlannerContext = {
    /** Select point on map */
    selectPoint: (point?: Point) => void;
    /**Point selected on map */
    currentPoint?: Point;
    /** The search group that is selected. Corresponds to the selected point */
    selectedSearchGroup?: RouteSearchGroup;
    /** Set search group (and selectedPoint) to null */
    unselectSearchGroup: () => void;
    setSelectedSearchGroup: (group?: RouteSearchGroup) => void;
    currentSearchResult?: RouteSearchResult;
    currentOrigin?: SearchItem;
    /** The places on the current selected route */
    selectedRouteStops: RouteSearchPlace[];
    /** The places on the current selected route */
    setSelectedRouteStops: (places: RouteSearchPlace[]) => void;
}

export const tripPlannerContext = createContext<TripPlannerContext>({} as TripPlannerContext);

export default function TripPlannerPage() {
    const { originId, originType, startDate } = useExploreParams();
    const [currentPoint, setCurrentPoint] = useState<Point>();
    const [selectedSearchGroup, setSelectedSearchGroup] = useState<RouteSearchGroup>();
    const [selectedRouteStops, setSelectedRouteStops] = useState<RouteSearchPlace[]>([]);

    const { origin: currentOrigin, routeQuery: currentSearchQuery } = useRouteSearch(originId, originType, startDate);

    const selectPoint = useCallback((point?: Point) => {
        setCurrentPoint(point);
        const match = point ? currentSearchQuery.data?.destinations.find((it) => String(it.destination.id) === point.id) : undefined;
        setSelectedSearchGroup(match);
    }, [setSelectedSearchGroup, currentSearchQuery])


    const unselectSearchGroup = useCallback(() => {
        setSelectedSearchGroup(undefined);
    }, [setSelectedSearchGroup]);

    useEffect(()=>{
        if(currentSearchQuery.isFetching){
            selectPoint(undefined);
        }
    },[currentSearchQuery])

    return <tripPlannerContext.Provider value={{
        currentPoint,
        selectedSearchGroup,
        selectPoint,
        currentSearchResult: currentSearchQuery?.data,
        currentOrigin,
        unselectSearchGroup,
        setSelectedSearchGroup,
        selectedRouteStops,
        setSelectedRouteStops,
    }}>
        <Explore />
    </tripPlannerContext.Provider>
}