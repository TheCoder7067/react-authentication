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
        updateUser: builder.mutation({
            query: ({id, formData}) => ({
                url: `/users/update/${id}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ['Users'],
        }),  
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"], 
        }),
    }),
});
export const {
    useGetUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApi;
