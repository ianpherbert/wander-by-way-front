import rest from "../../redux/rest";
import { SearchItemType } from "../common/SearchItemType";
import { RouteSearchResult } from "./RouteSearchResult";

interface SearchParams {
    placeId: string;
    placeType: SearchItemType;
  }

const tripPlannerApi = rest.injectEndpoints({
    endpoints: (builder) => ({
        searchFromPoint: builder.query<RouteSearchResult, SearchParams>({
            query: ({placeId, placeType}: SearchParams) => {
                const queryParams = new URLSearchParams();
                queryParams.append("type", placeType);
                return `/search/route/${placeId}?${queryParams}`
            }
        }),
    }),
  });

export const {useSearchFromPointQuery} = tripPlannerApi;