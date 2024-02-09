import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { travelEndpoint } from '../variables';

const rest = createApi({
  reducerPath: 'rest',
  baseQuery: fetchBaseQuery({ baseUrl: travelEndpoint }),
  endpoints: () => ({}),
});

export default rest;