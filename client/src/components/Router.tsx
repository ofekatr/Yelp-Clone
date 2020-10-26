import React from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Home from "../pages/Home";
import RestaurantDetails from "../pages/RestaurantDetails";
import UpdateRestaurant from "../pages/UpdateRestaurant";

export default function Router({ children }: any) {
  return (
    <div>
      <BrowserRouter>
        {children}
        <Route exact path="/" component={Home} />
        <Route exact path="/restaurants/:id" component={RestaurantDetails} />
        <Route
          exact
          path="/restaurants/:id/update"
          component={UpdateRestaurant}
        />
        <Redirect from="*" to="/" />
      </BrowserRouter>
    </div>
  );
}
