import { useMemo } from "react"
import { SearchItemType } from "../../common/SearchItemType"
import { skipToken } from "@reduxjs/toolkit/query"
import { useSearchFromPointQuery } from "../exploreRest"
import { useSearchFromIdQuery } from "../../search/SearchRest"

export default function useRouteSearch(placeId?: string, placeType?: SearchItemType, startDate?: string) {

    const searchParams = useMemo(() => (placeId && placeType && startDate ? {
        placeId: placeId,
        placeType: placeType,
        startDate,
    } : skipToken), [placeId, placeType, startDate]);

    const originParams = useMemo(() => (placeId && placeType ? {
        placeId: placeId,
        placeType: placeType,
    } : skipToken), [placeId, placeType]);

    const originQuery = useSearchFromIdQuery(originParams);
    const routeQuery = useSearchFromPointQuery(searchParams, { refetchOnMountOrArgChange: true, });


    return useMemo(() => ({ routeQuery, originQuery }), [originQuery, routeQuery])
}