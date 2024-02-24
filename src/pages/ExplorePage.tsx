import useExploreParams from "../features/explore/hooks/useExploreParams";
import useRouteSearch from "../features/explore/hooks/useRouteSearch";
import { createContext, useCallback, useMemo, useState } from "react";
import { Point } from "../features/common/map/Point";
import { RouteSearchGroup, RouteSearchPlace, RouteSearchResult, RouteSearchRoute } from "../features/explore/RouteSearchResult";
import { SearchItem } from "../features/search/SearchResult";
import Explore from "../features/explore/Explore";


type TripPlannerContext = {
    selectPoint: (point?: Point) => void;
    currentPoint?: Point;
    trip: RouteSearchRoute[];
    selectedSearchGroup?: RouteSearchGroup;
    unselectSearchGroup: () => void;
    setSelectedSearchGroup: (group?: RouteSearchGroup) => void;
    addToTrip: (route: RouteSearchRoute) => void;
    currentSearchResult?: RouteSearchResult;
    currentOrigin?: SearchItem;
    listOpen: boolean;
    setListOpen: (value: boolean) => void;
    selectedRouteStops: RouteSearchPlace[];
    setSelectedRouteStops: (places: RouteSearchPlace[]) => void;
}

export const tripPlannerContext = createContext<TripPlannerContext>({} as TripPlannerContext);

export default function TripPlannerPage() {
    const { originId, originType } = useExploreParams();
    const [currentPoint, setCurrentPoint] = useState<Point>();
    const [trip, setTrip] = useState<RouteSearchRoute[]>([]);
    const [selectedSearchGroup, setSelectedSearchGroup] = useState<RouteSearchGroup>();
    const [searchFrom, setSearchFrom] = useState<RouteSearchPlace>();
    const [listOpen, setListOpen] = useState(true);
    const [selectedRouteStops, setSelectedRouteStops] = useState<RouteSearchPlace[]>([]);

    const currentSearch = useMemo(() =>
        searchFrom ?
            { id: String(searchFrom?.id), type: searchFrom?.type } :
            { id: originId, type: originType }
        , [originId, originType, currentPoint]
    );

    const { origin: currentOrigin, routeQuery: currentSearchQuery } = useRouteSearch(currentSearch.id, currentSearch.type);



    const selectPoint = useCallback((point?: Point) => {
        setCurrentPoint(point);
        const match = point ? currentSearchQuery.data?.destinations.find((it) => String(it.destination.id) === point.id) : undefined;
        setSelectedSearchGroup(match);
    }, [setSelectedSearchGroup, currentSearchQuery])

    const addToTrip = useCallback((route: RouteSearchRoute) => {
        setSearchFrom(route.destination);
        setTrip(it => [...it, route]);
    }, [setTrip])

    const unselectSearchGroup = useCallback(() => {
        setSelectedSearchGroup(undefined);
    }, [setSelectedSearchGroup])

    return <tripPlannerContext.Provider value={{
        currentPoint,
        trip,
        selectedSearchGroup,
        addToTrip,
        selectPoint,
        currentSearchResult: currentSearchQuery?.data,
        currentOrigin,
        unselectSearchGroup,
        listOpen,
        setListOpen,
        setSelectedSearchGroup,
        selectedRouteStops,
        setSelectedRouteStops,
    }}>
        <Explore />
    </tripPlannerContext.Provider>
}