import { mainApi } from "./mainApi";

export const userApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

       getUsers: builder.query({
            query: () => ({
                url: "/getUsers",
                method: "GET",
            }),
            providesTags: ["Users"],
        }),
    }),
});
export const {
    useGetUsersQuery,
} = userApi;