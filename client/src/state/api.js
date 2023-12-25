import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
});
