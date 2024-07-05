import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "../NavBar";
import routes from "../routes";
import "bootstrap/dist/css/bootstrap.min.css";

const MainLayout = () => {

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <Routes>         
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      </div>
    </>
  );
};

export default MainLayout;
