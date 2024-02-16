import rest from "../../redux/rest";
import { SearchItemType } from "../common/SearchItemType";
import { SearchItem, SearchOptions, SearchResult } from "./SearchResult";

interface SearchParams {
  queryString: string;
  searchOptions: SearchOptions;
}

const searchApi = rest.injectEndpoints({
  endpoints: (builder) => ({
    searchByName: builder.query<SearchResult, SearchParams>({
      query: ({ queryString, searchOptions }: SearchParams) => {
        const queryParams = new URLSearchParams();
        Object.entries(searchOptions).forEach(([key, value]) => {
          queryParams.append(key, String(value))
        })
        return `/search/${encodeURIComponent(queryString)}?${queryParams}`;
      },
    }),
    searchFromId: builder.query<SearchItem, {
      placeId: string;
      placeType: SearchItemType;
    }>({
      query: ({ placeId, placeType }: {
        placeId: string;
        placeType: SearchItemType;
      }) => {
        const queryParams = new URLSearchParams();
        queryParams.append("type", placeType);
        return `/search/place/${placeId}?${queryParams}`
      }
    }),
  }),
});

export const { useSearchByNameQuery, useSearchFromIdQuery } = searchApi;