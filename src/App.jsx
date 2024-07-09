import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PrivateRoute from "./PrivateRoute";
import Landing from "./pages/Landing/Landing";
// import "../src/style/globalStyle.css";
// Styles
import "style/globalStyle.css"


import axios from "axios";
import { useDispatch } from "react-redux";
import { setTabledata, setcarsoul, setHeaderData } from "./store/languageSlice";

import { SnackbarProvider } from "notistack";


// Spinner Component
import LazySpinner from "components/Spinner";


const App = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const headerdata = await axios.get(
        "https://api.coingecko.com/api/v3/global"
      );
      
      dispatch(setHeaderData(headerdata.data));
      const carsoul = await axios.get(
        "https://api.coingecko.com/api/v3/search/trending"
      );
      dispatch(setcarsoul(carsoul.data.coins));
      const toplossdata = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en"
      );
      dispatch(setTabledata(toplossdata.data));

      console.log(headerdata.data, carsoul.data.coins, toplossdata.data, "checking_values")
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };


  useEffect(()=>{
    fetchData();
  },[])

 

  return (
    <div>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={2000}
        >
           <React.Suspense fallback={<LazySpinner/>}>
                  <Outlet />
                </React.Suspense>

               
        </SnackbarProvider>
    </div>
  );
};

export default App;
