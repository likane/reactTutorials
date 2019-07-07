import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Nabar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/addExperience";
import AddEducation from "./components/profile-forms/addEducation";
// redux
import { Provider } from "react-redux"; // will combine react and redux
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
//import { NativeBuffer } from "mongoose";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //adding the extra brackets allow it to only run once after lmounted

  return (
    <Provider store={store}>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        {/* <Landing /> */}
        <section className="container">
          <Alert />
          <switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/Login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            />
          </switch>
        </section>
      </Fragment>
    </Provider>
  );
};

export default App;
