import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { environment, unsplashBaseUrl, unsplashClientId } from "../../../variables";
import { UnsplashPhoto } from "./UnsplashPhoto";
import { objectToKeyValueEntries } from "../../../utils/objectUtils";

type UnsplashParams = {}

export type UnsplashSearchQueryParams = UnsplashParams & {
    query: string;
    topics?: string[];
    orientation?: "landscape" | "portrait";
}

function createUnsplashUrl(endpoint: string, params?: object) {
    const queryParams = new URLSearchParams();
    queryParams.append("client_id", unsplashClientId);
    objectToKeyValueEntries(params)?.forEach(({ key, value }) => {
        if (typeof value === "object") {
            queryParams.append(key, (value as string[]).join(","));
        }
        if (typeof value === "string") {
            queryParams.append(key, value);
        }
        if (typeof value === "number" || typeof value === "boolean") {
            queryParams.append(key, String(value));
        }
    });
    return `${endpoint}?${queryParams}`;
}

const devData = {
    urls: {
        regular: "https://images.unsplash.com/photo-1656252972882-c20fdef558eb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    alt_description: "dev env alt description",
    user: {
        first_name: "Ian",
        last_name: "Herbert"
    }
}

const customFetchBaseQuery = fetchBaseQuery({ baseUrl: unsplashBaseUrl });

const baseQueryWithBypass = async (args: any, api: any, extraOptions: any) => {
    if (environment === "dev") {
        // Bypass API call in development environment
        return { data: devData };
    }
    return customFetchBaseQuery(args, api, extraOptions);
};

export const unsplashRest = createApi({
    reducerPath: 'unsplashRest',
    baseQuery: baseQueryWithBypass,
    endpoints: (builder) => ({
        searchByKeyword: builder.query<UnsplashPhoto, UnsplashSearchQueryParams>({
            query: ((query) => {
                return createUnsplashUrl("/photos/random", query)
            })
        })
    }),
});

export const { useSearchByKeywordQuery } = unsplashRest;