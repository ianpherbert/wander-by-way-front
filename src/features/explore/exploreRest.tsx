import rest from "../../redux/rest";
import { SearchItemType } from "../common/SearchItemType";
import { Route, RouteSearchResult } from "./RouteSearchResult";

interface SearchParams {
    placeId: string;
    placeType: SearchItemType;
    startDate: string;
}

interface RouteParams {
  routeIds: string[],
  placeType: SearchItemType;
}

const exploreRest = rest.injectEndpoints({
    endpoints: (builder) => ({
        searchFromPoint: builder.query<RouteSearchResult, SearchParams>({
            query: ({placeId, placeType, startDate }: SearchParams) => {
                const queryParams = new URLSearchParams();
                queryParams.append("type", placeType);
                queryParams.append("startDate", startDate);
                return `/route/search/${placeId}?${queryParams}`
            },
        }),
        getRoute: builder.query<Route[], RouteParams>({
          query: ({routeIds, placeType}: RouteParams) => {
              const queryParams = new URLSearchParams();
              queryParams.append("type", placeType);
              return `/route/${routeIds.join(",")}?${queryParams}`
          },
          
      }),
    }),
  });

export const {useSearchFromPointQuery, useGetRouteQuery} = exploreRest;