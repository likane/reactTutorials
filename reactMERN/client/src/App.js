import React, { Fragment } from "react";
import Navbar from "./components/layout/Nabar";
import Landing from "./components/layout/Landing";
import "./App.css";
import { NativeBuffer } from "mongoose";

const App = () => (
  <Fragment>
    <Navbar />
    <Landing />
  </Fragment>
);

export default App;
