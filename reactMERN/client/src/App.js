import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Nabar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "./App.css";
//import { NativeBuffer } from "mongoose";

const App = () => (
  <Fragment>
    <Navbar />
    <Route exact path="/" component={Landing} />
    {/* <Landing /> */}
    <section className="container">
      <switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/Login" component={Login} />
      </switch>
    </section>
  </Fragment>
);

export default App;
