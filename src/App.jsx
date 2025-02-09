import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PrivateRoute from "./PrivateRoute";
import Landing from "./pages/Landing";
// import "../src/style/globalStyle.css";
// Styles
import "style/globalStyle.css"


import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


import { setTabledata, setcarsoul, setHeaderData } from "./store/dataSlice";

import { SnackbarProvider } from "notistack";


// Spinner Component
import LazySpinner from "components/Spinner";


import { setUser } from "./store/userSlice";


// RTK-Query Api

// import {useGetGlobalQuery, useGetTrendingQuery, useGetMarketsQuery} from "src/RTK-Api"

import { useGetGlobalQuery, useGetTrendingQuery, useGetMarketsQuery } from "./RTK-Api/apiSlice";


const App = () => {
  const dispatch = useDispatch();

const { data: globalData, error: globalError, isLoading: globalLoading } = useGetGlobalQuery();
  const { data: trendingData, error: trendingError, isLoading: trendingLoading } = useGetTrendingQuery();
  const { data: marketsData, error: marketsError, isLoading: marketsLoading } = useGetMarketsQuery();

  // console.log(globalData,globalError,globalLoading,"globalData")
  
  // useEffect(() => {
  //  if (globalData) {
  //     dispatch(setHeaderData({
  //       data:globalData,
  //       error:globalError,
  //       isLoading:globalLoading
  //     }));
  //   }
  //   if (trendingData) {
  //     dispatch(setcarsoul({
  //       data:trendingData.coins,
  //       error:trendingError,
  //       isLoading: trendingLoading
  //     }));
  //   }
  //   if (marketsData) {
  //     dispatch(setTabledata({
  //       data:marketsData,
  //       error:marketsError,
  //       isLoading:marketsLoading
  //     }));
  //   }
  // }, [globalData, trendingData, marketsData]);


  useEffect(()=>{
    dispatch(setHeaderData({
        data:globalData,
        error:globalError,
        isLoading:globalLoading
      }));
  },[globalData, globalError, globalLoading])


  useEffect(()=>{

    console.log(trendingData,"trendingData")
      dispatch(setcarsoul({
        data:trendingData?.coins,
        error:trendingError,
        isLoading: trendingLoading
      }));
  },[trendingData, trendingError, trendingLoading])


  useEffect(()=>{
          dispatch(setTabledata({
        data:marketsData,
        error:marketsError,
        isLoading:marketsLoading
      }));
  },[marketsData, marketsError, marketsLoading])



  useEffect(()=>{
   let profilePreferences = JSON.parse(sessionStorage.getItem("profile-preferences"));

   dispatch(setUser(profilePreferences));
  },[])



  return (
    <div>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={1200}
        >
           <React.Suspense fallback={<LazySpinner/>}>
                  <Outlet />
            </React.Suspense>

               
        </SnackbarProvider>
    </div>
  );
};

export default App;
