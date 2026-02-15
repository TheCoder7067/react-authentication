import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
    baseUrl: "https://authentication-backend-jw5e.onrender.com",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if(token){
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
})
