import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import RestaurantDetails from "../pages/RestaurantDetails";
import UpdateRestaurant from "../pages/UpdateRestaurant";

export default function Router({ children }: any) {
  return (
    <div>
      <BrowserRouter>
        {children}
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
      </BrowserRouter>
    </div>
  );
}
