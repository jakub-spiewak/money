import {PersonType} from "../../utils/CommonTypes";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {createApi} from "@reduxjs/toolkit/query/react"


export const personSlice = createApi({
    reducerPath: "person",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8080/person"}),
    tagTypes: ["person"],
    endpoints(builder) {
        return {
            fetchPerson: builder.query<PersonType[], void>({
                query: () => "",
                providesTags: (result) => result ?
                    [
                        ...result.map(
                            ({id}) => ({
                                type: "person" as const,
                                id
                            })
                        )
                    ]
                    : ["person"]
            }),
            createPerson: builder.mutation<void, PersonType>({
                query: body => ({
                    body,
                    url: "",
                    method: "POST",
                }),
                invalidatesTags: ["person"]
            }),
            editPerson: builder.mutation<void, PersonType>({
                query: body => ({
                    body,
                    url: `/${body.id}`,
                    method: "PUT"
                }),
                invalidatesTags: ["person"]
            }),
            deletePerson: builder.mutation<void, string>({
                query: id => ({
                    url: `/${id}`,
                    method: "DELETE"
                }),
                invalidatesTags: ["person"]
            })
        }
    }
})

export const {
    useCreatePersonMutation,
    useFetchPersonQuery,
    useEditPersonMutation,
    useDeletePersonMutation
} = personSlice














