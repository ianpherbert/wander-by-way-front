import { useMemo } from "react"
import { SearchItemType } from "../common/SearchItemType"
import { skipToken } from "@reduxjs/toolkit/query"
import { useSearchFromPointQuery } from "./tripPlannerRest"
import { useSearchFromIdQuery } from "../search/SearchRest"

export default function useRouteSearch(placeId?: string, placeType?: SearchItemType){

    const searchParams = useMemo(() => (placeId && placeType ? {
        placeId: placeId,
        placeType: placeType
    } : skipToken), [placeId, placeType]);

    const {data} = useSearchFromIdQuery(searchParams);
    const routeQuery = useSearchFromPointQuery(searchParams);

    return useMemo(()=>({origin: data, routeQuery}), [data, routeQuery])
}