import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const mainApi = createApi({
    reducerPath: "api", 
    baseQuery: baseQuery,
    tagTypes: ["Users"], 
    endpoints: () => ({}),
})