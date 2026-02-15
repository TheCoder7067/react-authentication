import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if(token){
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
})