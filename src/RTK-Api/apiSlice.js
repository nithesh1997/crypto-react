import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commonApi = createApi({
    reducerPath: 'commonApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/" }),
    endpoints: (builder) => ({
        getGlobal: builder.query({
            query: () => "global"
        }),
        getTrending: builder.query({
            query: () => "search/trending"
        }),
        getMarkets: builder.query({
            query: (que) => `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`
        })
    })
})

export const { useGetGlobalQuery, useGetTrendingQuery, useGetMarketsQuery } = commonApi;
