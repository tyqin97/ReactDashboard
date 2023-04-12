import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import FirstComponent from "./components/firstComponent";
import { Login } from "./pages/Login";

import "./App.scss";

const AppWrapper = (props) => {
  let location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/dashboard" element={<FirstComponent />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default AppWrapper;
