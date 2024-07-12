import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Custom fetchBaseQuery with a delay
const fetchBaseQueryWithDelay = ({ baseUrl }) => async (args, api, extraOptions) => {
    // Delay time in milliseconds
    const delayTime = 0;

    // Create a delay function
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Call the original fetchBaseQuery
    const originalFetchBaseQuery = fetchBaseQuery({ baseUrl });

    // Delay the API call
    await delay(delayTime);

    // Return the result of the original fetchBaseQuery
    return originalFetchBaseQuery(args, api, extraOptions);
};

export const commonApi = createApi({
    reducerPath: 'commonApi',
    baseQuery: fetchBaseQueryWithDelay({ baseUrl: "https://api.coingecko.com/api/v3/" }),
    endpoints: (builder) => ({
        getGlobal: builder.query({
            query: () => "global"
        }),
        getTrending: builder.query({
            query: () => "search/trending"
        }),
        getMarkets: builder.query({
            query: () => `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`
        })
    })
})

export const { useGetGlobalQuery, useGetTrendingQuery, useGetMarketsQuery } = commonApi;
