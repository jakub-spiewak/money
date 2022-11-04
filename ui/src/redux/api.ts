import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import * as process from "process";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API || 'http://192.168.1.100:8080'}),
    endpoints: () => ({}),
})