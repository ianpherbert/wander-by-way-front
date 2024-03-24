import useExploreParams from "../features/explore/hooks/useExploreParams";
import useRouteSearch from "../features/explore/hooks/useRouteSearch";
import { createContext, useCallback, useState } from "react";
import { RouteSearchGroup, RouteSearchPlace, RouteSearchResult } from "../features/explore/RouteSearchResult";
import { SearchItem } from "../features/search/SearchResult";
import Explore from "../features/explore/Explore";
import { PointHover } from "../features/common/map/Map";


type ExploreContext = {
    /** The search group that is selected. Corresponds to the selected point */
    selectedSearchGroup?: RouteSearchGroup;
    /** Set search group (and selectedPoint) to null */
    unselectSearchGroup: () => void;
    setSelectedSearchGroup: (group?: RouteSearchGroup) => void;
    currentSearchResult?: RouteSearchResult;
    currentSearchQueryFetching: boolean;
    currentOrigin?: SearchItem;
    currentOriginQueryFetching: boolean;
    /** The places on the current selected route */
    selectedRouteStops: RouteSearchPlace[];
    /** The places on the current selected route */
    setSelectedRouteStops: (places: RouteSearchPlace[]) => void;
    hoveredPoint?: PointHover;
    setHoveredPoint: (options?: PointHover) => void;
    
}

export const exploreContext = createContext<ExploreContext>({} as ExploreContext);

export default function ExplorePage() {
    const { originId, originType, startDate } = useExploreParams();
    const [selectedSearchGroup, setSelectedSearchGroup] = useState<RouteSearchGroup>();
    const [selectedRouteStops, setSelectedRouteStops] = useState<RouteSearchPlace[]>([]);
    const [hoveredPoint, setHoveredPoint] = useState<PointHover>();

    const { originQuery, routeQuery: currentSearchQuery } = useRouteSearch(originId, originType, startDate);

    const unselectSearchGroup = useCallback(() => {
        handleSetSelecteSearchGroup(undefined);
    }, [setSelectedSearchGroup]);

    const handleSetSelecteSearchGroup = useCallback((group?: RouteSearchGroup) => {
        setSelectedRouteStops([]);
        setSelectedSearchGroup(group)
    },[setSelectedSearchGroup, setSelectedRouteStops])

    return <exploreContext.Provider value={{
        selectedSearchGroup,
        currentSearchResult: Boolean(currentSearchQuery?.isFetching) ? undefined : currentSearchQuery?.data,
        currentSearchQueryFetching: Boolean(currentSearchQuery?.isFetching),
        currentOrigin: Boolean(originQuery?.isFetching) ? undefined : originQuery?.data,
        currentOriginQueryFetching: Boolean(originQuery?.isFetching), 
        unselectSearchGroup,
        setSelectedSearchGroup: handleSetSelecteSearchGroup,
        selectedRouteStops,
        setSelectedRouteStops,
        hoveredPoint,
        setHoveredPoint
    }}>
        <Explore />
    </exploreContext.Provider>
}