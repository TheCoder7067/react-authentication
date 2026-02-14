import { mainApi } from "./mainApi";

export const authApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        register: builder.mutation({
            query: (data) => ({
                url: "/signup",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Users"],
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation
} = authApi;