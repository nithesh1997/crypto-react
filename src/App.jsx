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
// import { setTabledata, setcarsoul, setHeaderData } from "./store/languageSlice";


import { setTabledata, setcarsoul, setHeaderData } from "./store/languageSlice";

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
  
  useEffect(() => {
   if (globalData) {
      dispatch(setHeaderData({
        data:globalData,
        error:globalError,
        isLoading:globalLoading
      }));
    }
    if (trendingData) {
      dispatch(setcarsoul(trendingData.coins));
    }
    if (marketsData) {
      dispatch(setTabledata(marketsData));
    }
  }, [globalData, trendingData, marketsData]);



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
