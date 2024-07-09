import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import LandingPageHeader2 from "../Component/LandinpageHeader2";
import ContentLandingpage from "../Component/contentLandingpage";
import LanderpageTable from "../Component/LanderpageTable";
import Header2 from "../Component/Header2";
import { useDispatch } from "react-redux";
import { setauth } from "../../store/languageSlice";

const LandingPage = () => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  dispatch(setauth(false));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    console.log("landding page");
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedEmail = localStorage.getItem("email");
    console.log(loggedIn, storedEmail, "<==========");
    if (loggedIn && storedEmail) {
      console.log("inside if");
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
      <div>
        <Header />
        <Header2 isLoggedIn={isLoggedIn} />
        {/* <LandingPageHeader2 toShow={false}  /> */}
        <ContentLandingpage />
        <LanderpageTable isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};

export default LandingPage;
