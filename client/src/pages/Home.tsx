import React from "react";
import { Divider } from "semantic-ui-react";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantsGrid from "../components/RestaurantsGrid";

export default function Home() {
  return (
    <div>
      <AddRestaurant style={{}} />
      <Divider hidden />
      <RestaurantsGrid style={{}} />
    </div>
  );
}
