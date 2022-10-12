import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.1.100:8080'}),
    endpoints: () => ({}),
})