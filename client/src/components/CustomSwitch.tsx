import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import RestaurantDetails from "../pages/RestaurantDetails";
import UpdateRestaurant from "../pages/UpdateRestaurant";

export default function CustomSwitch() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
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
