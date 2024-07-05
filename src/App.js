import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth from "./pages/auth";
import PrivateRoute from "./PrivateRoute";
import Landing from "./pages/Landing/Landing";
import "../src/style/globalStyle.css";
import Home from "./pages/home";
import About from "./pages/About";
import CoinDetails from "./pages/CoinDetails";
import Contact from "./pages/Contact";
import SignupPage from "./pages/Component/Signup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTabledata, setcarsoul, setHeaderData } from "./languageSlice";
import Planpage from "./pages/Component/PlanPage";
import { SnackbarProvider } from "notistack";

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
      console.error("Error fetching data:", error);
    }
  };


  useEffect(()=>{
    fetchData();
  },[])

 

  return (
    <div>
      {
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={2000}
        >
          <BrowserRouter>
            <Routes>
              {/* <Route path="*" Component={Landing} /> */}
              <Route path="/login" Component={Auth} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/coindetails" element={<CoinDetails />} />
              <Route path="/plan" element={<Planpage />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      }
    </div>
  );
};

export default App;
