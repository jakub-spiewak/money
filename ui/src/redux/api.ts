import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API || 'https://api.money.jakubspiewak.com'}),
    endpoints: () => ({}),
})