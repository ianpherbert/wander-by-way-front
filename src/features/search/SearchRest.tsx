import rest from "../../redux/rest";
import { SearchOptions, SearchResult } from "./SearchResult";

interface SearchParams {
    queryString: string;
    searchOptions: SearchOptions;
  }

const searchApi = rest.injectEndpoints({
    endpoints: (builder) => ({
      searchByName: builder.query<SearchResult, SearchParams>({
        query: ({queryString, searchOptions}: SearchParams) => {
            const queryParams = new URLSearchParams();
            Object.entries(searchOptions).forEach(([key, value])=>{
                queryParams.append(key, String(value))
            })
            return `/search/${encodeURIComponent(queryString)}?${queryParams}`;
        },
      }),
    }),
  });

  export const {useSearchByNameQuery} = searchApi;