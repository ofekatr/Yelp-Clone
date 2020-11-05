import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RestaurantDetails from "../pages/RestaurantDetails";
import UpdateRestaurant from "../pages/UpdateRestaurant";
import AuthRoute from "./AuthRoute";

export default function CustomSwitch() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
      <Route exact path="/about" component={About} />
      <Route
        exact
        path="/restaurants/:id/update"
        component={UpdateRestaurant}
      />
      <Route exact path="/restaurants/:id" component={RestaurantDetails} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}
